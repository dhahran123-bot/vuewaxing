# GeneratePress + GenerateBlocks 이전
1. 스테이징 페이지에서 전체 너비, 사이드바 없음, 기본 페이지 제목 숨김을 설정한다.
2. header/main/footer를 테마 출력과 중복하지 않도록 선택한다. 이 디자인의 헤더를 사용할 경우 해당 페이지의 테마 헤더는 비활성화한다.
3. main의 각 section을 GenerateBlocks Container로 옮긴다. 클래스·id·data 속성은 유지한다. 탭·갤러리·상담 영역은 Custom HTML 블록으로 유지하면 이벤트 연결을 보존할 수 있다.
4. assets의 이미지를 미디어 라이브러리에 업로드하고 src를 반환된 URL로 바꾼다. 현재 파일은 연출 이미지이므로 실제 사진 확보 시 alt와 고지 문구도 함께 갱신한다.
5. child theme에 CSS/JS를 두고 wp_enqueue_style / wp_enqueue_script로 해당 페이지에서만 로딩한다. config.js → main.js 순서, footer 또는 defer 로딩을 유지한다. script 태그를 본문 편집기가 제거하지 않도록 JS는 enqueue한다.
6. CSS의 전역 body, header, button, :root 선택자는 이전 전 페이지 래퍼 .vue-site로 범위를 제한한다. WP 관리자 바가 있으면 sticky top을 보정한다. 기본 테마 버튼·타이포 스타일과의 우선순위를 확인한다.
7. main.js의 전역 document 조회는 하나의 .vue-site root 기준으로 좁히고 위젯을 일부 제외하면 해당 초기화에 null 가드를 추가한다. 같은 id를 두 번 렌더링하지 않는다.
8. 캐시/최적화 플러그인이 스크립트 순서를 바꾸지 않도록 설정하고 메뉴, 선택, 복사, 갤러리를 다시 검증한다.
새 WordPress 플러그인은 필요하지 않다. 이 패키지는 WordPress에서 실제 실행 검증하지 않았다.
