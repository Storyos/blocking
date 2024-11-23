import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

// 스타일링
const CalendarContainer = styled.div`
  width: 100%;
  background-color: white;

  border-radius: 16px;
  margin: 20px 0;
  display: flex;
  justify-content: center;

  /* react-calendar 스타일 조정 */
  .react-calendar {
    @media (min-width: 600px) {
      width: 70%;
    }
    font-size: 18px; /* 글자 크기 증가 */
    line-height: 1.6; /* 글자 간격 조정 */
    border-radius: 16px; /* 둥근 모서리 추가 */
    border: 2px solid #50c2c9; /* 테두리 색상 추가 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
    background: linear-gradient(145deg, #e0f7fa, #ffffff); /* 그라데이션 배경 */
  }

  .react-calendar__tile {
    border: none; /* 타일의 테두리 제거 */
    font-size: 12px; /* 날짜 글자 크기 */
    border-radius: 10px;
    width: 45px;
    height: 40px;
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

  .react-calendar__tile--now {
    background-color: transparent;
    color: black;
    font-weight: bold;
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

const NotificationContainer = styled.div`
  background-color: #e3f2fd; /* 부드러운 파란색 배경 */
  border-left: 5px solid #50c2c9; /* 강조 색상 */
  padding: 12px 20px;
  border-radius: 12px;
  width: 85%;
  margin-top: 0px; /* 약간의 여백 추가 */
  font-size: 14px;
  color: #0d47a1; /* 깊은 파란색 텍스트 */
  text-align: left;
  font-family: "Noto Sans KR";
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */

  strong {
    color: #1a73e8; /* 강조 텍스트에 약간 밝은 파란색 */
  }

  &::before {
    margin-right: 8px;
    font-size: 18px; /* 아이콘 크기 조정 */
  }

  @media (min-width: 600px) {
    width: 65%;
    font-size: 16px;
    padding: 15px 20px;
  }
`;

const CalendarComponent = ({ selectedDate, handleDateChange }) => {
  const formatDateToLocalString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [notes] = useState({
    "2024-11-01": "제2학기 대학원 학위 청구 논문 발표",
    "2024-11-06": "오늘 수영 제부대회날입니다.",
    "2024-11-13": "[대학] 동계 계절수업 수강신청",
    "2024-11-28": "캡스톤디자인 경진대회",
  });

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = formatDateToLocalString(date); // 로컬 타임존 기준으로 포맷
      if (Object.keys(notes).includes(dateString)) {
        return <RedDot />;
      }
    }
  };

  return (
    <>
      <CalendarContainer>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          formatDay={(locale, date) => date.getDate().toString()} // '일' 제거
          tileContent={tileContent} // 특정 날짜에 빨간 점 추가
        />
      </CalendarContainer>
      {notes[formatDateToLocalString(selectedDate)] && (
        <NotificationContainer>
          📢 <strong>공지:</strong> {notes[formatDateToLocalString(selectedDate)]}
        </NotificationContainer>
      )}
    </>
  );
};

export default CalendarComponent;
