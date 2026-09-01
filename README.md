# Word City Detective

밝은 동물도시 수사대 콘셉트의 영어 단어 학습 모바일 PWA입니다.

## 학습 모드

- 카드 학습: 카드 2회 확인 + TTS/발음 연습
- 4지선다: 영어→한글 / 한글→영어 랜덤 출제
- 타일 연결: 제한시간, 최고기록 마커, CODE RED 경고
- CODE RED: 아나그램 / 크립토그램 랜덤
- 내 단어장: 오답 누적 및 2회 복습 후 해제
- 학습 기록: XP, 연속 학습, 캘린더
- 사진 단어 추출: 설정에서 Google AI API Key 입력

## GitHub Pages 배포

1. GitHub에서 새 저장소를 만듭니다.
2. 이 폴더의 **내용 전체**를 저장소 루트에 업로드합니다.
3. 기본 브랜치는 `main`을 사용합니다.
4. 저장소의 **Settings → Pages**로 이동합니다.
5. **Build and deployment → Source**를 `GitHub Actions`로 선택합니다.
6. `main` 브랜치에 push하면 자동으로 배포됩니다.

## Windows PC 테스트 — Python 불필요

`PC_TEST_START.bat`을 더블클릭하세요.

- Windows 기본 PowerShell만 사용합니다.
- `http://localhost:5500/` 로컬 서버를 실행합니다.
- 브라우저가 자동으로 열립니다.
- Service Worker/PWA 테스트가 가능합니다.
- 종료하려면 열린 서버 창에서 `Ctrl+C`를 누릅니다.

## 주요 파일

```text
/
├─ index.html
├─ app.js
├─ styles.css
├─ manifest.json
├─ sw.js
├─ .nojekyll
├─ PC_TEST_START.bat
├─ tools/
│  └─ local-server.ps1
├─ assets/
└─ .github/
   └─ workflows/
      └─ pages.yml
```

## API Key 주의

Google AI API Key는 저장소 코드에 직접 넣지 마세요. 앱 설정 화면에서 입력하는 방식을 유지하세요.
