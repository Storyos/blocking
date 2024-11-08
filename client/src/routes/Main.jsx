import React, { useState } from "react";
import styled from "styled-components";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NotifyIcon from "../components/NotifyIcon";

// 스타일링
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 20px;
  font-family: "Montserrat", sans-serif; // 글꼴 설정
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const IconButton = styled.div`
  cursor: pointer;
  color: #50c2c9; /* 연한 파란색 */
  font-size: 28px; /* 아이콘 크기 조정 */
  margin-right: 20px;
  transition: color 0.3s;

  &:hover {
    color: #00796b; /* Hover 시 색상 변화 */
  }
`;

const CalendarContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 16px;
  margin: 20px 0;
  display: flex;
  justify-content: center;

  /* react-calendar 스타일 조정 */
  .react-calendar {
    border: none; /* 달력 테두리 제거 */
  }

  .react-calendar__tile {
    border: none; /* 타일의 테두리 제거 */
    font-size: 12px; /* 날짜 글자 크기 */
  }

  .react-calendar__tile--active {
    background-color: #50c2c9; /* 선택된 날짜 스타일 */
    color: white; /* 글자색 변경 */
  }

  .react-calendar__tile:hover {
    background-color: #e0f7fa; /* Hover 시 색상 변화 */
    color: #00796b; /* Hover 시 글자색 변화 */
  }

  .react-calendar__navigation__label {
    color: #50c2c9; /* 제목 색상 변경 */
    font-size: 15px; /* 제목 글자 크기 */
    font-weight: normal;
  }

  .react-calendar__month-view__weekdays {
    font-weight: normal;
    color: #888; /* 요일 색상 */
    font-size: 13px; /* 요일 글자 크기 */
  }
`;

const NotificationContainer = styled.div`
  background-color: #ffeb3b;
  padding: 15px;
  border-radius: 8px;
  width: 90%;
  margin-top: 20px;
  font-size: 16px; /* 공지 글자 크기 */
  color: #333;
  text-align: left;
  font-family: "Montserrat", sans-serif; // 글꼴 추가
`;

const RedDot = styled.span`
  display: block;
  width: 5px;
  height: 5px;
  background-color: red;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 2px;
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

  const tileContent = ({ date, view }) => {
    // view가 month인 경우에만 점 표시, 6일에만 점 추가
    if (view === "month" && date.getDate() === 6) {
      return <RedDot />;
    }
  };

  return (
    <Container>
      <Header>
        <NotifyIcon />
      </Header>

      <CalendarContainer>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          formatDay={(locale, date) => date.getDate().toString()} // '일' 제거
          tileContent={tileContent} // 특정 날짜에 빨간 점 추가
        />
      </CalendarContainer>

      {selectedDate.getDate() === 6 && (
        <NotificationContainer>
          📢 <strong>공지:</strong> {notes["6"]}
        </NotificationContainer>
      )}
    </Container>
  );
};

export default Main;
