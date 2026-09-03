# ASSET POLICY — REV_06

## 핵심 규칙
- 사용자에게 보이는 기능 텍스트, 버튼명, 단어, 뜻, 게이지 수치, CODE RED 철자는 **HTML/CSS/JavaScript의 실제 텍스트/DOM**으로 렌더링합니다.
- 생성형 이미지에 들어간 한글/영문 텍스트를 기능 UI로 사용하지 않습니다.
- PNG 에셋은 배경 일러스트, 캐릭터, 아이콘처럼 텍스트 정확도가 필요 없는 시각 요소에만 사용합니다.
- CODE RED의 Letter Key와 Blank Slot은 모두 DOM 요소입니다.
- OCR 결과는 이미지 속 글자를 그대로 화면 이미지로 쓰지 않고 편집 가능한 입력 필드로 변환합니다.

## 에셋 폴더
- `assets/backgrounds/` : 자연도시/공간 배경
- `assets/characters/` : 길잡이 및 선택 캐릭터
- `assets/icons/` : PWA 앱 아이콘
- `assets/ui/` : 하단 내비게이션 아이콘

## 사용자 프로필 사진
- 원본 사진은 장기 저장하지 않습니다.
- 브라우저 내 Canvas에서 일러스트 톤으로 변환한 결과만 IndexedDB에 보관합니다.
- 사진 사용은 선택 사항이며 건너뛸 수 있습니다.
