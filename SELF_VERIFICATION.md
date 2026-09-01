# Self-Verification · v3

## 1. 기록 마커 / 산술 방어
- limitTime <= 0 또는 NaN이면 60초로 복구.
- 최고기록이 0 이하 또는 제한시간 이상이면 제한시간의 70%를 표준 목표로 사용.
- 마커는 `(limit-best)/limit` 비율을 0~1로 clamp하여 게이지 폭에 비례 배치.

## 2. 타이머 / 코드 레드
- requestAnimationFrame 단일 루프 사용.
- 타일 화면 이탈, 재배치, 배치 완료 시 cancelAnimationFrame으로 정리.
- 최고기록 페이스를 넘기면 yellow warning, 잔여 20% 이하이면 CODE RED 점멸.
- 제한시간 종료 시 게임 상태 초기화 후 같은 배치를 재도전 가능.

## 3. 기록 저장
- 타일 수별(best by batch size) 최고 기록을 localStorage state에 저장.
- 비정상 기록은 UI 계산에 직접 사용하지 않음.

## 4. 기존 학습 데이터와 충돌 방지
- 시험지/오답/캘린더/XP 구조는 유지.
- 새 필드는 matchBestBySize, matchLimitSeconds, matchCodeRed이며 구버전 저장값에도 기본값 적용.

## 5. UI
- 특정 영화의 로고/고유 캐릭터를 복제하지 않고 동물도시 경찰 수사대, 배지, 사건파일, 도시 야경, 사이렌의 분위기로 재구성.
