# 뷰왁싱 — GitHub → Cloudflare 자동 배포용

**압축을 풀면 바로 GitHub에 업로드할 수 있는 완성된 정적 홈페이지입니다.**
메인 이미지·공간 이미지·관리 디테일 이미지 3장을 모두 포함합니다.
플러그인 설치나 별도 프레임워크, 빌드 과정은 필요 없습니다.

## 배포하기

1. GitHub에서 **`vue-waxing`** 이라는 이름으로 새 저장소를 만드세요.
2. ZIP을 풀고 나오는 **모든 파일과 폴더를 저장소의 최상위에** 업로드/커밋하세요. (ZIP 자체를 올리지 마세요.)
3. Cloudflare **Workers & Pages → Create application → GitHub 연결**에서 방금 만든 저장소를 선택하고 **Save and Deploy** 하세요. **Workers의 Git 연결**을 사용하세요. Pages의 프레임워크/빌드 디렉터리 설정 방식이 아닙니다.
4. 기본 Git 브랜치에 이후 변경 사항을 커밋하면 Cloudflare가 자동 재배포합니다.

`wrangler.jsonc`에 Cloudflare Workers의 정적 자산 배포 설정과 프로젝트 이름이 들어 있습니다. Cloudflare 프로젝트 이름이 표시된다면 **`vue-waxing`** 으로 유지하세요. 기본 배포 명령은 Cloudflare의 `npx wrangler deploy`입니다. 수동으로 설정할 필요가 없습니다.

## 구성

- `index.html` — 홈페이지 시작 파일 (저장소 루트에 있음)
- `assets/*.webp` — AI로 제작한 최적화 이미지 3장
- `css/vue-waxing.css` — 디자인/모바일 대응
- `js/vue-waxing.js` — 메뉴·이미지 애니메이션·상담 문구 복사
- `wrangler.jsonc` — Cloudflare Workers 자동 배포용 설정
- `.assetsignore` — 내부 배포 관련 파일이 공개 웹 자산으로 업로드되지 않도록 제외

## 운영 전 확인

- 이미지는 모두 **AI 연출 이미지**입니다. 이미지에 등장하는 시술 공간은 실제 뷰왁싱 매장 사진이 아닙니다.
- 주소, 영업시간, 실제 예약 URL은 아직 확인되지 않았습니다. 상담 버튼은 문의 문구 **복사**만 지원하며 실제로 예약을 접수하지 않습니다.
- GitHub 저장소를 Cloudflare에 처음 연결하고 권한을 승인하는 동작은 사용자 계정에서 직접 해야 합니다. ZIP만 GitHub에 업로드해도 Cloudflare 계정에 자동 연결되는 것은 아닙니다.

Cloudflare 공식 안내: https://developers.cloudflare.com/workers/ci-cd/builds/
