import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 280px;
  overflow: hidden;
`;
const TextWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 310px;
  gap: 5px;
  padding-bottom: 80px;
`;
const ConfirmBtn = styled.div`
  width: 340px;
  height: 40px;
  border: 0px;
  border-radius: 10px;
  background-color: #50c2c9;
  color: white;
  font-size: 14px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MainLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default function WalletConfirm() {
  return (
    <>
      <Container>
        <TextWrapper>
          <div>회원이 되신 걸 환영합니다!</div>
          <div>지금 바로 서비스를 이용해 보세요.</div>
        </TextWrapper>
        <MainLink to={`/Main`}>
          {" "}
          <ConfirmBtn>확인</ConfirmBtn>
        </MainLink>
      </Container>
    </>
  );
}
