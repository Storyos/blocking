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

export default function ShareConfirm() {
  return (
    <>
      <Container>
        <TextWrapper>
          <div>전송이 완료되었습니다!</div>
        </TextWrapper>
        <MainLink to={`/Main`}>
          {" "}
          <ConfirmBtn>확인</ConfirmBtn>
        </MainLink>
      </Container>
    </>
  );
}
