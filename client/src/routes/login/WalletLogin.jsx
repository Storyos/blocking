import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FaUser, FaUserPlus, FaCertificate } from "react-icons/fa";

// Container for the main layout with gradient background
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  overflow: hidden;
  position: relative;
  background:#50c2c2;
`;
 
// CurvedLine with movement animation
const CurvedLine = styled.div`
  position: absolute;
  width: 200%;
  height: 400px;
  top: 30%;
  left: -50%;
  background: transparent;
  border-radius: 50%;
  border: 2px solid #a0f0f5;
  transform: rotate(-50deg)
`;

// SBT Badge appearance animation
const sbtAnimation = keyframes`
  0% { transform: scale(0.5) rotate(0deg); opacity: 0; }
  50% { transform: scale(1.05) rotate(15deg); opacity: 0.8; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
`;

// SBT Badge Component
const SBTBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 20px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  animation: ${sbtAnimation} 1s ease forwards;
  z-index: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 10px;
`;

// Button component
const Btn = styled(Link)`
  width: 200px;
  height: 45px;
  border: none;
  border-radius: 15px;
  background-color: #effbfb;
  font-size: 15px;
  font-weight: 500;
  color: #50c2c9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #3ba9b1;
    transform: translateY(-3px);
  }
  a {
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  svg {
    margin-right: 8px;
    font-size: 20px;
  }
`;

// Main Title styling
const Title = styled.h1`
  font-size: 24px;
  color: #004d4d;
  margin: 10px 0;
`;

// Subtitle styling
const Subtitle = styled.p`
  font-size: 14px;
  color: #004d4d;
  margin-bottom: 20px;
`;

// Main component
export default function WalletLogin() {
  return (
    <Container>

      {/* Curved background line */}
      <CurvedLine />

      {/* SBT Badge */}
      <SBTBadge>
        <FaCertificate size={50} color="#50c2c9" />
      </SBTBadge>

      {/* Title and Subtitle */}
      <Title>나만의 SBT 지갑</Title>
      <Subtitle>신뢰할 수 있는 디지털 증명서를 발급받아보세요</Subtitle>

      {/* Buttons */}
      <ButtonWrapper>
        <Btn to="/login">
          <FaUser /> 로그인
        </Btn>
        <Btn to="/signupagree">
          <FaUserPlus /> 회원가입
        </Btn>
      </ButtonWrapper>
    </Container>
  );
}
