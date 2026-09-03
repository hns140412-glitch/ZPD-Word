# ## ZPD Word Ui Master Logic REV_07##

**Document Status:** FORMAL BASELINE / SOURCE OF TRUTH  
**Revision:** REV_07  
**Purpose:** ZPD Word PWA의 기획·학습·OCR·UI·데이터·검증·배포 기준을 하나의 Master Logic으로 통합한다.  
**Revision Policy:** 이전 Revision은 보존한다. 신규 아이디어나 구현 편의 때문에 검증된 MASTER를 임의 변경하지 않는다.

---

## 0. MASTER 선언

ZPD Word는 **영어학원 단어 과제를 빠르고 효과적으로 끝내기 위해 게임의 재미를 빌려오는 모바일 학습 PWA**다.

핵심은 게임 자체가 아니라 다음의 학습 성과다.

1. 사진으로 신규 시험지를 빠르고 정확하게 등록한다.
2. 신규 단어를 보고·듣고·발음하고·철자 형태를 확인하고·뜻과 연결하며 자연스럽게 습득한다.
3. 학습 과정에서 취약 단어를 찾아 더 자주 만나게 한다.
4. CODE RED에서 현재 시험지의 전체 유효 단어를 최종 검증한다.
5. 실패한 단어는 다시 배우고 다시 회상한다.
6. 과거 시험지의 단어는 현재 학습을 방해하지 않는 작은 사건으로 다시 만나 장기 기억을 돕는다.

### 제품 핵심 문장

> **신규 단어는 여러 방식으로 충분히 만나게 하고, 어려운 단어는 더 자주 만나게 하고, 마지막에는 CODE RED에서 전부 확인한다. 지난 단어는 학습을 방해하지 않는 작은 사건으로 다시 만나게 한다.**

장기적으로 ZPD Word는 시험 직전 잠깐 외우는 도구에 머물지 않는다. 시험을 계기로 들어온 단어를 누적 기억 풀에 남겨 다시 만나게 한다. 단, **장기 복습이 신규 시험지 학습보다 앞서서는 안 된다.**

---

# 1. SOURCE OF TRUTH PRIORITY — HARD LOCK

우선순위는 다음과 같다.

1. **검증 통과한 최신 MASTER Revision**
2. MASTER 절차를 통해 승인된 변경사항
3. 실제 구현물
4. UI 시안
5. 개별 아이디어

구현물이 MASTER와 다르다고 해서 구현물이 정답이 되지 않는다.

새 아이디어가 MASTER와 충돌한다고 해서 새 아이디어가 자동으로 우선하지 않는다.

MASTER 자체에 문제가 발견되면 구현에 맞춰 몰래 변경하지 않고 정식 Revision 절차를 거친다.

---

# 2. MASTER CONTROL LOOP — HARD LOCK

MASTER는 직선형 문서가 아니라 **폐쇄형 순환 운영 구조**다.

```text
현재 MASTER 확인
→ 신규 요구사항 / 아이디어 / 오류 / 실사용 피드백 수집
→ 전체 사용자 흐름·학습·데이터 구조에 대조
→ 충돌 / 중복 / 후퇴 / 누락 / 디자인 드리프트 검사
→ 필요 시 사례·UX·학습·기술 패턴 검토
→ ADOPT / ADJUST / HOLD / REJECT 판정
→ 채택 항목 MASTER 후보 통합
→ 전체 흐름 재최적화
→ 논리 / 상태 / 데이터 / 학습 / UX 오류 검증
→ Revision 후보 완성
→ MASTER SELF-VALIDATION
→ FAIL 발견 시 수정 단계 복귀
→ MASTER PASS
→ 구현 / UI 제작
→ 실제 결과를 MASTER와 대조
→ RESULT SELF-VALIDATION
→ REGRESSION GATE
→ FAIL이면 수정 / 재구현
→ 재검증
→ 모든 Gate PASS
→ 검증 통과본만 사용자에게 제시
→ 신규 피드백
→ 다시 MASTER CONTROL LOOP
```

### 핵심 되돌림 규칙

- MASTER 내부 오류 발견 → 구현하지 않고 MASTER 수정으로 복귀.
- 구현 결과가 MASTER와 다름 → 원칙적으로 구현을 수정.
- 실사용 결과로 MASTER 자체의 문제가 발견됨 → 신규 문제로 등록하고 정식 판정 후 다음 Revision.
- 기능이 작동한다고 MASTER 준수로 간주하지 않는다.
- MASTER가 논리적으로 맞다고 실제 구현도 맞다고 간주하지 않는다.

### NO USER-AS-QA — HARD LOCK

사용자는 QA 담당자가 아니다.

명백한 구조 오류, 기능 누락, 충돌, 작동하지 않는 기능을 먼저 사용자에게 넘겨 확인시키지 않는다. 가능한 범위에서 내부 Self-Validation으로 발견·수정한 뒤 **검증 통과 결과물만 제시**한다.

---

# 3. CHANGE GOVERNANCE

MASTER는 세 계층으로 관리한다.

## 3.1 LOCKED CORE

제품 정체성·핵심 학습 구조·데이터 안전·검증 체계 등 임의 변경 금지 영역.

## 3.2 CONTROLLED FLEX

실사용 검증으로 조정 가능한 영역.

예:
- CODE RED 제한시간
- 빈칸 개수
- 취약 단어 가중치
- 이벤트 빈도
- 애니메이션 강도
- 일부 문구
- 미세 레이아웃

## 3.3 EXPANSION LAYER

핵심 제품을 훼손하지 않는 향후 확장.

예:
- COLD CASE
- 추가 수사 이벤트
- 고급 통계
- 추가 보상
- 확장 캐릭터 표현

### 신규 아이디어 판정

- **ADOPT** — 전체 경험을 명확하게 개선하며 기존 MASTER와 자연스럽게 결합.
- **ADJUST** — 방향은 좋지만 범위·강도·구조 조정 필요.
- **HOLD** — 현재 핵심에 필요하지 않거나 확장 단계가 적절.
- **REJECT** — 핵심을 왜곡하거나 복잡성·회귀·데이터 위험을 증가.

“새롭다”, “예쁘다”, “재미있다”만으로 ADOPT하지 않는다.

---

# 4. 제품 우선순위 — HARD LOCK

```text
사진 시험지 생성 정확도
→ 신규 시험지 자연스러운 습득
→ 취약 단어 집중
→ CODE RED 전체 검증
→ 오답 재추적
→ 과거 단어 이벤트성 장기기억
→ 시험 직전 확인
→ 장기 성장 / 보상
```

모든 기능은 다음 질문을 통과해야 한다.

> **이 기능이 신규 학원 단어를 더 빨리/잘 익히게 하거나, 취약 단어를 효율적으로 잡거나, 반복을 즐겁게 만들거나, 이미 배운 단어를 부담 없이 잊지 않게 하는가?**

아니라면 핵심 기능으로 넣지 않는다.

---

# 5. 실제 사용 주기

영어학원 단어 과제는 주 2~3회 발생할 수 있다는 사용 상황을 전제로 한다.

```text
오늘 받은 시험지
→ 사진/사진보관함으로 등록
→ 인식 결과 확인
→ 신규 단어 습득
→ 취약 단어 집중
→ CODE RED
→ 필요한 단어 재추적
→ 최종 준비 완료
→ 학원 시험
→ 단어는 누적 기억 풀에 남음
```

게임 진행, XP, 캐릭터, 보상은 이 주기를 돕는 보조 레이어다.

---

# 6. PRIMARY — NEW CASE LOOP

신규 시험지 학습이 항상 최우선이다.

```text
시험지 생성
→ 보고
→ 듣고
→ 발음/소리
→ 철자 형태 익힘
→ 뜻 연결
→ 다양한 미니게임 반복
→ 취약 단어 집중
→ CODE RED 전체 검증
→ RETRACE
→ 필요한 단어 CODE RED 재검증
→ 시험 준비 완료
```

과거 단어 복습 때문에 이 흐름이 지연되거나 끊기면 FAIL이다.

---

# 7. 학습 Chapter 구조

정확한 세계관 명칭은 CONTROLLED FLEX로 두되 기능은 유지한다.

## CHAPTER 01 — FIRST CONTACT

목적: 시험이 아니라 **습득**.

- 영어 단어 보기
- TTS/발음 듣기
- 한국어 뜻 확인
- 철자 형태 관찰
- 필요 시 발음 반복
- 부담 없는 카드 인터랙션

## CHAPTER 02 — MEANING CHECK

목적: 영어 ↔ 뜻 구별 및 초기 취약도 탐지.

- 양방향 4지선다
- 정답/오답 기록
- 응답 속도 참고
- 후반부 취약 단어 가중

## CHAPTER 03 — CONNECTION

목적: 영어와 뜻의 빠른 연결.

- 타일 매칭
- 신규 단어 전체에 기본 노출 보장
- 이후 취약 단어 우선 재등장

## CHAPTER 04 — CODE RED

목적: **현재 시험지 전체의 철자 기억 최종 검증**.

CODE RED는 또 하나의 미니게임이 아니라 현재 사건의 최종 검증 단계다.

---

# 8. WEAK WORD PRIORITY — HARD LOCK

초기 학습에서는 신규 단어 전체에 충분히 고른 노출을 제공한다.

이후 라운드에서는 오답·PASS·느린 반응·힌트 사용 등을 근거로 취약 단어를 더 자주 제시한다.

예:

- 안정 단어 18
- 1회 오류 7
- 반복 오류 5

후반 4지선다/타일에서는 12개 취약 단어, 특히 반복 오류 5개에 더 많은 학습 기회를 제공한다.

단:

> **약한 단어 우선 ≠ 강한 단어 제거**

강한 단어도 간헐적으로 다시 확인한다.

정확한 가중치는 CONTROLLED FLEX이며 실제 사용 데이터를 통해 조정한다.

---

# 9. CODE RED KEY LOCK SYSTEM — HARD LOCK

## 9.1 목적

타자 실력을 측정하는 것이 아니다.

**현재 시험지 단어의 철자 기억을 최종 검증한다.**

## 9.2 기본 구조

- 단어 일부를 무작위 빈칸 처리.
- 실제 정답 문자 KEY 제공.
- 그럴듯한 가짜 KEY 제공.
- 실제 KEY를 올바른 슬롯에 배치.
- 기본 조작: Drag & Drop.
- 모바일 접근성 fallback: `KEY 탭 → SLOT 탭`.

## 9.3 빈칸

무제한 랜덤이 아니다.

단어 길이와 난이도를 고려한다.

초기 후보:
- 4~5자: 1~2칸
- 6~8자: 2~3칸
- 9자 이상: 3~4칸

정확한 수치는 CONTROLLED FLEX.

## 9.4 Fake Key

무의미한 q/x/z 반복 금지.

- 실제 혼동 가능한 문자
- 현재 시험지 다른 단어의 문자
- 형태상 헷갈리기 쉬운 문자

등을 활용한다.

### KEY VALIDATION RULE — HARD LOCK

생성된 KEY 조합에는 **정확히 하나의 유효한 철자 완성 방법만 존재**해야 한다.

복수 정답·애매한 조합은 FAIL.

## 9.5 오답

잘못된 KEY는 원위치 복귀.

과도한 실패 연출 금지.

## 9.6 시간

시간 제한은 반응속도 게임이 되지 않을 정도로 충분히 제공한다.

12/15/18초 등은 후보일 뿐이며 CONTROLLED FLEX.

종료 직전 경고는 부드럽게 처리하고 공격적인 적색 점멸을 피한다.

## 9.7 PASS

모르는 단어는 PASS 가능.

PASS는 실패 처벌이 아니라 “현재 확실하지 않음” 상태다.

## 9.8 상태 분리

다음 상태를 별도로 기록한다.

- CORRECT
- WRONG
- PASS
- TIMEOUT
- HINT_USED
- SLOW_CORRECT

모두 같은 오답으로 합치지 않는다.

## 9.9 Progressive Hint

1. 힌트 없음
2. 필요한 KEY 하나가 미세 반응
3. 정답 KEY가 관련 슬롯 가까이 이동
4. 문자 하나 자동 배치

힌트 사용 정답은 완전 숙달로 즉시 판정하지 않는다.

## 9.10 Fail → Learn Again → Recall Again

```text
CODE RED 전체 단어
→ WRONG / PASS / TIMEOUT / HINT-WEAK 수집
→ RETRACE 짧은 재학습
→ 해당 단어만 CODE RED 재검증
```

틀린 직후 정답을 보고 즉시 같은 문제를 반복하지 않는다.

RETRACE는 의미 선택, 타일, 듣기, 철자 노출 등을 짧게 조합한다.

---

# 10. CODE RED 대상 — HARD LOCK

기본 CODE RED는 **현재 신규 시험지의 모든 valid word**를 검증한다.

앞선 4지선다에서 맞았다는 이유로 CODE RED에서 제외하지 않는다.

이유:

> Recognition ≠ Unaided Recall

과거 시험지 단어는 일반 CODE RED에 섞지 않는다.

정상 의미:

> **CODE RED = 이번 학원 시험 범위 최종 검증**

과거 단어 전용 도전은 향후 `COLD CASE` 같은 별도 이벤트로 확장할 수 있다.

---

# 11. Case Mastery vs Memory Strength — HARD LOCK

두 지표를 절대 하나로 합치지 않는다.

## Case Mastery

현재 시험지의 시험 준비 상태.

- 현재 사건에만 영향.
- CODE RED와 RETRACE 완료를 중심으로 판정.
- 완료한 사건은 장기 기억 저하 때문에 다시 미완료로 되돌리지 않는다.

## Memory Strength

시간이 지난 후에도 단어를 기억하는 정도.

- 누적 어휘 데이터에 저장.
- 과거 단어 이벤트 및 선택적 복습 우선도에 활용.
- 아이에게 복잡한 숫자로 강제 노출할 필요 없음.

---

# 12. SECONDARY — MEMORY EVENT LOOP

```text
과거 시험지 보존
→ 과거 단어 기억 상태 누적
→ 현재 학습의 보기/이벤트에서 가볍게 재등장
→ 기억하면 유지
→ 틀리면 장기 복습 우선도 증가
→ 추후 이벤트/오답복습에서 다시 만남
```

과거 단어는 신규 학습의 **양념**이다.

## 허용

- 4지선다 distractor
- 가벼운 정보원 이벤트
- 선택적 오답 복습
- 별도 과거 사건 이벤트

## 금지

- 신규 시험지 흐름을 반복적으로 중단.
- 과거 단어 오류 때문에 현재 학습을 강제로 이탈.
- 일반 CODE RED에 과거 단어 혼합.
- 장기복습이 현재 과제보다 높은 비중 차지.

## Event Cooldown

정확한 빈도는 CONTROLLED FLEX이나 다음 원칙은 LOCK한다.

- 연속 과거 이벤트 금지.
- 세션별 상한 존재.
- 신규 학습의 핵심 구간을 방해하지 않음.
- Skip해도 실패/스트릭 손실/부정 기록 없음.

---

# 13. 4지선다 Distractor Safety

과거 단어 뜻을 오답 보기로 활용할 수 있다.

단:

- 정답과 의미적으로 중첩되는 보기 금지.
- 동의어/유사어 때문에 복수 정답처럼 느껴지는 구성 금지.
- 영어 학습을 한국어 뉘앙스 맞히기로 변질시키지 않는다.

Ambiguous = FAIL.

---

# 14. TEST SHEET CREATION — CAMERA FIRST

홈의 최우선 CTA:

> **사진으로 시험지 만들기**

입력 경로:

1. 카메라로 찍기
2. 사진 보관함에서 선택
3. 직접 입력

카메라와 사진 보관함 input을 논리적으로 분리한다.

---

# 15. IMAGE INGESTION PIPELINE — HARD LOCK

```text
SOURCE SELECT
→ FILE PREFLIGHT
→ IMAGE DECODE
→ EXIF / ORIENTATION NORMALIZE
→ DOCUMENT QUALITY CHECK
→ PREPROCESS VARIANTS
→ OCR PASS
→ WORD / MEANING PAIR PASS
→ CROSS VALIDATION
→ RESULT REVIEW
→ TEST SHEET COMMIT
```

OCR 결과를 바로 학습 데이터에 push하지 않는다.

---

# 16. FILE PREFLIGHT

검사:

- 파일 존재
- size > 0
- MIME
- 확장자
- decode 가능 여부
- 이미지 dimensions
- 과도한 크기/저해상도
- JPEG / PNG / WEBP / HEIC / HEIF 대응

MIME이 비었다고 무조건 JPEG로 가장하지 않는다.

브라우저에서 decode 가능한 경우 processing copy를 만들 수 있다.

HEIC/HEIF는 브라우저/API 지원 상태를 구분해 처리한다.

---

# 17. IMAGE NORMALIZATION & QUALITY

- EXIF orientation 보정
- createImageBitmap 또는 Image+Canvas 활용 가능
- 장변 약 2000~2600px processing copy 후보
- 원본은 세션 내 보존
- blur
- exposure
- 문서 크기
- 텍스트 크기
- skew
- aspect

등을 확인한다.

문서가 명백히 읽기 어려우면 재촬영을 안내한다.

Capture Guide Overlay를 제공할 수 있다.

---

# 18. PREPROCESS RECOVERY

기본 단계:

1. Natural
2. Document Enhanced
3. Region / Crop Retry

처음부터 모든 변형을 무한 실행하지 않는다.

실패 원인에 맞춰 bounded retry한다.

---

# 19. OCR ≠ CONTENT GENERATION — HARD LOCK

## PASS 1 — SEE

사진에 실제 보이는 문자열을 가능한 정확하게 전사한다.

- 순서 유지
- 행/열 관계 유지
- 추측 금지
- 예문 생성 금지
- 힌트 생성 금지
- 불확실 영역 표시

## PASS 2 — PAIR

영어 단어와 한국어 뜻의 구조적 대응을 판단한다.

**Pair Accuracy가 최우선 OCR 품질 지표다.**

## PASS 3 — ENRICHMENT

사용자가 확인한 단어/뜻에 대해서만 필요 시:

- 예문
- 힌트
- 발음 보조

등을 생성한다.

OCR과 생성 작업을 한 요청에서 뒤섞지 않는 것을 원칙으로 한다.

---

# 20. OCR CROSS VALIDATION

검사:

- 영어 단어 형식
- 중복
- 의미 누락
- 제목/헤더 오인식
- 반복 이상
- 행 순서
- 위치 관계
- 서로 다른 OCR pass의 spelling disagreement

Confidence:

- HIGH
- MEDIUM
- LOW

사용자 UI에서는 지나치게 기술적인 숫자보다:

- 정상
- 확인 필요

중심으로 보여준다.

Silent Hallucination 금지.

---

# 21. RECOGNITION REVIEW — HARD LOCK

시험지 저장 전에 검토 화면을 반드시 거친다.

단, 사용자가 30개 전체를 하나씩 승인하도록 만들지 않는다.

예:

> `30개를 찾았어. 2개만 확인해줘.`

기능:

- 원본 이미지 preview
- 행 수정
- 삭제
- 추가
- 재정렬
- 확인 필요 강조
- 해당 영역 재분석
- 사진 교체/추가
- 시험지 만들기

`needsReview=true` 항목은 해결 전 Quiz/CODE RED에서 제외한다.

---

# 22. USER EDIT PROTECTION — HARD LOCK

사용자가 OCR 결과를 직접 수정한 필드는 AI 재분석이나 enrichment가 자동 덮어쓰지 않는다.

예:

```text
AI: enviroment
USER: environment
→ manuallyEdited = true
→ 이후 자동 overwrite 금지
```

필요한 경우 사용자가 명시적으로 재분석/재설정을 요청해야 한다.

---

# 23. ATOMIC COMMIT — HARD LOCK

OCR 분석 중에는 Draft를 사용한다.

```text
ocrDraft
→ validation
→ review
→ user confirmation
→ atomic test-sheet commit
```

중간 실패가 기존 시험지나 학습 데이터를 훼손해서는 안 된다.

여러 사진으로 하나의 시험지를 구성할 수 있다.

---

# 24. DATA MODEL DIRECTION

목표 구조:

```text
schemaVersion
profile
settings
sheets[]
activeSheetId
lexicon / wordMemory
learning
ocrDrafts
sessions
```

## Sheet

후보 필드:

```text
sheetId
title
createdAt
updatedAt
testDate?
sourceType
sourceCount
items[]
recognitionMeta
status
caseMastery
```

## Sheet Item

```text
id
lexicalId
eng
kor
sourceSense?
example
hints
sourceImageIndex
sourceOrder
confidence
needsReview
manuallyEdited
learningStats
```

## Cumulative Word / Sense Memory

동일 spelling을 lowercase 문자열 하나만으로 무조건 병합하지 않는다.

`light`, `present` 등 의미가 달라질 수 있기 때문이다.

권장:

```text
canonical spelling / lemma
→ source or sense records
→ sheet references
→ cumulative memory
```

후보 필드:

```text
firstSeen
sourceRefs[]
lastSeen
correctTotal
wrongTotal
consecutiveCorrect
lastWrong
memoryStrength
nextReviewPriority
```

현재 시험용 통계와 장기 기억 통계를 분리한다.

---

# 25. TEST SHEET STATE MACHINE — HARD LOCK

시험지는 단순 화면 위치가 아니라 명시적 상태를 가진다.

권장 상태:

```text
DRAFT
→ REVIEW_REQUIRED
→ READY
→ LEARNING
→ CODE_RED_READY
→ RETRACE_REQUIRED
→ TEST_READY
→ COMPLETED
→ ARCHIVED
```

상태 전이는 검증된 조건으로만 진행한다.

중간 종료 후 현재 상태에서 안전하게 복귀해야 한다.

Dead-end state 금지.

---

# 26. INTERRUPT / RESUME — HARD LOCK

아이가 한 세션에 모든 단어를 끝내지 않아도 된다.

- 중간 종료 패널티 없음.
- 정확한 진행 위치 저장.
- 재접속 시 이어하기.
- 현재 Chapter/word/progress 복원.
- CODE RED 중단 시 완료·미완료 상태 보존.
- streak를 중단 자체로 처벌하지 않음.

파트너 예:

> `여기까지 기록했어. 다음에 이어서 잡으면 돼.`

---

# 27. TEST DATE — CONTROLLED FLEX

시험일은 유용하지만 일정관리 앱으로 확장하지 않는다.

시험지 생성 시:

- 시험일 있음 / 없음
- 선택적 날짜 입력

홈 예:

> `목요일 시험 · 30단어 · CODE RED 8개 남음`

알림·복잡한 스케줄 관리 기능은 별도 검토 없이 핵심에 추가하지 않는다.

---

# 28. CASE COMPLETION

사건 성공은 “처음부터 한 번도 틀리지 않음”이 아니다.

```text
전체 학습
→ CODE RED 전체 검증
→ 불안정 단어 발견
→ RETRACE
→ 대상 단어 재검증
→ 최종 확인
→ 사건 준비 완료
```

실패한 단어까지 다시 배워 확인한 것이 성공이다.

체포율/준비도 산정 시 `needsReview` 미해결 단어는 별도 처리한다.

정확한 UI 산식은 구현 전에 검증한다.

---

# 29. DELETE / ARCHIVE / MEMORY POLICY

과거 시험지 보존이 장기 기억의 기반이다.

- Archive와 Delete를 구분.
- Archive는 학습 화면에서 숨길 수 있으나 기억 데이터는 보존.
- Delete가 누적 기억에 미치는 영향을 사용자에게 명확히 표시.
- 같은 단어가 다른 시험지에도 존재하면 한 시험지 삭제 때문에 공유 기억 데이터가 무조건 사라지지 않음.
- 데이터 파괴 작업은 명시적 사용자 행동을 요구.

---

# 30. PARTNER SYSTEM

캐릭터는 콘텐츠의 중심이 아니라 학습을 덜 지루하게 만드는 동행자다.

역할:

- **수사 파트너** — 신규 시험지 학습 동행.
- **정보원** — 과거 단어 이벤트/특별 힌트.
- **분석관** — 사진/OCR/오류/결과 정리.
- **현장요원** — CODE RED 분위기 보조 가능.

기능적 능력 차이를 두지 않는다.

캐릭터에 따라 더 좋은 힌트, 더 쉬운 문제, 학습 보너스를 제공하지 않는다.

---

# 31. ONE VOICE CORE — HARD LOCK

여러 캐릭터가 있더라도 완전히 다른 AI 성격 시스템을 만들지 않는다.

하나의 Voice Core에서 강조점만 랜덤화한다.

목표 비율:

- 직관성 35
- 친절함 30
- 위트 20
- 장난기 10
- 시크함 5

핵심 문장:

> **명확하게 말하고, 친절하게 돕고, 한 번씩 웃기고, 아주 가끔 시크하게 끝낸다.**

사용자를 가르치는 경찰이 아니라 **같이 사건을 해결하는 파트너**다.

---

# 32. COPY RULE

대부분 1문장, 최대 2문장.

순서:

```text
무슨 일이 일어났는지 명확히
→ 가벼운 위트
→ 다음 행동
```

금지:

- 과잉 칭찬
- 유아어
- 훈계
- 반복 감탄
- 실패 조롱
- 사용자 탓
- 세계관 때문에 기능 의미가 불명확한 문구

실제 특정 영화 대사나 특정 작가의 고유 표현을 복제하지 않는다.

---

# 33. COPY EXAMPLES

홈:
> `새 사건이 들어왔어. 시험지부터 볼까?`

카메라:
> `시험지를 화면 안에 넣어줘. 단서는 내가 찾을게.`

사진 양호:
> `좋아, 글씨가 꽤 또렷해. 이 정도면 수사 가능.`

흐림:
> `음… 단서가 좀 흐릿하네. 한 장만 더 선명하게 찍어보자.`

OCR:
> `단어 흔적 찾는 중… 잠깐만.`

인식:
> `용의 단어 30개 발견. 꽤 북적이는 사건이네.`

확인 필요:
> `28개는 확실해. 2개가 살짝 발뺌 중이야. 이것만 확인해줘.`

시험지 생성:
> `사건 파일 작성 완료. 이제 잡으러 가면 돼.`

정답:
> `정확해. 한 명 확보.`

오답:
> `아깝네. 이 단어, 생각보다 미끄럽다. 추적 목록에 넣어둘게.`

재추적:
> `놓쳤다고 끝난 건 아니지. 다시 추적.`

CODE RED:
> `CODE RED. 이제 힌트는 줄어든다.`

PASS:
> `좋아, 이건 일단 표시해둘게. 뒤에서 다시 보자.`

종료:
> `수사는 여기까지 할까? 기록은 그대로 남겨둘게.`

과거 사건:
> `정보 하나 들어왔어. 이 단어, 지난번에도 본 적 있지?`

과거 정답:
> `기억하고 있네. 기록 이상 없음.`

과거 오답:
> `흠, 기억이 조금 흐려졌네. 기록해둘게.`

---

# 34. VISUAL MASTER

방향:

- 밝은 동물 도시 수사 세계
- 경찰 본부
- 사건 파일
- 증거 사진
- 지도
- 배지
- 제한적인 glass/material depth
- 어린 사용자에게 부담 없는 판타지 수사 분위기

금지:

- 지나치게 어두운 범죄 게임
- 과도한 네온
- 과도한 금속 HUD
- 반복적인 흰색/크림 카드만 쌓은 generic UI
- 핵심 아이콘의 emoji 의존
- 특정 상업 캐릭터/로고/장면 직접 복제

제작 에셋은 독자적인 ZPD Word 세계관으로 originalize한다.

---

# 35. MOBILE UI PRIORITY

화면 우선순위:

```text
현재 행동
→ 현재 시험지
→ 학습 진행
→ 캐릭터
→ 부가 통계
```

상단 iPhone notch/status 영역을 침범하지 않는다.

배경은 화면 전체를 활용하되 콘텐츠는 safe-area를 지킨다.

학습 화면에서는 헤더를 compact하게 한다.

캐릭터가 문제보다 크게 주목받지 않는다.

---

# 36. BOTTOM NAVIGATION

기본 구조:

- 홈
- 시험지
- 수사 퀴즈
- 내 단어장
- 기록

하단 safe-area를 준수한다.

아이콘/텍스트가 지나치게 작거나 흐리지 않게 한다.

시작 화면의 주요 CTA와 겹치지 않는다.

---

# 37. HOME

최우선:

**사진으로 시험지 만들기**

그 다음:

- 현재/최근 시험지 이어하기
- 시험일 및 준비 상태
- CODE RED 남은 단어
- 오늘의 진행

보상·통계·캐릭터가 핵심 CTA를 밀어내지 않는다.

---

# 38. TEST SHEET / CASE FILE CABINET

시험지는 Settings에 숨기지 않는다.

최상위 기능으로 취급한다.

- 최근 사건
- 진행 중
- 준비 완료
- 완료
- 보관

등을 쉽게 찾는다.

---

# 39. FREE QUIZ

현재 활성 시험지와 연결된다.

필요 시 사건/시험지를 선택할 수 있다.

무엇을 학습하는지 불명확한 자유 퀴즈는 피한다.

---

# 40. CALENDAR / RECORD

날짜와 다음 정보를 연결할 수 있다.

- 생성 시험지
- 학습 진행
- CODE RED
- 완료
- 과거 사건 기록

캘린더 자체가 제품 중심이 되지 않는다.

---

# 41. ERROR HANDLING

에러는 원인을 가능한 범위에서 구분한다.

예:

- 파일 문제
- 이미지 decode
- 저화질
- 네트워크
- 인증/API
- OCR 실패
- pairing 불확실
- 저장 실패

“사진 분석 실패” 하나로 모든 오류를 숨기지 않는다.

에러 문구는 사용자를 탓하지 않는다.

예:

> `사진은 괜찮아. 연결이 잠깐 끊긴 것 같아. 다시 분석하면 돼.`

---

# 42. NETWORK / API

- timeout
- bounded retry
- backoff
- auth error 분리
- 모델 변경 시 regression test

Gemini 모델명은 MASTER의 영구 HARD LOCK으로 두지 않는다.

공개 배포에서는 브라우저에 장기 API Key를 노출하는 구조를 피하고 proxy/server-side 보호 구조를 우선 검토한다.

Export 데이터에 API key를 포함하지 않는다.

---

# 43. PWA / OFFLINE

오프라인에서도 가능한 기능:

- 저장된 시험지 보기
- 카드 학습
- 기존 단어 퀴즈
- 기록 확인

온라인 필요:

- 신규 이미지 OCR/AI 분석 등 네트워크 의존 기능

서비스워커/cache version과 앱 revision/schema 변경을 함께 관리한다.

---

# 44. DATA SAFETY

- schemaVersion 관리
- migration 지원
- 기존 데이터 보존
- 장기 Base64 이미지를 localStorage에 무제한 저장하지 않음
- 필요 시 IndexedDB 활용
- 기존 시험지/오답/진행/기록의 silent loss 금지
- 업데이트 전후 migration 검증

---

# 45. 기존 기능 보존 원칙

새 MASTER 구현 시 호환 가능한 기존 기능을 임의 삭제하지 않는다.

보존 대상 예:

- 직접 단어 추가
- 카드 학습
- TTS
- 발음 fallback
- 양방향 선택형
- 오답 자동 저장
- 타일
- best 기록
- CODE RED
- 힌트
- 오답 재검증
- XP
- level
- streak
- calendar
- themes
- export/import
- PWA install/offline

단, MASTER와 충돌하는 구현 방식은 기능 목적을 보존하면서 재설계할 수 있다.

---

# 46. SELF-VALIDATION FRAMEWORK — HARD LOCK

## 46.1 MASTER SELF-VALIDATION

문서 단계에서 검사:

### STRUCTURE
사진 → 시험지 → 학습 → 취약단어 → CODE RED → 재추적 → 완료 흐름이 끊기지 않는가?

### LEARNING
각 미니게임에 명확한 기억 기능이 있는가?

### DATA
시험지·단어·오답·장기기억·진행 데이터가 안전한가?

### STATE
중단/복귀/완료/보관 상태에 모순이나 dead-end가 없는가?

### OCR
SEE와 PAIR가 분리되고 검토 전 저장되지 않는가?

### UX
12세 사용자가 과도한 설명 없이 다음 행동을 이해할 수 있는가?

### COPY
파트너 Voice Lock을 지키는가?

### VISUAL
밝고 독창적인 동물 도시 수사 세계관을 유지하는가?

모순 발견 = FAIL.

---

# 47. RESULT SELF-VALIDATION — HARD LOCK

실제 결과물에서 검사:

- 카메라 입력 실제 동작
- 사진 보관함 실제 동작
- orientation 정상
- OCR 실제 사진 처리
- word↔meaning pairing
- low confidence review
- 사용자 수정 보호
- atomic commit
- 중간 종료 후 복귀
- 4지선다 취약단어 weighting
- 타일 weighting
- CODE RED 전체 현재 단어 대상
- Drag & Drop
- Tap fallback
- Fake Key ambiguity 없음
- PASS
- TIMEOUT
- Hint 상태 기록
- RETRACE target 정확
- targeted re-CODE RED
- past event current-flow 방해 없음
- 데이터 migration
- offline
- installability
- mobile safe-area

Prompt가 요구사항을 포함했다고 PASS가 아니다.

**실제 결과가 맞아야 PASS다.**

---

# 48. REGRESSION GATE — HARD LOCK

새 Revision은 단순히 이전과 달라진 것이 아니라 **실제로 더 좋아져야 한다.**

검사:

- 기존 정상 기능이 사라졌는가?
- 단계가 불필요하게 늘었는가?
- 학습 시간이 길어졌는가?
- 신규 단어 집중도가 떨어졌는가?
- 조작이 어려워졌는가?
- OCR 안정성이 낮아졌는가?
- UI가 더 예뻐졌지만 핵심 CTA가 약해졌는가?
- 장기복습이 현재 시험 준비를 방해하는가?
- 디자인 언어가 확정 기준에서 후퇴했는가?

Merely Different ≠ Better.

Regression 발견 = FAIL.

---

# 49. OCR RELEASE TARGET

목표값은 검증 기준이지 근거 없는 보장이 아니다.

후보 목표:

- English word recall ≥ 98%
- word↔meaning pair ≥ 97%
- hallucinated row = 0
- false empty success = 0
- committed data loss = 0

실제 사진 Golden Dataset으로 측정한다.

초기 30장 → 이후 50~100장 이상 확장 권장.

---

# 50. CODE RED VALIDATION CHECKLIST

반드시 실제 동작으로 확인:

- 모든 valid current-sheet word가 대상인가?
- 과거 단어가 섞이지 않는가?
- 빈칸이 매번 안전하게 변하는가?
- Fake Key 때문에 복수 정답이 생기지 않는가?
- Drag가 모바일에서 작동하는가?
- Tap fallback이 작동하는가?
- PASS가 기록되는가?
- TIMEOUT이 별도 기록되는가?
- 힌트 사용 정답이 완전 숙달로 오인되지 않는가?
- 틀린 직후 동일 정답을 즉시 재노출하지 않는가?
- RETRACE 후 정확한 단어만 재검증되는가?

하나라도 모호하면 FAIL.

---

# 51. DEPLOYMENT GATE

배포 전:

1. MASTER SELF-VALIDATION PASS
2. 구현 syntax/build PASS
3. 데이터 migration PASS
4. 실제 모바일 입력 PASS
5. OCR real-photo PASS
6. 학습 loop PASS
7. CODE RED PASS
8. interrupt/resume PASS
9. PWA/offline PASS
10. visual/copy PASS
11. regression PASS

통과본만 GitHub/PWA 배포 후보가 된다.

---

# 52. 구현 우선순위

MASTER 확정 후 구현은 다음 순서를 권장한다.

```text
1. Camera / Photo ingestion architecture
2. OCR SEE / PAIR / Review / Atomic Commit
3. sheets[] + cumulative lexicon/memory migration
4. Test Sheet State Machine + Resume
5. Multimodal Chapter learning
6. Weak Word Priority Engine
7. CODE RED KEY LOCK
8. RETRACE + targeted retry
9. Sparse Past Memory Event Engine
10. Original ZPD visual system
11. Full Result Self-Validation
12. Regression / Deployment Gate
```

UI부터 먼저 바꾸지 않는다.

---

# 53. 현재 MASTER에서 HOLD할 확장

다음은 좋은 아이디어일 수 있으나 핵심 구현보다 앞서지 않는다.

- COLD CASE 과거 단어 전용 이벤트
- 복잡한 장기 기억 그래프
- 고급 AI 캐릭터별 성격 엔진
- 복잡한 학원 일정 관리
- 지나치게 많은 추가 미니게임
- 보상 경제 확장
- 소셜 기능

핵심 학습 루프가 안정된 후 별도 검토한다.

---

# 54. MASTER SCENARIO TEST

다음 실제 시나리오가 자연스럽게 통과해야 한다.

> 목요일에 30단어 시험을 보는 아이가 오늘 시험지를 사진으로 찍는다. OCR이 28개는 정확히 읽고 2개는 확인 필요로 표시한다. 아이가 2개를 수정하고 시험지를 만든다. 학습 도중 앱을 두 번 종료하지만 정확한 위치에서 다시 이어간다. 5개 단어를 반복해서 틀려 후반 미니게임에서 더 자주 만나게 된다. CODE RED에서는 30개 전체를 확인하고 3개를 PASS한다. 3개는 즉시 정답 재시험하지 않고 RETRACE에서 다시 학습한 뒤 작은 CODE RED 재검증을 통과한다. 사건은 시험 준비 완료가 된다. 한 달 뒤 일부 단어의 Memory Strength가 낮아져 정보원 이벤트에서 가볍게 다시 등장하지만 이미 완료한 과거 사건의 Case Mastery는 떨어지지 않는다.

이 시나리오에서 데이터 손실, 흐름 단절, 의미 충돌, 강제 장기복습, 모호한 상태가 발생하면 FAIL이다.

---

# 55. FINAL MASTER PRINCIPLE

ZPD Word의 성공 기준은 화면 수, 캐릭터 수, 게임 수가 아니다.

```text
정확하게 시험지를 만든다.
→ 신규 단어를 자연스럽게 익힌다.
→ 모르는 단어에 시간을 더 쓴다.
→ CODE RED에서 이번 시험 범위를 전부 확인한다.
→ 실패한 단어는 다시 배우고 다시 회상한다.
→ 과거 단어는 현재 과제를 방해하지 않는 수준에서 다시 만난다.
→ 모든 데이터와 진행을 안전하게 보존한다.
→ MASTER와 실제 결과를 각각 검증한다.
→ 이전보다 실제로 좋아진 결과만 다음 Revision으로 인정한다.
```

### 최종 운영 원칙

> **MASTER → 분석 → 최적화 → 오류 검증 → MASTER Self-Validation → 구현 → 실제 결과 검증 → Regression 검증 → PASS본 제시 → 피드백 → MASTER**

이 순환 구조는 이후 REV_04, REV_05 및 향후 PWA 업데이트에서도 유지되는 **ZPD Word의 최상위 운영 엔진**이다.

---

## REV_06 통합 범위 요약

REV_05는 REV_04 전체 기준을 보존하면서 지금까지 논의된 다음 내용을 통합한다.

- CAMERA-FIRST 시험지 생성
- OCR SEE / PAIR 분리
- Pair Accuracy 우선
- Review-before-Commit
- User Edit Protection
- Atomic Commit
- sheets[] + cumulative memory 구조
- 신규 시험지 우선 학습
- multimodal chapter learning
- WEAK WORD PRIORITY
- CODE RED 전체 현재 단어 검증
- CODE RED KEY LOCK
- PASS / TIMEOUT / WRONG / HINT_USED 분리
- RETRACE → targeted re-CODE RED
- Case Mastery / Memory Strength 분리
- 과거 단어 sparse event 구조
- Event cooldown
- Test Sheet State Machine
- Interrupt / Resume
- optional Test Date
- Delete / Archive / Memory policy
- Original animal-city investigation visual direction
- One Voice Core
- MASTER CONTROL LOOP
- MASTER / RESULT 이중 Self-Validation
- Regression Gate
- No User-as-QA
- Deployment Gate



---

# 56. PARTNER IDENTITY & NAMING — HARD LOCK

파트너는 특정 상업 캐릭터의 고정 이름이나 외형을 사용하지 않는다.

최초 설정은 짧고 선택적으로 제공한다.

```text
내 수사 파트너
→ 추천 이름 받기
→ 직접 이름 짓기
→ 나중에 정하기
```

규칙:

- 추천 이름은 여러 후보 중 선택할 수 있다.
- 직접 입력 가능.
- 이름은 나중에 변경 가능.
- 이름 설정을 건너뛸 수 있다.
- 이름이나 캐릭터 선택에 따른 학습 능력, 힌트 품질, 난이도 차등 금지.
- 파트너 설정이 신규 시험지 생성과 학습 시작을 지연시키면 FAIL.
- 파트너는 “선생님”보다 함께 사건을 해결하는 길잡이/동료의 역할을 가진다.

---

# 57. 2.5D VIVID CINEMATIC VISUAL LOCK — HARD LOCK

ZPD Word의 기본 캐릭터·세계관 표현은 완전한 3D도, 평면 2D도 아닌 **고밀도 2.5D 애니메이션 일러스트**를 기준으로 한다.

구성:

- 2D 애니메이션처럼 명확한 실루엣과 표정.
- 3D 애니메이션처럼 자연스러운 볼륨, 광원, 재질감.
- 초고밀도이지만 모바일에서 정보 가독성을 해치지 않는 디테일.
- Green / Teal / Sky Blue 중심의 밝고 비비드한 자연색.
- 햇빛, 나무, 물, 공원, 하늘과 동물 도시가 공존하는 청량한 환경.
- Police Red / Blue는 상시 배경색이 아니라 상태 변화용 제한적 accent.
- Beige / White 카드가 화면 대부분을 차지하는 generic 교육앱 구성 지양.
- 캐릭터가 문제·단어·CTA보다 시각적으로 우선하면 FAIL.

세계관은 동물 도시 수사/탐험의 재미를 활용하되 특정 상업 작품의 캐릭터, 의상, 로고, 장면, 대사를 직접 복제하지 않는다.

---

# 58. FIXED BOTTOM PARTNER DIALOGUE — HARD LOCK

일반 학습 화면의 기본 파트너 표현은 **하단 고정형 대화 UI**다.

목적:

- 화면의 핵심 문제를 가리지 않는다.
- 파트너가 항상 함께 있다는 느낌을 준다.
- 짧은 힌트·진행 안내·실패 회복·이벤트 반응을 제공한다.

기본 구성:

```text
파트너 얼굴/상반신
+ 이름
+ 1~2문장 대사
+ 필요 시 음성 버튼
+ 상황에 맞는 1개의 주요 액션
```

중요한 순간만 캐릭터 연출을 확대할 수 있다.

- 사건 시작
- OCR 완료
- FEVER 진입
- CODE RED 시작
- 사건 최종 완료
- 특별 장기기억 이벤트

대화 영역이 문제 조작 영역, Letter Key Tray, CTA 또는 하단 safe-area와 충돌하면 FAIL.

---

# 59. PARTNER VOICE SYSTEM — ADOPT / CONTROLLED FLEX

길잡이 파트너의 주요 대사는 음성으로도 제공할 수 있다.

음성 우선순위:

```text
1. 영어 단어 발음 / 학습 TTS
2. 중요한 파트너 안내
3. CODE RED / 상태 변화 안내
4. 이벤트 대사
5. 일반 리액션
```

HARD LOCK:

- 영어 단어 발음 중 파트너 음성이 덮어쓰지 않는다.
- 사용자가 다음 문제로 이동하면 불필요한 이전 대사는 즉시 중단 가능해야 한다.
- 모든 사소한 반응을 음성화하여 시끄럽게 만들지 않는다.
- 음성 없이도 모든 학습 기능과 정보가 완전해야 한다.
- 캐릭터 음성 종류에 따른 학습 기능 차등 금지.
- 음성 ON/OFF 및 음량 조절 제공.
- 효과음과 파트너 음성을 분리 조절할 수 있도록 설계.
- 실제 음성 구현 방식과 음색 수는 CONTROLLED FLEX.

Voice Core의 친절함·위트·장난기·시크함 비율은 기존 COPY LOCK을 따른다.

---

# 60. ZPD EMOTIONAL RHYTHM SYSTEM — HARD LOCK

앱 전체가 항상 같은 강도의 게임 연출을 사용하지 않는다.

```text
CALM
→ FLOW
→ FEVER
→ ALERT / CODE RED
→ CLEAR
→ CALM
```

## CALM

- 신규 단어 습득
- 카드
- 듣기
- 뜻 연결
- 청량한 자연과 안정적인 움직임

## FLOW

- 연속 정답
- 학습 리듬 상승
- 자연 배경과 UI에 미세한 생동감 증가

## FEVER

- 성공 흐름에 대한 짧은 보너스 연출
- 학습 난이도나 판정 기준은 변경하지 않음

## ALERT / CODE RED

- 최종 검증
- 집중도 상승
- 제한적인 Police Red / Blue accent
- 시간 부족 시 감각적 경고

## CLEAR

- 사건 해결
- 긴장 해제
- 밝은 자연색과 보상 연출
- 이후 CALM으로 복귀

---

# 61. FLOW GAUGE & FEVER TIME — HARD LOCK

FEVER는 단순 시간 제한이 아니라 **연속 성공으로 충전되는 Flow Gauge**와 연결한다.

```text
연속 성공
→ FLOW GAUGE 충전
→ FEVER READY
→ 짧은 FEVER 연출
→ 정상 학습으로 자연스럽게 복귀
```

FEVER 때문에:

- 문제 제한시간을 부당하게 줄이지 않는다.
- 문제 난이도를 갑자기 올리지 않는다.
- Case Mastery 판정을 왜곡하지 않는다.
- 취약 단어 학습을 건너뛰지 않는다.

정확한 발동 조건과 지속시간은 CONTROLLED FLEX.

---

# 62. FEVER FOOD RAIN EVENT — ADOPT / CONTROLLED FLEX

FEVER의 대표 시각 연출은 **음식이 하늘에서 축제처럼 쏟아지는 Food Rain**으로 설정할 수 있다.

목표는 보상 화면을 별도 팝업으로 막는 것이 아니라, 현재 학습 세계가 순간적으로 축제처럼 반응하는 느낌이다.

연출 후보:

- 하늘에서 피자, 도넛, 버거, 과일, 음료 등 작은 음식 일러스트가 떨어진다.
- 일부는 원근에 따라 크기와 속도가 다르다.
- 파트너가 짧게 반응한다.
- FLOW GAUGE가 FEVER 상태로 변한다.
- 짧은 celebratory sound와 함께 사용 가능.

HARD LOCK:

- 음식이 문제 텍스트, 정답 보기, Letter Key, 빈칸, CTA를 가리면 FAIL.
- 음식 오브젝트가 정답 입력 대상으로 오인되면 FAIL.
- 과도한 파티클로 프레임 성능이 떨어지면 FAIL.
- FEVER 때문에 학습 문제 진행이 중단되면 FAIL.
- Reduced Motion에서는 정적인 축제 배경/소수 오브젝트로 대체.
- 음식 종류와 밀도, 지속시간은 CONTROLLED FLEX.

---

# 63. TIME FEEDBACK — PULSE TIME GAUGE HARD LOCK

시간 제한이 필요한 학습에서는 숫자 카운트다운만 강조하기보다 **감각적인 Visual Time Gauge**를 기본으로 한다.

권장 구조:

- 문제 영역 또는 핵심 오브젝트 주변의 얇은 light gauge.
- 시간이 흐르면 부드럽게 소진.
- 평상시 Green / Teal.
- 마지막 구간에서 Amber.
- 정말 촉박할 때만 제한적으로 Police Red / Blue accent.

CODE RED에서는 자물쇠/문제 프레임 주변의 원형 또는 윤곽형 게이지를 우선 검토한다.

Letter Key, 빈칸, 문제 텍스트는 타이머 때문에 흔들거나 점멸시키지 않는다.

### 의미 분리

```text
TIME GAUGE = 남은 풀이 기회
FLOW GAUGE = 쌓아가는 성공감
```

둘을 하나의 게이지로 혼합하지 않는다.

---

# 64. POLICE ALERT & SIREN EFFECT — CONTROLLED FLEX

시간이 촉박할 때 경찰 세계관을 활용한 Alert 효과를 사용할 수 있다.

단계 후보:

```text
NORMAL
→ AMBER ALERT
→ FINAL ALERT
```

FINAL ALERT에서만:

- 화면 가장자리의 짧은 Red / Blue light sweep
- 타이머 주변 경광등 반사
- 짧은 radio chirp / low alert tone
- 필요 시 파트너의 한 문장 안내

실제 경찰 사이렌처럼 길고 큰 소리를 반복 재생하는 것은 기본값으로 사용하지 않는다.

예:

> `시간 얼마 안 남았어. 아는 열쇠부터 잡아.`

효과음 / 파트너 음성 / 긴장 연출은 각각 조절 또는 비활성화할 수 있어야 한다.

---

# 65. EFFECT NEVER OVERRIDES LEARNING — HARD LOCK

모든 시각·음향·캐릭터 연출의 최상위 제한 규칙이다.

> **연출은 학습을 강화해야 하며 학습을 덮어서는 안 된다.**

다음 중 하나라도 발생하면 FAIL:

- 문제 정보를 가림.
- 정답 판단을 방해.
- 실제 풀이 시간을 애니메이션이 소비.
- 영어 단어 발음을 다른 음성이 덮음.
- CODE RED Letter Key Drag & Drop을 방해.
- 파티클이 터치 타깃으로 오인됨.
- 시각 점멸이 과도함.
- 효과음이 반복되어 피로도를 높임.
- 효과 때문에 신규 단어 학습보다 게임 보상이 중심이 됨.

---

# 66. ACCESSIBILITY & PRESSURE CONTROL — HARD LOCK

시각·음향 효과가 추가되더라도 사용자에게 제어권을 제공한다.

필수 방향:

- Reduced Motion 대응.
- 효과음 ON/OFF.
- 파트너 음성 ON/OFF.
- 배경음악 별도 조절.
- 긴장 연출 감소 옵션 검토.
- 색상만으로 시간/성공/실패 상태를 전달하지 않음.
- 게이지는 형태/길이/아이콘 등 보조 단서를 함께 사용.
- 음성이 꺼져도 텍스트 안내 유지.

정확한 설정 UI는 CONTROLLED FLEX.

---

# 67. CODE RED VISUAL ENFORCEMENT — HARD LOCK

향후 모든 UI 시안에서 CODE RED는 다음 구조를 시각적으로 명확하게 보여야 한다.

```text
부분 철자가 보이는 WORD
+ 여러 BLANK SLOT
+ 정답 Letter Key
+ 가짜 Letter Key
+ 섞인 LETTER KEY TRAY
+ Drag & Drop
+ Tap Key → Tap Slot fallback
+ PULSE TIME GAUGE
+ Hint
+ PASS
+ 하단 Partner Dialogue
```

큰 자물쇠 여러 개 중 하나를 고르는 방식, 열쇠 아이콘 하나를 선택하는 방식, 단순 객관식 방식으로 표현하면 MASTER 위반이다.

CODE RED의 자물쇠는 세계관 상징/상태 표현일 뿐, **핵심 학습 조작은 철자 Letter Key 재구성**이다.

---

# 68. REV_06 NEW IDEA VALIDATION RESULT

이번 Revision 후보에 추가된 아이디어를 MASTER CONTROL LOOP 기준으로 검토한 결과:

| 아이디어 | 판정 | MASTER 반영 |
|---|---|---|
| 파트너 추천 이름 | ADOPT | 이름 추천/직접 입력/나중에 설정 |
| 파트너 직접 이름 짓기 | ADOPT | 변경 가능, 기능 차등 없음 |
| 2D와 3D 사이의 고밀도 비주얼 | ADOPT | 2.5D Vivid Cinematic Lock |
| Green/Teal/Sky 자연도시 | ADOPT | Visual Lock |
| 하단 고정 파트너 대화 | ADOPT | Fixed Bottom Partner Dialogue |
| 파트너 음성 대사 | ADOPT | TTS 우선순위와 사용자 제어 포함 |
| Fever Time | ADOPT | Flow Gauge 기반 |
| 음식 비 Fever 연출 | ADJUST | 학습 비가림·성능·Reduced Motion 제한 |
| 경찰 사이렌 | ADJUST | 지속 사이렌 대신 제한적 Alert |
| 감각적 시간 게이지 | ADOPT | Pulse Time Gauge |
| 시간 부족 Red/Blue 경광 효과 | ADJUST | 마지막 구간에만 제한 |
| 효과 설정 | ADOPT | 음성/효과/긴장 연출 사용자 제어 |
| CODE RED Letter Key UI 강제 | ADOPT | 시안 회귀 방지 규칙 강화 |

검토 결과 핵심 학습 구조를 대체하거나 후퇴시키는 아이디어는 채택하지 않았다.

---

# 69. REV_06 SELF-VALIDATION ADDENDUM

REV_03의 전체 Self-Validation Gate를 유지하며 다음을 추가 검사한다.

### PARTNER

- 고정 상업 캐릭터 이름/외형이 남아 있지 않은가?
- 추천 이름/직접 이름/나중에 설정이 가능한가?
- 캐릭터 선택에 학습 기능 차등이 없는가?
- 하단 대화가 문제 조작을 가리지 않는가?

### VOICE

- 단어 TTS와 파트너 음성이 충돌하지 않는가?
- 다음 문제 이동 시 이전 음성을 정리하는가?
- 음성을 꺼도 정보 손실이 없는가?

### VISUAL

- 2.5D Vivid 방향을 유지하는가?
- 자연도시 Green/Teal/Sky가 기본인가?
- Red/Blue가 상시 과잉 사용되지 않는가?
- 캐릭터/일러스트가 학습보다 앞서지 않는가?

### FEVER

- Flow Gauge와 Time Gauge가 구별되는가?
- Food Rain이 문제/CTA를 가리지 않는가?
- FEVER가 학습 판정에 영향을 주지 않는가?
- Reduced Motion에서도 사용 가능한가?

### TIME / ALERT

- 시간 게이지가 직관적으로 소진되는가?
- 마지막 구간만 Alert가 강화되는가?
- Letter Key가 점멸/이동하여 조작을 방해하지 않는가?
- 사이렌이 장시간 반복되지 않는가?

### CODE RED

- Letter Key Tray가 실제로 존재하는가?
- 정답/가짜 철자가 섞여 있는가?
- Blank Slot에 Drag & Drop 가능한가?
- Tap fallback이 있는가?
- Key Validation Rule을 통과하는가?
- PASS/Hint/Time Gauge/Partner Dialogue가 서로 충돌하지 않는가?

하나라도 모호하면 FAIL.

---

# 70. REV_06 EXPERIENCE PRINCIPLE

ZPD Word의 감정적 경험은 다음처럼 정리한다.

> **맑은 자연도시에서 나만의 파트너와 사건을 시작하고, 단어를 알아갈수록 흐름이 살아나며, 연속 성공하면 도시가 잠깐 축제처럼 반응하고, CODE RED에서는 감각적인 긴장감 속에서 진짜 철자 열쇠를 찾아 사건을 해결한다. 성공 후에는 다시 평온한 세계로 돌아온다.**

그러나 모든 연출의 우선순위는 항상 다음과 같다.

```text
학습 정확성
> 조작 명확성
> 데이터 안전
> 접근성
> 파트너 경험
> 시각·음향 효과
```

**멋있지만 학습을 방해하면 채택하지 않는다.**




---

# 71. GUIDE COMPANION REFINEMENT — HARD LOCK

REV_05에서는 기존 Partner System을 폐기하지 않고, Snap & Pop의 Guide Companion 원칙을 ZPD Word의 수사 세계관에 맞게 정교화한다.

핵심 정의:

> **길잡이는 정답을 대신 주는 교사나 채점자가 아니라, 사용자의 학습 상태를 관찰하고 함께 사건을 해결하는 살아 있는 수사 동료다.**

역할:

- 사용자의 현재 상태를 관찰한다.
- 필요할 때 짧은 힌트를 준다.
- 오답이나 침묵을 압박하지 않는다.
- 성공/실패에 과도한 감정 반응을 하지 않는다.
- 짧은 위트와 장난으로 학습 긴장을 완화한다.
- 다음 학습 행동을 자연스럽게 연결한다.
- 실제 학습 정보보다 앞서지 않는다.

금지:

- 정답을 바로 말해주는 교사형 동작.
- 지속적인 칭찬 반복.
- 실패에 대한 실망/비난/압박.
- 캐릭터 때문에 학습 정보가 가려지는 구조.
- 파트너가 게임의 중심 콘텐츠처럼 과도하게 전면화되는 구조.

---

# 72. GUIDE CHARACTER OPTIONS — HARD LOCK

길잡이 선택은 능력 선택이 아니라 **취향과 애착 형성**을 위한 것이다.

기본 후보군 예:

- 강아지
- 고양이
- 랫서팬더
- 토끼
- 여우
- 수달
- 작은 새
- 기타 독자적 동물 캐릭터

정확한 종 구성은 CONTROLLED FLEX.

HARD LOCK:

- 캐릭터별 힌트 품질 차등 금지.
- 캐릭터별 난이도 차등 금지.
- 캐릭터별 보상 배율 차등 금지.
- 캐릭터별 학습 데이터 접근 차등 금지.

UI 용어는 따뜻한 동행 표현을 우선한다.

권장:

- `나의 수사 동료`
- `파트너 만나기`
- `같이 갈래?`
- `동행 맺기`
- `이름 지어주기`

피해야 할 표현:

- 채용
- 고용
- 용병
- 전투원 모집

---

# 73. GUIDE NAME SYSTEM — HARD LOCK

파트너 이름은 고정하지 않는다.

기본 흐름:

```text
파트너 만나기
→ 이름 추천받기
→ 직접 이름 짓기
→ 나중에 정하기
```

추천 이름:

- 짧고 기억하기 쉬움.
- 약간의 장난기나 개성이 있을 수 있음.
- 지나치게 유아적이지 않음.
- 특정 상업 캐릭터명 모방 금지.

사용자는 언제든 이름을 변경할 수 있다.

이름 설정이 신규 시험지 등록과 학습 시작을 막거나 지연시키면 FAIL.

---

# 74. ONE PERSONALITY CORE + EMPHASIS VARIANTS — HARD LOCK

캐릭터마다 완전히 다른 AI Personality를 만들지 않는다.

모든 길잡이는 하나의 ZPD Voice Core를 공유한다.

기본 성격:

> **친절 + 장난 + 위트 + 약간의 시크함 + 약간의 엉뚱함**

강조점만 달라질 수 있다.

예:

- 장난 많은 친구
- 느긋한 친구
- 궁금한 친구
- 은근히 시크한 친구

이 차이는 대사 톤과 표정 연출에만 반영한다.

정답 판정, 힌트 정보, 학습 로직, 오류 안내, 데이터 상태는 항상 동일해야 한다.

---

# 75. GUIDE RESPONSE PATTERN — HARD LOCK

ZPD Word의 파트너 반응은 다음 구조를 기본으로 한다.

```text
관찰
→ 짧은 위트
→ 상태 인정
→ 다음 수사 행동
```

예:

오답:

> `environment가 또 슬쩍 빠졌네. 철자 한 번만 다시 추적해보자.`

긴 고민:

> `조금 오래 걸리고 있네. 괜찮아, 아는 글자부터 잡아보자.`

취약 단어:

> `이 녀석 자꾸 빠져나가네. 다음 라운드에서 한 번 더 보자.`

CODE RED:

> `진짜 열쇠만 골라. 가짜도 섞여 있어.`

PASS:

> `좋아, 이건 표시해둘게. 뒤에서 다시 만나자.`

과거 단어 이벤트:

> `익숙한 얼굴인데? 지난 사건에서 본 적 있지.`

금지:

- `최고야!`
- `천재야!`
- `대단해!`
- 과잉 감탄 반복
- 사용자 실패를 놀리는 문장
- 가르치려 드는 장문의 설명
- 캐릭터 세계관 때문에 실제 기능 의미가 불명확한 문장

---

# 76. GUIDE PERFORMANCE SYSTEM — HARD LOCK

길잡이는 단순한 작은 얼굴 아이콘이 아니다.

필요한 순간 다음 표현을 조합해 **살아 있는 동행자**처럼 반응한다.

- 표정
- 시선
- 고개 방향
- 귀 움직임
- 꼬리 움직임
- 손짓
- 몸의 기울기
- 짧은 소품
- 짧은 대사
- 음성

단, 항상 모든 요소를 동시에 사용하지 않는다.

### 상황별 연출

#### 일반 학습
- 편안한 표정.
- 단어 카드 또는 문제를 함께 바라본다.
- 하단 대화 영역에서 작은 상반신 표현.

#### 오래 고민
- 고개를 살짝 기울임.
- 문제 영역을 바라봄.
- 조급한 몸짓 금지.

#### 힌트
- 확대경, 메모 수첩, 작은 단서 카드 등.
- 정답을 직접 가리키는 소품 사용 금지.

#### WEAK WORD
- 표정이 살짝 진지해짐.
- 메모 수첩에 표시하는 작은 동작.

#### CODE RED
- 무전기, 배지, 사건 파일 등의 소품 사용 가능.
- 핵심 Letter Key Tray와 Blank Slot보다 앞서면 FAIL.

#### 시간 부족
- 타이머/게이지 쪽으로 시선 이동.
- 캐릭터 자체가 크게 흔들리거나 당황하지 않음.

#### 정답
- 작은 미소, 고개 끄덕임, 짧은 손짓.
- 과도한 점프/폭죽 금지.

#### 오답
- 실망 표정 금지.
- 다시 단서를 보는 행동.

#### FEVER
- 음식 비를 잠깐 즐기는 반응.
- FEVER 연출보다 캐릭터가 과도하게 앞서지 않음.

#### 완료
- 사건 파일을 닫거나 배지를 들어 보이는 정도.
- 이후 자연스럽게 CALM 상태로 복귀.

---

# 77. FIXED BOTTOM DIALOGUE + EDGE POPUP HYBRID — HARD LOCK

기본은 하단 고정형 대화 UI를 유지한다.

그러나 모든 상황에서 캐릭터를 같은 크기와 같은 위치로 고정하지 않는다.

구조:

```text
NORMAL
→ 하단 고정 대화형 캐릭터

IMPORTANT MOMENT
→ 화면 가장자리 작은 팝업/오버레이 확장

MAJOR EVENT
→ 짧은 확대 연출 후 다시 하단 복귀
```

IMPORTANT MOMENT 예:

- OCR 완료
- 취약 단어 경고
- 힌트
- CODE RED 시작
- PASS
- RETRACE 진입

MAJOR EVENT 예:

- 사건 시작
- FEVER 진입
- 최종 ALL CLEAR

오버레이가 문제, 버튼, Letter Key Tray, Blank Slot, Time Gauge를 가리면 FAIL.

---

# 78. GUIDE VOICE PERFORMANCE — HARD LOCK

파트너 음성은 화면 텍스트와 같은 정보를 짧게 보조한다.

음성 우선순위는 기존 REV_04 규칙을 유지한다.

```text
영어 단어 발음
> 중요 파트너 안내
> CODE RED 상태 안내
> 이벤트 대사
> 일반 리액션
```

추가 규칙:

- 파트너 음성은 1~2문장 중심.
- 일반 정답마다 음성을 자동 재생하지 않는다.
- 반복 오답에서도 같은 문장을 계속 재생하지 않는다.
- 다음 화면/문제로 이동 시 불필요한 음성 중단.
- 음성 없는 상태에서도 모든 정보가 동일하게 이해 가능.
- 음성의 성격은 캐릭터 강조점에 따라 약간 변화 가능.
- 기능 정보 자체는 바뀌지 않는다.

---

# 79. GUIDE VISUAL SCALE & PRIORITY — HARD LOCK

모바일 학습 화면의 시각 우선순위는 항상:

```text
문제 / 현재 행동
→ 학습 정보
→ 진행 상태
→ 길잡이
→ 보조 장식
```

가이드 캐릭터의 기본 점유 영역은 학습 화면의 핵심 문제 영역보다 작게 유지한다.

캐릭터 확대는 이벤트 순간에만 짧게 허용한다.

다음 경우 FAIL:

- 캐릭터 얼굴이 단어보다 더 크게 강조.
- 캐릭터 일러스트가 Letter Key Tray보다 큰 조작 요소처럼 보임.
- 파트너 말풍선이 CTA를 밀어냄.
- 캐릭터 배경 장식 때문에 텍스트 대비가 낮아짐.

---

# 80. GUIDE SELF-VALIDATION GATE — HARD LOCK

향후 모든 시안/구현은 다음을 검사한다.

### ROLE
- 교사/채점자가 아니라 동료인가?
- 정답을 대신 주지 않는가?
- 실패를 압박하지 않는가?

### PERSONALITY
- 하나의 Voice Core가 유지되는가?
- 캐릭터별 차이는 강조점 수준인가?
- 과잉 칭찬/유아 말투가 없는가?

### PERFORMANCE
- 표정/시선/몸짓/소품이 상황에 맞는가?
- 캐릭터가 살아 있는 동행자처럼 느껴지는가?
- 과도한 연출이 없는가?

### UI
- 하단 대화가 핵심 조작을 가리지 않는가?
- 필요한 순간만 edge popup으로 확장되는가?
- CODE RED Letter Key UI를 절대 가리지 않는가?

### VOICE
- 영어 발음과 충돌하지 않는가?
- 반복 재생이 피로를 만들지 않는가?
- 음성 OFF에서도 정보 손실이 없는가?

### FUNCTIONAL EQUALITY
- 캐릭터별 기능 차이가 없는가?
- 힌트 품질 차등이 없는가?
- 보상 차등이 없는가?

하나라도 모호하면 FAIL.

---

# 81. REV_06 GUIDE COMPANION ADJUSTMENT RESULT

이번 정교화는 신규 시스템 교체가 아니라 기존 REV_04 Partner System의 **ADJUST**다.

| 항목 | 판정 | 결과 |
|---|---|---|
| Snap & Pop 길잡이 역할 원칙 | ADOPT | ZPD 수사 동료 역할로 변환 |
| 캐릭터 선택의 애착 중심 | ADOPT | 기능 차등 금지 유지 |
| 이름 추천 / 직접 입력 | ADOPT | 기존 이름 시스템 강화 |
| 하나의 Personality Core | ADOPT | 캐릭터별 강조점만 허용 |
| 관찰→장난→인정→호기심 | ADJUST | 관찰→위트→상태 인정→다음 수사 행동 |
| 살아 있는 동행자 Performance | ADOPT | 표정/시선/몸짓/소품/음성 |
| 하단 고정형만 사용 | ADJUST | 하단 기본 + 필요 시 edge popup |
| 과잉 칭찬 금지 | ADOPT | ZPD Copy Lock 강화 |
| 캐릭터별 기능 능력 차이 | REJECT | 모든 기능 동일 유지 |

---

# 82. REV_06 FINAL EXPERIENCE PRINCIPLE

> **ZPD Word의 길잡이는 화면 아래에서 말을 거는 장식 캐릭터가 아니다. 사용자의 학습 상태를 보고, 필요한 순간에 표정·시선·몸짓·짧은 대사와 음성으로 반응하며 함께 사건을 해결하는 수사 동료다. 하지만 언제나 단어와 학습 행동이 캐릭터보다 우선한다.**

REV_05의 최종 감정 흐름:

```text
맑은 자연도시
→ 나만의 길잡이와 사건 시작
→ 신규 단어를 함께 관찰
→ 취약 단어를 함께 추적
→ FLOW / FEVER로 짧은 즐거움
→ CODE RED에서 집중
→ RETRACE로 다시 추적
→ 사건 해결
→ 과거 단어와 가벼운 재회
→ 다시 새로운 사건
```




---

# 83. USER PROFILE & AVATAR SYSTEM — HARD LOCK

사용자는 앱의 주인공이며 길잡이와 별개의 존재다.

기본 온보딩 흐름:

```text
사용자 이름 입력
→ 사진 촬영 또는 앨범 선택
→ ZPD 세계관용 2.5D 일러스트 아바타 생성
→ 원본/일러스트 미리보기
→ 확정
→ 홈 프로필 적용
```

HARD LOCK:
- 사용자 이름과 길잡이 이름을 혼동하지 않는다.
- 사용자 프로필과 길잡이 프로필을 UI에서 명확히 분리한다.
- 사용자 아바타는 밝은 파스텔 Green / Mint / Sky Blue 기반의 ZPD 자연도시 2.5D 스타일을 따른다.
- 특정 상업 캐릭터 외형을 직접 복제하지 않는다.
- 사용자 사진은 앱의 필수 기능이 아니다.
- `나중에 하기`를 허용한다.
- 사진을 제공하지 않아도 기본 아바타/실루엣으로 앱 사용 가능.
- 사진/아바타 설정이 시험지 등록과 학습 시작을 지연시키면 FAIL.
- 원본 사진 보존 여부는 사용자 선택 또는 명확한 저장 정책으로 분리한다.
- 원본 사진을 불필요하게 장기 저장하지 않는다.

---

# 84. USER AVATAR VISUAL LOCK — HARD LOCK

사용자 사진 기반 아바타는 실사 사진을 그대로 UI의 중심에 노출하는 방식보다 **ZPD 세계관에 맞춘 고밀도 2.5D 일러스트 프로필**을 기본으로 한다.

목표:
- 사용자 본인이라는 인식 가능성.
- 세계관과 자연스러운 통일.
- 밝고 세련된 애니메이션 질감.
- 과도한 캐릭터화로 실제 인상이 사라지지 않음.
- 아동용 과잉 귀여움 금지.

표현 요소:
- 얼굴 특징은 자연스럽게 보존.
- 복장/소품은 ZPD 탐험·수사 세계관에 맞춰 조정 가능.
- 배경은 밝은 자연도시, 공원, 수사본부 등.
- 프로필용 크롭에서도 식별 가능하도록 얼굴 중심 구성.

---

# 85. USER PROFILE DATA SAFETY — HARD LOCK

프로필 데이터는 다음처럼 분리한다.

```text
profile
- displayName
- avatarMode
- avatarAssetRef
- originalPhotoRef?
- createdAt
- updatedAt
```

원본 사진이 필요한 경우:
- 별도 저장 여부를 명확히 한다.
- export 기본값에서 원본 사진을 제외할 수 있다.
- 삭제 시 아바타와 원본의 관계를 명확히 한다.
- 장기 Base64 localStorage 저장 금지.
- 필요 시 IndexedDB 또는 안전한 파일 저장 구조 사용.

---

# 86. GUIDE CREATION FLOW — HARD LOCK

길잡이는 사용자 프로필 생성과 별도의 흐름으로 만든다.

```text
파트너 만나기
→ 동물 캐릭터 선택
→ 성격 강조점 선택
→ 이름 추천받기 / 직접 이름 짓기 / 나중에 정하기
→ 동행 시작
```

선택 가능한 성격 강조점:
- 장난 많은 친구
- 느긋한 친구
- 궁금한 친구
- 은근히 시크한 친구

이 차이는 대사 표현, 표정, 몸짓에만 반영한다.
기능 능력은 동일하다.

---

# 87. GUIDE CHARACTER SELECTOR — HARD LOCK

길잡이 캐릭터 선택 화면은 단순 카드 목록이 아니라 **애착 형성 중심의 짧은 만남 경험**으로 구성한다.

각 후보는 다음을 보여줄 수 있다.
- 이름 전 상태의 임시 호칭
- 동물 종류
- 짧은 성격 키워드
- 2.5D 포즈
- 작은 한마디
- 음성 미리듣기
- `같이 갈래?`

HARD LOCK:
- 능력 수치 표시 금지.
- 희귀도/등급/전투력 표현 금지.
- 강제 선택 금지.
- 나중에 변경 가능.
- 기본 학습 진행을 막지 않는다.

---

# 88. GUIDE NAME RECOMMENDATION — HARD LOCK

이름 추천은 캐릭터 선택 이후 제공한다.

추천 기준:
- 동물 종류
- 성격 강조점
- 짧고 부르기 쉬운 길이
- 약간의 위트와 개성
- 특정 상업 캐릭터 이름과 직접 유사하지 않음

UI:

```text
이름 추천받기
→ 3~5개 후보
→ 다시 추천
→ 직접 입력
→ 이 이름으로 결정
```

추천 이름은 학습 데이터와 무관하다.
언제든 설정에서 변경 가능.

---

# 89. USER + GUIDE RELATIONSHIP LOCK — HARD LOCK

UI에서 사용자는 **주인공**, 길잡이는 **동행자**다.

```text
USER
→ 주인공 / 학습 행동 주체

GUIDE
→ 관찰 / 힌트 / 반응 / 동행
```

홈:
- 사용자 이름/아바타는 개인 프로필 영역에 표시.
- 길잡이는 별도 동행 영역에 표시.
- 둘이 같은 프로필 카드에 합쳐져 누가 사용자이고 누가 캐릭터인지 혼동되면 FAIL.

학습 화면:
- 사용자 아바타는 최소화 가능.
- 길잡이는 하단/edge popup에서 상황 반응.
- 문제와 학습 정보가 최우선.

---

# 90. ONBOARDING LENGTH CONTROL — HARD LOCK

권장:

```text
Step 1 사용자 이름
Step 2 사용자 아바타 (선택)
Step 3 길잡이 선택 (선택/건너뛰기)
Step 4 이름 정하기 (선택)
→ 바로 시험지 만들기
```

각 단계:
- `나중에 하기` 허용.
- 최초 설정 후 설정 메뉴에서 변경 가능.
- 총 온보딩이 길어져 사진 시험지 생성보다 앞서는 느낌이면 FAIL.

---

# 91. PROFILE / GUIDE SELF-VALIDATION GATE — HARD LOCK

### USER PROFILE
- 사용자 이름 입력 가능?
- 사진 촬영/앨범 선택이 선택 사항인가?
- 사진 없이도 사용 가능한가?
- 아바타가 ZPD 2.5D 스타일인가?
- 원본 사진 저장 정책이 명확한가?

### GUIDE
- 동물 캐릭터 선택 가능?
- 이름 추천받기 가능?
- 직접 이름 입력 가능?
- 이름 변경 가능?
- 성격 강조점만 다르고 기능은 동일한가?

### RELATIONSHIP
- 사용자가 주인공으로 느껴지는가?
- 길잡이는 동행자로 보이는가?
- 홈/학습에서 역할이 혼동되지 않는가?

### FLOW
- 온보딩을 건너뛸 수 있는가?
- 신규 시험지 생성이 최종 우선인가?
- 설정 때문에 학습 시작이 지연되지 않는가?

하나라도 모호하면 FAIL.

---

# 92. REV_06 FINAL INTEGRATION RESULT

REV_06은 REV_05 전체 구조를 유지하면서 다음을 추가 확정한다.

- 사용자 이름 설정
- 사용자 사진 촬영 / 앨범 선택
- ZPD 세계관 2.5D 일러스트 아바타
- 사용자 아바타와 길잡이 완전 분리
- 원본 사진 저장 정책
- 길잡이 캐릭터 선택
- 길잡이 성격 강조점 선택
- 이름 추천받기
- 직접 이름 짓기
- 나중에 정하기
- 사용자=주인공 / 길잡이=동행자 관계
- 짧고 건너뛸 수 있는 온보딩

기존 REV_05의 HARD LOCK과 핵심 학습 구조는 모두 유지한다.

---

# 93. FINAL SOURCE OF TRUTH STATEMENT — HARD LOCK

> **사용자는 자신의 이름과 ZPD 세계관 아바타를 가진 주인공이다. 사용자는 직접 선택하고 이름 붙인 길잡이와 함께 밝은 자연도시에서 신규 단어 사건을 해결한다. 길잡이는 살아 있는 수사 동료로 반응하지만 학습을 대신하지 않는다. 사진으로 시험지를 만들고, 신규 단어를 충분히 익히고, 약한 단어를 집중적으로 다시 만나고, CODE RED에서 철자를 최종 검증하고, 실패한 단어는 RETRACE를 통해 다시 회상한다. 연출과 캐릭터는 학습을 돕되 절대 학습보다 앞서지 않는다.**




---

# 94. OFFICIAL MASTER → RELEASE CLOSED LOOP — HARD LOCK

REV_07부터 ZPD Word의 공식 제작·검증·배포 프로세스는 아래 순환구조를 최상위 HARD LOCK으로 사용한다.

```text
MASTER 보완
→ 시안 제작
→ 시안 검토 / Self-Validation
→ 배포용 UI 확정
→ 기능 검토
→ 기능 명세 확정
→ PWA 구현
→ 실제 브라우저 검증
→ 기능·데이터·PWA 테스트
→ 오류 수정 / 재검증
→ Release Candidate Freeze
→ 배포
→ 실제 배포 URL 테스트
→ Install / Offline / Cache 검증
→ Release PASS
→ 실제 사용 피드백
→ 다음 MASTER 개선
→ 다시 MASTER 보완
```

이 프로세스는 일회성 직선 작업이 아니라 **배포 후 실제 사용 결과가 다음 MASTER Revision으로 돌아오는 폐쇄형 순환구조**다.

요약:

```text
MASTER
→ DESIGN
→ VALIDATION
→ UI FREEZE
→ SPEC
→ BUILD
→ BROWSER QA
→ FUNCTION / DATA / PWA QA
→ FIX & RE-VALIDATE
→ RC FREEZE
→ DEPLOY
→ LIVE QA
→ INSTALL / OFFLINE / CACHE QA
→ RELEASE PASS
→ REAL USE FEEDBACK
→ NEXT MASTER
```

---

# 95. STAGE GATE RULE — HARD LOCK

각 단계는 이전 단계의 검증을 통과해야 다음 단계로 이동한다.

다음 행위는 금지한다.

- MASTER 검토 없이 신규 아이디어를 바로 구현.
- 시안 Self-Validation 없이 배포용 UI로 확정.
- 기능 명세가 불명확한 상태에서 구현 시작.
- 로컬 실행만 확인하고 Release Candidate로 판정.
- ZIP 생성만으로 배포 완료 판정.
- 배포 URL 확인 없이 Release PASS 판정.
- 실제 사용 피드백을 MASTER 검토 없이 즉시 코드에 반영.

어느 단계에서든 MASTER 위반·기능 후퇴·데이터 위험·시각적 드리프트·모바일 조작 오류가 발견되면 해당 단계에서 STOP하고 수정 후 동일 Gate를 다시 통과해야 한다.

`Ambiguous = FAIL` 원칙을 유지한다.

---

# 96. DESIGN FREEZE GATE — HARD LOCK

배포용 UI 확정 전 반드시 다음을 검증한다.

- REV 기준 Visual Baseline 준수.
- 밝은 자연도시 / 파스텔 Green·Mint·Sky 톤 준수.
- 초고밀도 일러스트는 배경·캐릭터·장식에 사용.
- 기능 텍스트는 실제 HTML/DOM 텍스트로 구현 가능해야 함.
- 생성 이미지 속 깨진 한글·영문을 기능 UI로 사용하지 않음.
- 사용자=주인공 / 길잡이=동행자 관계 유지.
- 길잡이가 문제·CTA·CODE RED Letter Key·Time Gauge를 가리지 않음.
- 모바일 Safe Area 및 하단 내비게이션 구조 검증.
- CODE RED가 MASTER의 Key Lock 구조와 시각적으로 일치.

검증을 통과한 시안만 `DEPLOYMENT UI BASELINE`으로 Freeze한다.

Freeze 이후 디자인 변경이 필요하면 사소한 구현 보정인지 MASTER 영향 변경인지 판정한다. MASTER 영향 변경이면 이전 단계로 되돌아간다.

---

# 97. FUNCTION SPEC FREEZE — HARD LOCK

UI Freeze 후 각 화면의 기능을 명세한다.

기능 명세에는 최소 다음이 포함되어야 한다.

- 진입 조건.
- 사용자 입력.
- 화면 상태.
- 상태 전이.
- 저장 데이터.
- 오류 상태.
- 중단/복귀.
- 접근성 fallback.
- 모바일 interaction.
- 성공/실패 판정.
- 다음 단계 연결.

특히 다음 기능은 명세 없이 구현하면 FAIL이다.

- Camera / Photo Library.
- OCR SEE / PAIR / Review / Commit.
- WEAK WORD PRIORITY.
- CODE RED Letter Key / Blank Slot.
- Drag & Drop + Tap fallback.
- Hint / PASS / TIMEOUT / WRONG.
- RETRACE.
- Case Mastery / Memory Strength.
- Past Memory Event.
- 사용자 프로필 / 길잡이 설정.
- Flow / Fever / Pulse Time Gauge.
- 데이터 export / import / migration.
- PWA install / offline / cache update.

---

# 98. IMPLEMENTATION VALIDATION MATRIX — HARD LOCK

PWA 구현 후 검증을 한 종류의 테스트로 합치지 않는다.

## A. FUNCTION TEST

- 버튼과 CTA.
- 화면 이동.
- 입력.
- Drag & Drop.
- Tap fallback.
- 음성.
- 타이머.
- Hint.
- PASS.
- RETRACE.
- OCR Review.
- 오류 복구.

## B. DATA TEST

- 신규 시험지 저장.
- 기존 시험지 보존.
- 취약 단어 상태.
- CODE RED 결과.
- PASS / TIMEOUT / WRONG / HINT_USED 분리.
- Case Mastery.
- Memory Strength.
- 세션 기록.
- 프로필 / 길잡이 설정.
- migration.
- export / import.
- 앱 재실행 후 데이터 유지.

## C. PWA TEST

- manifest.
- Service Worker.
- cache version.
- installability.
- standalone launch.
- offline launch.
- update behavior.
- old cache cleanup.
- icon / theme / start URL.
- safe-area.
- iOS / Android 핵심 동작.

각 영역은 독립적으로 PASS/FAIL을 기록한다.

---

# 99. ACTUAL BROWSER QA — HARD LOCK

정적 코드 검사나 문법 검사는 실제 브라우저 검증을 대체하지 못한다.

최소 검증 흐름:

```text
최초 실행
→ 사용자 프로필
→ 길잡이 선택 / 이름
→ 홈
→ 시험지 생성
→ OCR Review
→ 신규 단어 학습
→ WEAK WORD
→ CODE RED
→ 잘못된 Key 거절
→ Hint
→ PASS / TIMEOUT
→ RETRACE
→ targeted CODE RED
→ 완료
→ 기록
→ 앱 재실행
```

추가:

- 320px급 좁은 모바일 폭.
- 일반 iPhone 폭.
- 큰 모바일 폭.
- portrait safe-area.
- 키보드 표시 상태.
- touch interaction.

Prompt/코드가 MASTER를 따른다는 사실만으로 PASS하지 않는다.

**실제 생성 결과와 실제 동작을 검사해야 한다.**

---

# 100. FIX → RE-VALIDATE → REGRESSION LOOP — HARD LOCK

오류 발견 시:

```text
FAIL 발견
→ 원인 분류
→ 수정
→ 해당 기능 재검증
→ 관련 기능 Regression Test
→ MASTER 대조
→ PASS 시 다음 단계
```

수정 때문에 이전에 정상 작동하던 기능이 사라지거나 변질되면 FAIL.

사용자를 QA 담당자로 사용하지 않는다.

> **No User-as-QA**

사용자에게 제시하는 결과물은 내부적으로 확인 가능한 범위의 검증을 통과한 버전이어야 한다.

---

# 101. RELEASE CANDIDATE FREEZE — HARD LOCK

다음 조건을 모두 만족한 빌드만 Release Candidate(RC)로 Freeze한다.

- MASTER 구조 PASS.
- Deployment UI Baseline PASS.
- Function Spec PASS.
- 실제 브라우저 핵심 흐름 PASS.
- Function Test PASS.
- Data Test PASS.
- PWA 정적 검증 PASS.
- Self-Validation PASS.
- Regression Test PASS.
- Critical / Blocker 오류 0.
- 배포 파일 구조 확정.
- cache / schema / app version 확정.

RC Freeze 이후 신규 아이디어는 원칙적으로 현재 Release에 넣지 않는다.

신규 아이디어는 다음 MASTER 후보로 보낸다.

Blocker/Critical 수정이 발생하면 RC Freeze를 해제하고 수정 → 재검증 → 새 RC로 다시 Freeze한다.

---

# 102. DEPLOYMENT ≠ RELEASE PASS — HARD LOCK

다음은 Release PASS가 아니다.

- 코드 작성 완료.
- ZIP 생성 완료.
- GitHub commit 완료.
- Netlify/GitHub Pages 업로드 완료.
- URL이 열림.
- 첫 화면이 보임.

공식 상태는 다음처럼 구분한다.

```text
BUILD
→ VALIDATED BUILD
→ RELEASE CANDIDATE
→ DEPLOYED RC
→ LIVE VALIDATED RC
→ RELEASE PASS
```

> **Release PASS 이전에는 제품 작업을 '최종 완료'라고 판정하지 않는다.**

---

# 103. LIVE DEPLOYMENT QA — HARD LOCK

배포 후 반드시 실제 HTTPS URL에서 다시 검증한다.

검증:

- index 정상 로드.
- 모든 local asset 정상 로드.
- 경로 오류 없음.
- manifest 접근 가능.
- Service Worker 등록.
- cache 생성.
- 새로고침.
- 앱 종료 후 재실행.
- standalone 실행.
- 실제 Camera / Photo Library 호출.
- 실제 OCR 요청 환경.
- 데이터 저장/복구.
- 모바일 safe-area.
- 음성.
- CODE RED touch interaction.

개발 환경에서 PASS했더라도 실제 배포 URL에서 FAIL하면 Release PASS 금지.

---

# 104. INSTALL / OFFLINE / CACHE RELEASE GATE — HARD LOCK

PWA의 Release PASS에는 설치와 오프라인 검증이 포함된다.

최소 검증:

## INSTALL
- 홈 화면 추가 또는 설치 가능.
- 앱 아이콘 정상.
- 앱 이름 정상.
- standalone 시작.
- start_url 정상.

## OFFLINE
- 한 번 정상 로드한 뒤 네트워크가 없어도 앱 shell 실행.
- 저장된 시험지/학습 데이터 접근.
- 오프라인에서 OCR이 필요한 경우 명확한 온라인 필요 안내.
- 오프라인 때문에 기존 데이터가 손상되지 않음.

## CACHE
- 현재 Release cache version 확인.
- 구버전 cache 정리.
- 새 배포 후 업데이트 확인.
- stale HTML/JS 혼합 방지.
- Service Worker 업데이트 후 앱 기능 회귀 없음.

셋 중 하나라도 FAIL이면 Release PASS 금지.

---

# 105. RELEASE PASS DEFINITION — HARD LOCK

Release PASS 조건:

```text
MASTER PASS
+ DESIGN PASS
+ FUNCTION SPEC PASS
+ BROWSER PASS
+ FUNCTION PASS
+ DATA PASS
+ PWA PASS
+ REGRESSION PASS
+ DEPLOYED URL PASS
+ INSTALL PASS
+ OFFLINE PASS
+ CACHE PASS
= RELEASE PASS
```

실제 기기/배포 환경에서 아직 확인하지 못한 항목은 `PASS`로 추정하지 않는다.

상태는 명확히 구분한다.

- PASS
- FAIL
- PENDING DEVICE TEST
- PENDING LIVE TEST
- NOT APPLICABLE

---

# 106. REAL USE FEEDBACK → NEXT MASTER — HARD LOCK

Release PASS 이후 실제 사용 피드백을 수집한다.

피드백 예:

- 신규 시험지를 만드는 데 오래 걸림.
- OCR Pair 오류.
- 특정 단어가 충분히 반복되지 않음.
- CODE RED가 너무 쉽거나 어려움.
- Timer가 부담됨.
- 길잡이 대사가 반복됨.
- Fever가 학습을 방해함.
- 과거 단어 이벤트가 너무 잦음.
- 실제 학원 시험 준비 시간이 줄었는지.
- 아이가 어떤 화면에서 자주 중단하는지.

피드백을 즉시 코드에 넣지 않는다.

반드시:

```text
실제 사용 피드백
→ 문제 정의
→ 기존 MASTER 대조
→ 영향 분석
→ 충돌 / 중복 / 후퇴 / 누락 검토
→ ADOPT / ADJUST / HOLD / REJECT
→ 다음 MASTER Revision
```

으로 돌아간다.

---

# 107. OFFICIAL REVISION CYCLE — HARD LOCK

Revision 번호는 MASTER 변경을 의미한다.

```text
REV_N MASTER
→ UI / SPEC / BUILD
→ RC_N
→ LIVE VALIDATION
→ RELEASE_N
→ REAL USE FEEDBACK
→ REV_N+1 MASTER
```

기존 MASTER Revision은 덮어쓰지 않는다.

파일명 규칙:

```text
## ZPD Word Ui Master Logic REV_숫자##.md
```

예:

```text
## ZPD Word Ui Master Logic REV_07##.md
```

`%` 또는 임의의 placeholder 문자를 파일명에 넣지 않는다.

---

# 108. REV_07 FINAL PROCESS PRINCIPLE — HARD LOCK

> **ZPD Word는 MASTER를 만든 뒤 바로 구현하고 배포하는 프로젝트가 아니다. MASTER에서 설계를 확정하고, 설계에서 기능을 확정하고, 구현 결과를 실제 브라우저와 데이터/PWA 관점에서 검증한 뒤 RC를 Freeze한다. 배포 후에도 실제 URL·Install·Offline·Cache까지 검증해야 Release PASS가 된다. 실제 사용 피드백은 다시 MASTER로 돌아가 다음 Revision을 만든다.**

최종 순환:

```text
MASTER 개선
      ↓
DESIGN
      ↓
SELF-VALIDATION
      ↓
UI FREEZE
      ↓
FUNCTION SPEC
      ↓
PWA BUILD
      ↓
BROWSER / FUNCTION / DATA / PWA QA
      ↓
FIX + REGRESSION
      ↓
RC FREEZE
      ↓
DEPLOY
      ↓
LIVE / INSTALL / OFFLINE / CACHE QA
      ↓
RELEASE PASS
      ↓
REAL USE
      ↓
FEEDBACK
      ↓
NEXT MASTER
      └──────────────→ 반복
```


**END OF ZPD WORD UI MASTER LOGIC REV_07**
