import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FaWallet, FaUser, FaUserPlus } from "react-icons/fa";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f2fbfb, #d5f0f2);
  overflow: hidden;
  padding: 20px;
  position: relative; /* Added for positioning the text bubbles */
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 50px;
`;

const Btn = styled.button`
  width: 200px;
  height: 45px;
  border: none;
  border-radius: 15px;
  background-color: #50c2c9;
  color: white;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #3ba9b1;
    transform: translateY(-3px) scale(1.0); /* Scale effect on hover */
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

const IconWrapper = styled.div`
  font-size: 50px;
  color: #50c2c9;
  margin-bottom: 240px;
  animation: bounce 2.5s infinite;

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const bubbleAnimation = keyframes`
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  30% {
    transform: translateY(-10px); /* Move up slightly */
    opacity: 1;
  }
  50% {
    transform: translateY(0);
  }
  70% {
    transform: translateX(-5px); /* Slight left movement */
  }
  100% {
    transform: translateX(5px); /* Slight right movement */
  }
`;

const continuousMovement = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const TextBubble = styled.div`
  font-size: 20px;
  color: #004d4d;
  position: absolute;
  animation: ${bubbleAnimation} 4s forwards, ${continuousMovement} 4s infinite; /* Continuous movement */
  opacity: 1; /* Keep the opacity at 1 to ensure visibility */

  /* Randomize the position for each text bubble */
  left: ${({ left }) => left};
  top: ${({ top }) => top};

  /* Different font styles for each bubble */
  ${({ index }) => {
    switch (index) {
      case 0:
        return `font-family: 'Arial', sans-serif; font-weight: bold;`;
      case 1:
        return `font-family: 'Courier New', monospace; font-size: 15px;`;
      case 2:
        return `font-family: 'Georgia', serif; font-size: 18px;`;
      case 3:
        return `font-family: 'Verdana', sans-serif; font-weight: bold; font-size: 19px;`;
      default:
        return '';
    }
  }}

  /* Staggering animation delay for each bubble */
  animation-delay: ${({ index }) => index * 0.5}s; /* 0.5s delay for each subsequent bubble */
`;

export default function WalletLogin() {
  const [scatter] = useState(true); // Start with scatter as true

  const bubblePositions = [
    { left: "12%", top: "28%" },  // 1st bubble
    { left: "55%", top: "38%" },  // 2nd bubble
    { left: "25%", top: "48%" },  // 3rd bubble (편리하고 안전한)
    { left: "48%", top: "60%" },  // 4th bubble
  ];

  return (
    <Container>
      <IconWrapper>
        <FaWallet />
      </IconWrapper>

      {/* Conditional rendering for text bubbles */}
      {scatter && (
        <>
          {bubblePositions.map((position, index) => (
            <TextBubble key={index} left={position.left} top={position.top} index={index}>
              {index === 0 && "부경 Portfolio 를"}
              {index === 1 && "쉽게 만드는"}
              {index === 2 && "편리하고 안전한"}
              {index === 3 && "나만의 서류 지갑"}
            </TextBubble>
          ))}
        </>
      )}

      <ButtonWrapper>
        <Btn>
          <Link to="/login">
            <FaUser /> 로그인
          </Link>
        </Btn>
        <Btn>
          <Link to="/signupagree">
            <FaUserPlus /> 회원가입
          </Link>
        </Btn>
      </ButtonWrapper>
    </Container>
  );
}
