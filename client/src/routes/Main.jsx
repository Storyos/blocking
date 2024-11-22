import React, { useState } from "react";
import styled from "styled-components";
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
  font-family: "Montserrat", sans-serif;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const CalendarContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 16px;
  margin: 20px 0;
  display: flex;
  justify-content: center;

  .react-calendar {
    width: 70%;
    font-size: 18px; /* 글자 크기 증가 */
    line-height: 1.6; /* 글자 간격 조정 */
    border-radius: 16px; /* 둥근 모서리 추가 */
    border: 2px solid #50c2c9; /* 테두리 색상 추가 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
    background: linear-gradient(145deg, #e0f7fa, #ffffff); /* 그라데이션 배경 */
  }

  .react-calendar__tile {
    border: none;
    font-size: 12px;
    background-color: transparent; /* 모든 타일 기본 배경색 투명 */
  }

  .react-calendar__tile--active {
    background-color: #50c2c9; /* 선택된 날짜 색상 */
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .react-calendar__tile--active:focus {
    outline: none; /* 포커스시 테두리 제거 */
  }

  .react-calendar__tile:hover {
    background-color: #e0f7fa;
    color: #00796b;
    border-radius: 8px;
  }

  .react-calendar__tile--now {
  }

  .react-calendar__navigation__label {
    color: #50c2c9;
    font-size: 15px;
    font-weight: normal;
  }

  .react-calendar__month-view__weekdays {
    font-weight: normal;
    color: #888;
    font-size: 13px;
  }
`;

const NotificationContainer = styled.div`
  background-color: #e3f2fd; /* 부드러운 파란색 배경 */
  border-left: 5px solid #50c2c9; /* 강조 색상 */
  padding: 15px 20px;
  border-radius: 12px;
  width: 65%; /* 더 균형 잡힌 너비 */
  margin-top: 0px; /* 약간의 여백 추가 */
  font-size: 16px;
  color: #0d47a1; /* 깊은 파란색 텍스트 */
  text-align: left;
  font-family: "Montserrat", sans-serif;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */

  strong {
    color: #1a73e8; /* 강조 텍스트에 약간 밝은 파란색 */
  }

  &::before {
    margin-right: 8px;
    font-size: 18px; /* 아이콘 크기 조정 */
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

const Main = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes] = useState({
    "2024-11-01": "제2학기 대학원 학위 청구 논문 발표",
    "2024-11-06": "오늘 수영 제부대회날입니다.",
    "2024-11-13": "[대학] 동계 계절수업 수강신청",
    "2024-11-28": "캡스톤디자인 경진대회",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDateToLocalString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = formatDateToLocalString(date); // 로컬 타임존 기준으로 포맷
      if (Object.keys(notes).includes(dateString)) {
        return <RedDot />;
      }
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
          formatDay={(locale, date) => date.getDate().toString()}
          tileContent={tileContent}
        />
      </CalendarContainer>

      {notes[formatDateToLocalString(selectedDate)] && (
        <NotificationContainer>
          📢 <strong>공지:</strong> {notes[formatDateToLocalString(selectedDate)]}
        </NotificationContainer>
      )}
    </Container>
  );
};

export default Main;
