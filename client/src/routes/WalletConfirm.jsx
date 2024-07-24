import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 450px;
  font-size: 15px;
  overflow: hidden;
`;
const TextWrapper = styled.div`
  text-align: center;
`;
const ConfirmBtn = styled.div`
  width: 120px;
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
  margin-top: 30px;
`;
const MainLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default function WalletConfirm() {
  return (
    <>
      <Container>
        <TextWrapper>회원이 되신 걸 환영합니다!</TextWrapper>
        <ConfirmBtn>
          <MainLink to={`/Main`}>확인</MainLink>
        </ConfirmBtn>
      </Container>
    </>
  );
}
