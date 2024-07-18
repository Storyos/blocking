# blocking


### 07-18 진행상황 및 문제
1. Klip에서 App2App을 기반 서비스를 중점으로 제공 --> Web2App이 불가능 한 것은 아니나, 자료 및 제공 서비스 빈약
2. Klip Login API이 SSR 환경 지원 X ( SSR: Server Side Rendering ) --> React 페이지에서 QRCode 생성이 힘듬
   2-1.) 대안으로 현재는 React 페이지에서 요청시 Express의 정적페이지로 링크해서 express.js에서 QRCode 생성 및 로그인 결과 반환중
   ※ 현재 React는 localhost:3000 , Express는 localhost:3001 포트에서 실행
