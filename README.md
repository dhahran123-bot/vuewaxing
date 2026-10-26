# 뷰왁싱 02 — Cloudflare Pages용 인터랙티브 홈페이지

## 가장 쉬운 배포 방식

1. ZIP 압축을 푼다.
2. Cloudflare Pages 프로젝트의 GitHub 저장소에 기존 파일을 교체해 업로드한다.
3. Pages의 **Build output directory**가 `public`이면 `public/index.html`을 사용한다.
4. Pages의 Build output directory가 저장소 루트 `.`이면 최상위 `index.html`을 사용한다.
5. Framework preset = **None**, Build command는 비운다. Git 커밋 후 Pages가 새 배포를 완료한 뒤 새로고침한다.

**주의:** Worker가 아니라 현재 사용 중인 `*.pages.dev`의 Cloudflare Pages 설정 기준 안내입니다. 이 파일은 React/Vite/Node 패키지를 요구하지 않습니다.

두 index.html은 동일한 완전 단일 파일이며 내부에 CSS, JS, WebP 이미지를 전부 내장합니다. 별도의 CSS나 이미지 경로를 요청하지 않으므로 기존 CSS 미로딩 문제를 원천 차단합니다.

## 이번 버전에서 실제 동작하는 JavaScript

- 마우스 위치를 좇는 Hero 피부결 곡선, 진입 시 SVG 선 드로잉
- 스크롤 진행 상태를 보여주는 상단 헤어라인
- `IntersectionObserver` 기반 콘텐츠 등장과 fallback
- 1:1 맞춤 경험 **3단계 탭**: 이미지·제목·설명 실제 교체, 키보드 방향키 지원
- **이미지 갤러리**: 좌우 버튼, 마우스 드래그, 모바일 터치 스와이프, 위치 미터
- **상담 문구 실시간 생성기**: 주제·피부 참고사항·추가 질문 입력하면 즉시 텍스트 변경, 복사
- 모바일 메뉴 / 기본 `<details>` FAQ
- `prefers-reduced-motion` 지원

## 반드시 실제 자료로 교체할 것

연출 이미지 세 장은 AI 브랜드 콘셉트 이미지이지 실제 매장이나 시술을 촬영한 이미지가 아닙니다. 사진 교체, 실제 운영 정보(주소·영업시간·연락처·예약 링크), 서비스 가능 부위·가격 확인이 필요합니다. 예약이 접수된다고 표시하지 않습니다.

## 수정 원본

`src/main.css`, `src/main.js`, `src/template.html`은 수정을 위한 소스입니다. 운영용 `index.html`에는 CSS/JS/이미지가 내장되어 있어 경로 충돌이 없습니다. WordPress로 이전할 때에는 이 세 파일을 기준으로 블록과 별도 자산으로 분리하면 됩니다.

## 성능 참고

기존 오류를 반복하지 않기 위해 이미지가 HTML에 들어 있는 배포 친화적인 형태입니다. 정식 운영 시 실사진을 웹 최적화 이미지 파일로 별도 서빙해 캐시와 업데이트를 관리하는 것을 권장합니다.
