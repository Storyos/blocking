import React, { useState } from "react";
import styled from "styled-components";
import NotifyIcon from "../components/NotifyIcon";
import CalendarComponent from "../components/Calendar";

// 스타일링
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 20px;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const NotificationContainer = styled.div`
  background-color: #ffeb3b;
  padding: 15px;
  border-radius: 8px;
  width: 90%;
  font-size: 16px; /* 공지 글자 크기 */
  color: #333;
  text-align: left;
  @media (min-width: 600px) {
    width: 70%;
    margin-top: 10px;
  }
`;

// Main 컴포넌트
const Main = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes] = useState({
    6: "오늘 수영 제부대회날입니다.",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Container>
      <Header>
        <NotifyIcon />
      </Header>

      <CalendarComponent
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />

      {selectedDate.getDate() === 6 && (
        <NotificationContainer>
          📢 <strong>공지:</strong> {notes["6"]}
        </NotificationContainer>
      )}
    </Container>
  );
};

export default Main;
