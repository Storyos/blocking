import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FaWallet, FaUser, FaUserPlus } from "react-icons/fa";
import { useState } from "react";

// Container for the main layout
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f2fbfb, #d5f0f2);
  overflow: hidden;
  padding: 20px;
  position: relative;
`;

// Animation for the floating SBT bubbles
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

// SBT bubbles with slow movement and opacity effects
const SBTBubble = styled.div`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: rgba(80, 194, 201, 0.3);
  border-radius: 50%;
  animation: ${floatAnimation} ${({ duration }) => duration}s ease-in-out infinite;
  opacity: ${({ opacity }) => opacity};

  /* Randomize position for a natural look */
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
`;

// Wrapper for login and sign up buttons
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 50px;
`;

// Individual button styles
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

// Main wallet icon styling
const IconWrapper = styled.div`
  font-size: 50px;
  color: #50c2c9;
  margin-bottom: 240px;
  animation: bounce 2.5s infinite;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

// Text bubble animation for welcoming text
const bubbleAnimation = keyframes`
  0% { transform: translateY(100px); opacity: 0; }
  30% { transform: translateY(-10px); opacity: 1; }
  50% { transform: translateY(0); }
  70% { transform: translateX(-5px); }
  100% { transform: translateX(5px); }
`;

// Text bubbles for promotional phrases
const TextBubble = styled.div`
  font-size: 20px;
  color: #004d4d;
  position: absolute;
  animation: ${bubbleAnimation} 4s forwards ease-in-out;
  left: ${({ left }) => left};
  top: ${({ top }) => top};
  animation-delay: ${({ index }) => index * 0.5}s;

  ${({ index }) => {
    switch (index) {
      case 0:
        return `font-weight: bold;`;
      case 1:
        return `font-size: 15px;`;
      case 2:
        return `font-size: 18px;`;
      case 3:
        return `font-weight: bold; font-size: 19px;`;
      default:
        return "";
    }
  }}
`;

// Main component
export default function WalletLogin() {
  const [scatter] = useState(true);

  // Define positions and animations for each floating SBT bubble
  const sbtBubbles = Array.from({ length: 8 }).map((_, index) => ({
    size: Math.random() * 40 + 30, // Random size for each bubble
    top: Math.random() * 80,       // Random position
    left: Math.random() * 80,
    duration: Math.random() * 5 + 5,  // Random animation duration
    opacity: Math.random() * 0.3 + 0.3, // Random opacity for softness
  }));

  const bubblePositions = [
    { left: "12%", top: "28%" },
    { left: "55%", top: "38%" },
    { left: "25%", top: "48%" },
    { left: "48%", top: "60%" },
  ];

  return (
    <Container>
      {/* Floating SBT bubbles */}
      {sbtBubbles.map((bubble, index) => (
        <SBTBubble
          key={index}
          size={bubble.size}
          top={bubble.top}
          left={bubble.left}
          duration={bubble.duration}
          opacity={bubble.opacity}
        />
      ))}

      {/* Wallet icon */}
      <IconWrapper>
        <FaWallet />
      </IconWrapper>

      {/* Text bubbles */}
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

      {/* Buttons */}
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
