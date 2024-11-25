import styled from "styled-components";

export const Loader = styled.div`
  width: 40px; /* 크기를 좀 더 크게 */
  height: 40px;
  border-top: 4px solid #6fa3ef; /* 상단에 파스텔 블루 */
  border-right: 4px solid #50c2c9; /* 우측에 민트 그린 */
  border-bottom: 4px solid #f0a3c1; /* 아래쪽에 핑크 */
  border-left: 4px solid skyblue; /* 왼쪽에 skyblue */
  border-radius: 50%; /* 원형 */
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1.5s cubic-bezier(0.25, 0.8, 0.25, 1) infinite; /* 부드러운 회전 애니메이션 */

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
