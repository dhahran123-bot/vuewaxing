# 뷰왁싱 — Cloudflare 배포 오류 수정본

이 패키지는 **외부 CSS·JS·이미지 경로가 전혀 없는 단일 HTML 홈페이지**입니다. CSS·JavaScript·WebP 이미지 3개·favicon이 파일 내부에 포함되어 있습니다. 별도 플러그인이나 빌드 툴이 필요 없습니다.

## 기존 GitHub → Cloudflare Workers 프로젝트 업데이트 (권장)

1. 이 ZIP의 압축을 풀고 GitHub 저장소 **최상위**에 `index.html`, `public/` 폴더, `wrangler.jsonc`를 올려 기존 파일을 교체합니다.
2. GitHub에서 `public/index.html`이 보이는지 확인합니다. Cloudflare Workers에는 `wrangler.jsonc`에 따라 `public/` 안의 파일이 업로드됩니다.
3. Cloudflare Workers & Pages에서 해당 프로젝트의 **Deployments/Builds**를 확인하고, 배포 명령이 `npx wrangler deploy`인지 확인합니다. GitHub 커밋 뒤 자동 배포가 성공해야 합니다. **Workers 프로젝트 이름이 `vue-waxing`이 아니라면 `wrangler.jsonc`의 `name`도 프로젝트 이름에 맞게 수정하세요.**
4. 이전 화면이 남아 있으면 브라우저 **Ctrl+Shift+R** 또는 시크릿 창에서 확인합니다.

## Cloudflare Pages Git 연동을 쓰는 경우

- Framework preset: **None**
- Build command: 비움 (환경상 필수인 경우 `exit 0`)
- Build output directory: **`public`**
- Root directory: 저장소 최상위 (기본 설정)
- GitHub 저장소에는 `public/index.html`이 있어야 합니다.

## 설정을 바꾸기 어렵다면

저장소 최상위에 있는 `index.html`도 **완전한 독립형 홈페이지**입니다. Pages의 Build output directory가 `.`(저장소 최상위)로 설정된 경우에도 표시할 수 있도록 동일 파일을 넣었습니다.

## 이번 오류의 원인 및 변경 사항

- 첨부된 이전 ZIP은 CSS와 이미지가 별도 파일에 있었으며, 라이브 스크린샷에서는 둘 다 적용되지 않았습니다.
- **ZIP 내부 경로 자체는 정상이므로** 실제 GitHub 저장소와 Cloudflare 프로젝트의 공개 디렉터리 또는 배포 파일 차이는 **라이브 URL·Network 기록 없이 단정할 수 없습니다.**
- 이번 버전은 외부 리소스 참조를 없앴습니다. 배포 과정에서 오직 index.html만 공개되어도 디자인과 이미지가 표시됩니다.
- 현재 이미지 3개는 AI 연출 시안이며 실제 매장 사진이 아닙니다. 예약 및 방문 정보는 아직 확인되지 않았습니다.

## 정상 표시 확인

GitHub의 `public/index.html` 파일이 배포되어 있다면 브라우저 개발자 도구 Network에서 `css/vue-waxing.css`나 `assets/skin-hero.webp` 요청이 **아예 발생하지 않아야** 합니다. 그렇지 않다면 이전 빌드가 배포된 것입니다.

## 워드프레스 최종 이전

이것은 GitHub/Cloudflare 정적 미리보기용입니다. WordPress + GenerateBlocks 이행 단계에서는 `style`, `script`, 각 이미지 데이터 URI를 별도 관리 자산으로 다시 분리하고 블록을 구성하는 방식이 유지보수에 더 적합합니다.
