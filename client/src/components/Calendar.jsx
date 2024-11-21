import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

// 스타일링
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
    @media (min-width: 600px) {
      width: 70%;
    }
  }

  .react-calendar__tile {
    border: none; /* 타일의 테두리 제거 */
    font-size: 12px; /* 날짜 글자 크기 */
    border-radius: 10px;
    width: 50px;
    height: 45px;
    @media (min-width: 600px) {
      height: 50px;
      font-size: 14px;
    }
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
    font-size: 16px; /* 제목 글자 크기 */
    font-family: "Noto Sans KR";
  }

  .react-calendar__navigation__arrow {
    color: #50c2c9;
    font-size: 16px;
    font-weight: bold;
  }

  .react-calendar__month-view__weekdays {
    font-family: "Noto Sans KR";
    color: #4d4d4d; /* 요일 색상 */
    font-size: 13px; /* 요일 글자 크기 */
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }
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

const CalendarComponent = ({ selectedDate, handleDateChange }) => {
  const tileContent = ({ date, view }) => {
    // view가 month인 경우에만 점 표시, 6일에만 점 추가
    if (view === "month" && date.getDate() === 6) {
      return <RedDot />;
    }
  };

  return (
    <CalendarContainer>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        formatDay={(locale, date) => date.getDate().toString()} // '일' 제거
        tileContent={tileContent} // 특정 날짜에 빨간 점 추가
      />
    </CalendarContainer>
  );
};

export default CalendarComponent;
