import styled from "styled-components";
import MenubarLayout from "../components/MenubarLayout";
import { FaQrcode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  background-color: #f5f5f5;
`;

const ShareIcon = styled.div`
  margin-top: 400px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #50c2c9;
  background-color: #ffffff;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 25px;
  margin-top: 14px;
`;

const IconText = styled.div`
  margin-top: 5px;
  font-size: 13px;
  color: #4a4a4a;
  text-align: center;
`;

export default function Share() {
  const navigate = useNavigate();
  const goToShare = () => {
    navigate(`/ShareConfirm`);
  };
  return (
    <Container>
      <ShareIcon>
        공유하기
        <IconWrapper onClick={goToShare}>
          <Icon>
            <FaQrcode />
          </Icon>
          <IconText>QR코드</IconText>
        </IconWrapper>
      </ShareIcon>
      <MenubarLayout />
    </Container>
  );
}
