(()=>{
  'use strict';

  const CAPTURE_STATE_VERSION=1;
  const MAX_CAPTURE_PAGES=40;
  let pendingRetakePageId=null;
  let renderToken=0;

  const uid=(prefix)=>`${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
  const captureBlobKey=(sessionId,pageId)=>`hide-capture:${sessionId}:${pageId}`;

  function activeCapture(){
    const c=S.captureSession;
    return c&&c.version===CAPTURE_STATE_VERSION&&['CAPTURING','REVIEW'].includes(c.status)?c:null;
  }

  function ensureCaptureSession(){
    let c=activeCapture();
    if(c)return c;
    c={
      version:CAPTURE_STATE_VERSION,
      captureSessionId:uid('capture'),
      assignmentCycleId:null,
      status:'CAPTURING',
      createdAt:nowISO(),
      updatedAt:nowISO(),
      pages:[],
      analysisBatches:[]
    };
    S.captureSession=c;
    save();
    return c;
  }

  async function dbDelete(key){
    const db=await dbOpen();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction('assets','readwrite');
      tx.objectStore('assets').delete(key);
      tx.oncomplete=()=>resolve();
      tx.onerror=()=>reject(tx.error);
    });
  }

  function replaceLegacySheetInput(id,{multiple=false}={}){
    const old=document.getElementById(id);
    if(!old)return null;
    const fresh=old.cloneNode(false);
    fresh.value='';
    if(multiple)fresh.multiple=true;
    else fresh.removeAttribute('multiple');
    old.replaceWith(fresh);
    return fresh;
  }

  async function acceptFiles(files,sourceMode){
    const list=[...files].filter(Boolean);
    if(!list.length)return;
    const c=ensureCaptureSession();
    if(c.pages.length+list.length>MAX_CAPTURE_PAGES){
      toast(`한 번에 최대 ${MAX_CAPTURE_PAGES}장까지 임시 보관할 수 있어요.`);
      return;
    }

    for(const file of list){
      try{
        const q=await preflightImage(file);
        if(pendingRetakePageId){
          const page=c.pages.find(p=>p.pageId===pendingRetakePageId);
          pendingRetakePageId=null;
          if(!page)continue;
          await dbSet(captureBlobKey(c.captureSessionId,page.pageId),file);
          page.version=(page.version||1)+1;
          page.capturedAt=nowISO();
          page.sourceMode=sourceMode;
          page.fileName=file.name||'';
          page.mime=file.type||'image/*';
          page.size=file.size||0;
          page.quality=q;
          page.analysisState='PENDING';
          page.ocrRows=[];
          page.lastRetakeAt=nowISO();
        }else{
          const pageId=uid('page');
          await dbSet(captureBlobKey(c.captureSessionId,pageId),file);
          c.pages.push({
            pageId,
            displayOrder:c.pages.length+1,
            version:1,
            capturedAt:nowISO(),
            sourceMode,
            fileName:file.name||'',
            mime:file.type||'image/*',
            size:file.size||0,
            quality:q,
            analysisState:'PENDING',
            ocrRows:[]
          });
        }
        c.status='CAPTURING';
        c.updatedAt=nowISO();
        save();
      }catch(e){
        toast(e.message||'사진을 저장하지 못했어요.');
      }
    }
    renderCaptureSession();
  }

  async function loadPreview(sessionId,pageId,img,token){
    try{
      const blob=await dbGet(captureBlobKey(sessionId,pageId));
      if(!blob||token!==renderToken||!img.isConnected)return;
      const url=URL.createObjectURL(blob);
      img.src=url;
      img.onload=()=>URL.revokeObjectURL(url);
    }catch{}
  }

  async function deletePage(pageId){
    const c=activeCapture();
    if(!c)return;
    const idx=c.pages.findIndex(p=>p.pageId===pageId);
    if(idx<0)return;
    const [removed]=c.pages.splice(idx,1);
    try{await dbDelete(captureBlobKey(c.captureSessionId,removed.pageId))}catch{}
    c.pages.forEach((p,i)=>p.displayOrder=i+1);
    c.updatedAt=nowISO();
    save();
    renderCaptureSession();
  }

  function requestRetake(pageId){
    pendingRetakePageId=pageId;
    const camera=document.getElementById('sheetCameraInput');
    if(camera){camera.value='';camera.click()}
  }

  function captureStatusText(c){
    const pending=c.pages.filter(p=>p.analysisState!=='ANALYZED').length;
    const unresolved=c.pages.reduce((n,p)=>n+(p.ocrRows||[]).filter(r=>r.needsReview).length,0);
    if(unresolved)return `확인이 필요한 단어 ${unresolved}개`;
    if(pending)return '사진이 준비됐어요. 원할 때 분석 맡기기';
    if(c.pages.length)return '분석된 결과가 있어요. 계속 찍거나 결과를 확인하세요.';
    return '셔터를 누르면 바로 임시 저장되고 다음 촬영을 이어갈 수 있어요.';
  }

  function renderCaptureSession(){
    const c=ensureCaptureSession();
    const token=++renderToken;
    const pages=[...c.pages].sort((a,b)=>a.displayOrder-b.displayOrder);
    const analyzed=pages.filter(p=>p.analysisState==='ANALYZED').length;
    const pending=pages.length-analyzed;

    viewStack=[];
    $('#view').innerHTML=`
      <section class="hide-capture-shell" aria-label="Hide & Seek 빠른 촬영">
        <div class="hide-capture-head">
          <div>
            <span class="phase-chip">RAPID CAPTURE</span>
            <h1>사진 모으기</h1>
            <p>${esc(captureStatusText(c))}</p>
          </div>
          <button class="btn secondary" id="captureExit" type="button">나가기</button>
        </div>

        <button class="hide-shutter" id="captureMoreCamera" type="button" aria-label="사진 촬영">
          <span class="hide-shutter-ring"><i></i></span>
          <b>촬영</b>
        </button>

        <div class="hide-capture-actions">
          <button class="btn secondary" id="captureMoreLibrary" type="button">앨범에서 추가</button>
          <button class="btn primary" id="analyzeCaptureBatch" type="button" ${pages.length?'':'disabled'}>분석 맡기기</button>
        </div>

        <div class="hide-capture-meta" aria-live="polite">
          <span>${pending?'분석 대기 사진 있음':'현재 사진 분석됨'}</span>
          ${analyzed?`<button class="link-btn" id="reviewExisting" type="button">분석 결과 확인</button>`:''}
        </div>

        <div class="hide-thumb-strip" id="captureThumbs" aria-label="촬영한 사진 미리보기">
          ${pages.map(p=>`<article class="hide-thumb ${p.analysisState==='ANALYZED'?'done':'pending'}" data-page="${esc(p.pageId)}">
            <img alt="${p.displayOrder}번째 촬영 사진">
            <div class="hide-thumb-info">
              <b>${p.displayOrder}번째 장</b>
              <span>${p.analysisState==='ANALYZED'?'분석됨':(p.quality?.warnings?.length?'품질 확인':'임시 저장')}</span>
            </div>
            <div class="hide-thumb-buttons">
              <button type="button" data-retake="${esc(p.pageId)}">다시 찍기</button>
              <button type="button" data-delete="${esc(p.pageId)}">삭제</button>
            </div>
          </article>`).join('')||'<p class="hide-empty">사진 수를 채우는 게 목표가 아니에요. 필요한 만큼 빠르게 찍고 분석을 맡기면 됩니다.</p>'}
        </div>
      </section>`;

    $('#captureMoreCamera').onclick=()=>{pendingRetakePageId=null;const input=$('#sheetCameraInput');input.value='';input.click()};
    $('#captureMoreLibrary').onclick=()=>{pendingRetakePageId=null;const input=$('#sheetLibraryInput');input.value='';input.click()};
    $('#analyzeCaptureBatch').onclick=analyzeCaptureBatch;
    $('#reviewExisting')?.addEventListener('click',renderCaptureReview);
    $('#captureExit').onclick=()=>{pendingRetakePageId=null;currentTab='sheets';viewStack=[];render()};
    $$('[data-retake]').forEach(b=>b.onclick=()=>requestRetake(b.dataset.retake));
    $$('[data-delete]').forEach(b=>b.onclick=()=>deletePage(b.dataset.delete));

    $$('#captureThumbs .hide-thumb').forEach(card=>{
      const pageId=card.dataset.page;
      const img=$('img',card);
      loadPreview(c.captureSessionId,pageId,img,token);
    });

    setPartner('찍으면 바로 보관할게. 필요한 만큼 이어서 찍고, 원할 때 분석을 맡겨줘.','note');
  }

  async function analyzeOnePage(c,page){
    const blob=await dbGet(captureBlobKey(c.captureSessionId,page.pageId));
    if(!blob)throw new Error(`${page.displayOrder}번째 장 원본을 찾지 못했어요.`);
    const img=await normalizedImageBase64(blob);
    const seePrompt='사진에 실제로 보이는 영어 단어와 한글 뜻만 행 순서대로 전사하세요. 원본에 없는 단어를 만들지 말고, 예문/힌트/정답 추측을 하지 마세요. 불확실하면 confidence를 low로 표시하세요. JSON만 출력: {"rows":[{"eng":"...","kor":"...","confidence":"high|medium|low"}]}';
    const see=await gemini(seePrompt,img.b64,img.mime);
    const pairPrompt=`아래 SEE OCR 행만 사용해 영어 단어-한국어 뜻의 짝을 검증하세요. 원본에 없는 새 단어를 만들지 마세요. 헤더/번호/잡음은 제외하고 원래 순서를 유지하세요. 애매한 행은 low로 남기세요. JSON만 출력: {"rows":[{"eng":"...","kor":"...","confidence":"high|medium|low"}]}\nSEE:\n${JSON.stringify(see)}`;
    const paired=await gemini(pairPrompt);
    const rows=(paired.rows||see.rows||[])
      .filter(x=>x.eng||x.kor)
      .map((x,i)=>({
        ...normalizeWord({
          id:`ocr-${page.pageId}-v${page.version}-${i}`,
          eng:x.eng,
          kor:x.kor,
          confidence:x.confidence||'medium',
          needsReview:x.confidence==='low'
        },i),
        sourcePageId:page.pageId,
        sourcePageVersion:page.version,
        resolution:x.confidence==='low'?null:'model-not-flagged'
      }));
    if(!rows.length)throw new Error(`${page.displayOrder}번째 장에서 단어와 뜻을 찾지 못했어요.`);
    return rows;
  }

  async function analyzeCaptureBatch(){
    const c=activeCapture();
    if(!c||!c.pages.length)return toast('먼저 사진을 찍어 주세요.');
    if(!navigator.onLine)return toast('OCR 분석은 온라인 연결이 필요해요. 촬영 원본은 기기에 임시 저장되어 있어요.');
    if(!runtimeApiKey)return toast('설정에서 Gemini API Key를 입력한 뒤 분석해 주세요.');

    const targets=c.pages.filter(p=>p.analysisState!=='ANALYZED');
    if(!targets.length)return renderCaptureReview();

    $('#view').innerHTML=`<section class="card hide-analysis-card"><div class="hero-kicker"><span>BATCH ANALYSIS</span><span>${targets.length}개 대상</span></div><h2>사진 분석 중</h2><p id="captureAnalysisStage">사진 속 단어를 꺼내는 중.</p><div class="progress" style="margin-top:16px"><span id="captureAnalysisProgress" style="width:4%"></span></div><p class="hide-analysis-note">분석은 현재 묶음의 경계일 뿐, 촬영 종료가 아니에요.</p></section>`;
    setPartner('좋아, 이제 내 차례네. 사진 속 단서부터 꺼내볼게.','note');

    const batch={batchId:uid('batch'),sourcePageIds:targets.map(p=>p.pageId),startedAt:nowISO(),completedAt:null,status:'RUNNING',issues:[]};
    c.analysisBatches.push(batch);
    save();

    let done=0;
    for(const page of targets){
      try{
        $('#captureAnalysisStage').textContent=`${page.displayOrder}번째 장 분석 중`;
        page.ocrRows=await analyzeOnePage(c,page);
        page.analysisState='ANALYZED';
        page.analyzedAt=nowISO();
        page.lastBatchId=batch.batchId;
      }catch(e){
        page.analysisState='ERROR';
        page.analysisError=e.message||'분석 실패';
        batch.issues.push({pageId:page.pageId,message:page.analysisError});
      }
      done++;
      const pct=Math.max(4,Math.round(done/targets.length*100));
      $('#captureAnalysisProgress').style.width=`${pct}%`;
      c.updatedAt=nowISO();
      save();
    }

    batch.completedAt=nowISO();
    batch.status=batch.issues.length?'PARTIAL':'COMPLETED';
    c.status='REVIEW';
    c.updatedAt=nowISO();
    save();
    renderCaptureReview();
  }

  function allCaptureRows(c){
    return c.pages.flatMap(p=>(p.ocrRows||[]).map((r,i)=>({page:p,row:r,rowIndex:i})));
  }

  function resolveEditedRow(pageId,rowIndex,elRow){
    const c=activeCapture();
    const page=c?.pages.find(p=>p.pageId===pageId);
    const row=page?.ocrRows?.[rowIndex];
    if(!row)return;
    const eng=$('.eng',elRow).value.trim();
    const kor=$('.kor',elRow).value.trim();
    const changed=eng!==row.eng||kor!==row.kor;
    row.eng=eng;row.kor=kor;
    if(changed&&eng&&kor){
      row.manuallyEdited=true;
      row.needsReview=false;
      row.resolution='user-edited';
      row.resolvedAt=nowISO();
    }
    c.updatedAt=nowISO();
    save();
    renderCaptureReview();
  }

  function acceptReviewRow(pageId,rowIndex){
    const c=activeCapture();
    const page=c?.pages.find(p=>p.pageId===pageId);
    const row=page?.ocrRows?.[rowIndex];
    if(!row||!row.eng||!row.kor)return toast('단어와 뜻을 먼저 확인해 주세요.');
    row.needsReview=false;
    row.resolution='user-accepted';
    row.resolvedAt=nowISO();
    c.updatedAt=nowISO();
    save();
    renderCaptureReview();
  }

  function renderCaptureReview(){
    const c=activeCapture();
    if(!c)return renderCaptureSession();
    const entries=allCaptureRows(c);
    const unresolved=entries.filter(x=>x.row.needsReview).length;
    const errors=c.pages.filter(p=>p.analysisState==='ERROR');
    const pending=c.pages.filter(p=>p.analysisState!=='ANALYZED'&&p.analysisState!=='ERROR');

    c.status='REVIEW';
    c.updatedAt=nowISO();
    save();

    $('#view').innerHTML=`
      <section class="card hide-review-card">
        <div class="hero-kicker"><span>REVIEW BEFORE COMMIT</span><span>${unresolved?'확인 필요':'검토 가능'}</span></div>
        <h2>분석 결과 확인</h2>
        <p>${unresolved?`확인이 필요한 단어 ${unresolved}개만 확인하면 돼요.`:'저신뢰 항목은 모두 확인됐어요.'}</p>

        ${errors.length?`<div class="hide-review-warning"><b>다시 확인할 사진</b>${errors.map(p=>`<div><span>${p.displayOrder}번째 장 · ${esc(p.analysisError||'분석 실패')}</span><button type="button" data-review-retake="${esc(p.pageId)}">이 장만 다시 찍기</button></div>`).join('')}</div>`:''}
        ${pending.length?`<div class="hide-review-warning"><b>아직 분석하지 않은 사진이 있어요.</b><button type="button" id="analyzePending">분석 맡기기</button></div>`:''}

        <div class="table hide-review-table" id="captureReviewRows">
          ${entries.map(({page,row,rowIndex})=>`<div class="row hide-review-row" data-page-id="${esc(page.pageId)}" data-row-index="${rowIndex}">
            <span class="hide-page-index">${page.displayOrder}</span>
            <input class="eng" value="${esc(row.eng)}" aria-label="${page.displayOrder}번째 장 영어 단어">
            <input class="kor" value="${esc(row.kor)}" aria-label="${page.displayOrder}번째 장 뜻">
            <span class="badge ${row.needsReview?'weak':'good'}">${row.needsReview?'확인 필요':'확인됨'}</span>
            ${row.needsReview?'<button class="row-accept" type="button">이대로 확인</button>':''}
          </div>`).join('')||'<p>분석된 단어가 아직 없어요.</p>'}
        </div>

        <div class="hide-review-actions">
          <button class="btn secondary" id="continueCapture" type="button">이어서 촬영하기</button>
          <button class="btn primary" id="commitCaptureSheet" type="button">단어 세트 만들기</button>
        </div>
      </section>`;

    $$('.hide-review-row').forEach(el=>{
      const pageId=el.dataset.pageId,rowIndex=Number(el.dataset.rowIndex);
      $('.eng',el).addEventListener('change',()=>resolveEditedRow(pageId,rowIndex,el));
      $('.kor',el).addEventListener('change',()=>resolveEditedRow(pageId,rowIndex,el));
      $('.row-accept',el)?.addEventListener('click',()=>acceptReviewRow(pageId,rowIndex));
    });
    $$('[data-review-retake]').forEach(b=>b.onclick=()=>requestRetake(b.dataset.reviewRetake));
    $('#analyzePending')?.addEventListener('click',analyzeCaptureBatch);
    $('#continueCapture').onclick=()=>{pendingRetakePageId=null;c.status='CAPTURING';save();renderCaptureSession()};
    $('#commitCaptureSheet').onclick=commitCaptureSheet;
    setPartner(unresolved?'애매한 것만 네 확인이 필요해. 확실한 건 그대로 둘게.':'정리 끝. 더 찍어도 되고, 이대로 단어 세트를 만들어도 돼.','note');
  }

  function commitCaptureSheet(){
    const c=activeCapture();
    if(!c)return;
    const incompletePages=c.pages.filter(p=>p.analysisState!=='ANALYZED');
    if(incompletePages.length)return toast(`${incompletePages[0].displayOrder}번째 장부터 분석을 마쳐 주세요.`);
    const entries=allCaptureRows(c);
    if(!entries.length)return toast('분석된 단어가 없어요.');
    const unresolved=entries.filter(x=>x.row.needsReview||!x.row.eng||!x.row.kor);
    if(unresolved.length)return toast('확인 필요 항목을 먼저 확인해 주세요.');

    const newId=`sheet-${Date.now()}`;
    const items=entries.map(({row})=>normalizeWord({...row,needsReview:false},0));
    const newSheet={
      sheetId:newId,
      title:`${new Date().toLocaleDateString('ko-KR')} 단어 세트`,
      createdAt:nowISO(),
      updatedAt:nowISO(),
      testDate:'',
      sourceType:'photo-batch',
      sourceCount:c.pages.length,
      status:'READY',
      caseMastery:0,
      items,
      recognitionMeta:{
        reviewedAt:nowISO(),
        count:items.length,
        captureSessionId:c.captureSessionId,
        analysisBatchIds:c.analysisBatches.map(b=>b.batchId),
        reviewContract:'OCR_DRAFT_NE_CONFIRMED_WORD_SET'
      }
    };

    S.sheets.unshift(newSheet);
    S.activeSheetId=newId;
    S.captureHistory=[...(S.captureHistory||[]),{
      captureSessionId:c.captureSessionId,
      createdAt:c.createdAt,
      committedAt:nowISO(),
      committedSheetId:newId,
      pageCount:c.pages.length,
      analysisBatchIds:c.analysisBatches.map(b=>b.batchId),
      pageRefs:c.pages.map(p=>({pageId:p.pageId,displayOrder:p.displayOrder,version:p.version,blobKey:captureBlobKey(c.captureSessionId,p.pageId)}))
    }].slice(-20);
    S.captureSession=null;
    S.learning=clone(DEFAULT_STATE.learning);
    S.codeRed=clone(DEFAULT_STATE.codeRed);
    save();
    toast('단어 세트 저장 완료');
    currentTab='study';
    viewStack=[];
    render();
  }

  function installInputs(){
    const camera=replaceLegacySheetInput('sheetCameraInput');
    const library=replaceLegacySheetInput('sheetLibraryInput',{multiple:true});
    if(camera)camera.addEventListener('change',async e=>{
      const files=[...e.target.files];
      e.target.value='';
      await acceptFiles(files,'camera');
    });
    if(library)library.addEventListener('change',async e=>{
      const files=[...e.target.files];
      e.target.value='';
      await acceptFiles(files,'library');
    });
  }

  function installPhoneOrientationGuard(){
    const guard=document.createElement('div');
    guard.className='hide-phone-landscape-guard';
    guard.innerHTML='<div><b>휴대폰은 세로 화면으로 사용해 주세요.</b><span>태블릿은 가로·세로 모두 지원합니다.</span></div>';
    document.body.appendChild(guard);
  }

  installInputs();
  installPhoneOrientationGuard();

  // Resume an interrupted local capture session instead of silently discarding it.
  if(activeCapture())renderCaptureSession();
})();
