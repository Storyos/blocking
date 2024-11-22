import React, { useState } from "react";
import styled from "styled-components";
import { FaCertificate, FaLock, FaLockOpen } from "react-icons/fa"; // 아이콘 불러오기
import NotifyIcon from "../components/NotifyIcon";

// 스타일링
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  @media (min-width: 600px) {
    padding-left: 60px;
    padding-right: 60px;
  }
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-left: 0; /* 왼쪽에 붙이기 */
  text-align: left;
  padding: 10px;
  width: 100%;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개의 박스 */
  gap: 20px;
  width: 100%;
  padding: 0 20px;
`;

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 20px;
  box-shadow: 1px 1px rgba(86, 204, 212, 0.5);
  padding: 18px;
  text-align: center;
  font-size: 11px;
  color: #333;

  h3 {
    margin: 8px 0 5px; /* h3 요소의 마진을 조정 */
    font-size: 14px; /* h3의 폰트 크기 조정 */
  }

  p {
    margin: 0; /* p 요소의 기본 마진을 제거 */
    font-size: 11px; /* p의 폰트 크기 조정 */
  }
`;

const SbtContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

const LockIcon = styled.div`
  margin-left: 5px;
  cursor: pointer;
  color: #50c2c9;
`;

const Portfolio = () => {
  const [lockState, setLockState] = useState([true, true, true, true, true, true]);

  const toggleLock = (index) => {
    const newLockState = [...lockState];
    newLockState[index] = !newLockState[index];
    setLockState(newLockState);
  };

  return (
    <Container>
      <Header>
        <Title>자격증</Title>
        <NotifyIcon />
      </Header>
      <GridContainer>
        {[...Array(6)].map((_, index) => (
          <div key={index}>
            <Card>
              <FaCertificate />
              <h3>자격증 {index + 1}</h3>
              <p>자격증 설명</p>
            </Card>
            <SbtContainer>
              Toeic
              <LockIcon onClick={() => toggleLock(index)}>{lockState[index] ? <FaLock /> : <FaLockOpen />}</LockIcon>
            </SbtContainer>
          </div>
        ))}
      </GridContainer>
    </Container>
  );
};

export default Portfolio;
