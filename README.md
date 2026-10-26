# VUE WAXING — Skin Archive

배포 파일은 루트 index.html 하나입니다. public/index.html은 사용하지 않습니다.

## Cloudflare Pages / GitHub
1. 기존 저장소의 중복 index/public 및 이전 생성 파일을 정리하고 이 ZIP의 내용을 저장소 루트에 넣습니다.
2. Framework preset: None, Build command: 비움, Build output directory: `.`.
3. 현재 Pages 프로젝트가 연결한 실제 production branch로 커밋합니다. 기존 프로젝트의 출력 경로가 public이면 반드시 `.`으로 변경합니다.
4. 배포 로그, /assets/main.css와 /assets/main.js의 HTTP 200, 모바일 화면을 확인합니다.
외부 라이브러리, 외부 폰트, 빌드 도구가 필요하지 않습니다. 실제 원격 배포는 수행하지 않았습니다.

## 수정
- index.html: 콘텐츠와 마크업
- assets/main.css: 디자인과 반응형·모션
- assets/main.js: 인터랙션
- assets/config.js: 검증된 HTTPS 예약 URL (빈 값이면 링크 생성 안 함)
- assets/image-0~2.webp: 원본 첨부의 AI 연출 이미지. 실제 매장 사진 아님
- docs/REPORT.md: 감사·방향·설계·검증 한계
- docs/WORDPRESS.md: 이전 가이드

로컬 실행: 이 폴더에서 `python -m http.server 8080` 후 http://localhost:8080 접속.
