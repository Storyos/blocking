import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import BackIcon from "../../components/BackIcon";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
`;

const Title = styled.h2`
  margin: 50px 0 40px;
  font-size: 24px;
  font-weight: bold;
`;

const OptionWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const OptionText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const ToggleButton = styled.button`
  width: 40px;
  height: 20px;
  border-radius: 15px;
  border: none;
  background-color: ${(props) => (props.isOn ? "#50c2c9" : "#a2a2a2")};
  cursor: pointer;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 14px;
    height: 15px;
    border-radius: 50%;
    background-color: #ffffff;
    top: 50%;
    left: ${(props) => (props.isOn ? "calc(100% - 20px)" : "5px")};
    transform: translateY(-50%);
    transition: all 0.3s ease;
  }
`;

export default function NotificationSettings() {
  const [isNotificationOn, setIsNotificationOn] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isVibrationOn, setIsVibrationOn] = useState(true);

  const toggleNotification = () => {
    setIsNotificationOn((prev) => !prev);
  };

  const toggleSound = () => {
    setIsSoundOn((prev) => !prev);
  };

  const toggleVibration = () => {
    setIsVibrationOn((prev) => !prev);
  };

  return (
    <Container>
      <BackIcon />
      <Title>알림 설정</Title>
      <OptionWrapper>
        <Option>
          <OptionText>알림 받기</OptionText>
          <ToggleButton
            isOn={isNotificationOn}
            onClick={toggleNotification}
          />
        </Option>
        <Option>
          <OptionText>소리</OptionText>
          <ToggleButton
            isOn={isSoundOn}
            onClick={toggleSound}
          />
        </Option>
        <Option>
          <OptionText>진동</OptionText>
          <ToggleButton
            isOn={isVibrationOn}
            onClick={toggleVibration}
          />
        </Option>
      </OptionWrapper>
    </Container>
  );
}
