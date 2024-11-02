import styled from "styled-components";

export const Loader = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #50c2c9;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
