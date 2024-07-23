import React from 'react';
import styled from 'styled-components';
import { FaBell } from 'react-icons/fa'; 
import MenubarLayout from './MenubarLayout';
// 스타일링
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const NotificationIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 0px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #50C2C9;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const CardBox = styled.div`
  width: 150px;
  height: 200px;
  padding: 30px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  margin: 20px;
  text-align: center;
`;
const Recent = styled.div`
  font-size: 12px;
  color: #808080;
`;

const GridContainer = styled.div`
  display: grid;
  gap: 10px; /* 항목 사이의 간격 */
  width: 100%;
  padding: 20px;
`;

const Notification = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  padding: 18px;
  border-radius: 8px;
  text-align: center;
  margin: 0 40px; /* 좌우 간격 추가 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;


// Main 컴포넌트
const Main = () => {
  return (
    <Container>
      <Header>
        <NotificationIcon><FaBell /></NotificationIcon>
      </Header>
      <CardBox>
        카드박스
      </CardBox>
      <Recent>Recent</Recent>
      <GridContainer>
        <Notification>Notification 1</Notification>
        <Notification>Notification 2</Notification>
        <Notification>Notification 3</Notification>
      </GridContainer>
      <MenubarLayout/>
    </Container>
  );
};

export default Main;
