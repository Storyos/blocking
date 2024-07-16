import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container, TextWrapper } from "../styles";

export default function WalletLogin() {
  return (
    <>
      <Container>
        <TextWrapper>
          <div>부경 Portfoilo</div>
          <div>나만의 서류 지갑을 만들어 보세요.</div>
          <Link to={`/walletpwd`}>카카오톡으로 간편 로그인</Link>
        </TextWrapper>
      </Container>
    </>
  );
}
