import AppRouter from "./AppRouter";
import styled, { createGlobalStyle } from "styled-components";

function App() {
  const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap');
  // style 초기화
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
	
body {
	/* 화면을 중앙에 배치하기 위한 스타일 */
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: white;

	// 폰트설정
	font-family: "Noto Sans KR", sans-serif;
	font-optical-sizing: auto;
	font-weight: 400;
  	font-style: normal;
}
.container {
	/* 박스의 너비와 높이 설정 */
	width: 360px; /* 수정된 너비 */
	height: 100vh;
	background-color: #f5f5f5; /* 박스 배경 색상 */
}
 `;
  return (
    <>
      <GlobalStyle />
      <div className="container">
        <AppRouter />
      </div>
    </>
  );
}

export default App;
