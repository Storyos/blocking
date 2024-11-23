import React, { useState } from "react";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import NotifyIcon from "../components/NotifyIcon";
import CalendarComponent from "../components/Calendar";
import { auth } from "../firebase";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiApps2AddLine } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { TbShieldShare } from "react-icons/tb";

// 스타일링
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 20px;
  padding-bottom: 0px;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const UserContent = styled.div`
  width: 90%;
  @media (min-width: 600px) {
    width: 70%;
    font-size: 18px;
    margin-top: 10px;
  }
  display: flex;
  justify-content: left;
  align-items: center;
  font-weight: bold;
  gap: 13px;
`;

const ProfilePicContainer = styled.div`
  width: 40px;
  height: 40px;
  @media (min-width: 600px) {
    width: 50px;
    height: 50px;
  }
  border-radius: 50%;
  background-color: #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const TitleText = styled.div`
  width: 90%;
  @media (min-width: 600px) {
    width: 70%;
    font-size: 18px;
  }
  text-align: left;
  font-weight: bold;
  margin-top: 35px;
`;

const ServiceLinkContainer = styled.div`
  z-index: 10;
  margin-top: 20px;
  width: 100%;
  height: 25vh;
  bottom: 0;
  background-color: #ffffff;
  border-radius: 50px 50px 0px 0px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.15);

  display: flex;
  justify-content: center;
  gap: 20px;
  padding-top: 40px;
  @media (min-width: 600px) {
    width: 80%;
    padding-top: 70px;
    margin-top: 30px;
  }
`;

const ServiceIconWrapper = styled.div``;

const ServiceLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  @media (min-width: 600px) {
    font-size: 15px;
  }
`;

const ServiceIcon = styled.div`
  width: 65px;
  height: 65px;
  @media (min-width: 600px) {
    width: 90px;
    height: 90px;
  }
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  border: none;
  color: #858585;
  transition: 0.1s;
  &:hover {
    color: #50c2c9; /* 버튼 호버 색상 */
  }

  svg {
    font-size: 45px;

    @media (max-width: 600px) {
      font-size: 30px;
    }
  }
`;

const PopupMenu = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.238);
  z-index: 999;
`;

const MenuButton = styled.button`
  background-color: #79d1d6;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  font-family: "Noto Sans KR";

  &:hover {
    background-color: #3aa7af;
  }
`;

const Main = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSBTClick = () => {
    setIsPopupOpen(true);
  };

  const handleMenuSelect = (menu) => {
    setIsPopupOpen(false);
    navigate(`/mintsbt?menu=${encodeURIComponent(menu)}`);
  };

  return (
    <Container>
      <Header>
        <NotifyIcon />
      </Header>

      <UserContent>
        <ProfilePicContainer>
          <FaUser
            size={17}
            color="#50c2c9"
          />
        </ProfilePicContainer>
        {auth.currentUser.displayName}님, 안녕하세요.
      </UserContent>
      <CalendarComponent
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <TitleText>주요서비스 바로가기</TitleText>
      <ServiceLinkContainer>
        <ServiceIconWrapper>
          <ServiceLink to="portfolio">
            <ServiceIcon>
              <RiApps2AddLine />
            </ServiceIcon>
            포트폴리오
          </ServiceLink>
        </ServiceIconWrapper>

        <ServiceIconWrapper>
          <ServiceLink
            to="#"
            onClick={handleSBTClick}
          >
            <ServiceIcon>
              <IoIosAddCircle />
            </ServiceIcon>
            SBT 발행
          </ServiceLink>
        </ServiceIconWrapper>

        {isPopupOpen && (
          <>
            <Overlay onClick={() => setIsPopupOpen(false)} />
            <PopupMenu>
              <MenuButton onClick={() => handleMenuSelect("동아리")}>동아리</MenuButton>
              <MenuButton onClick={() => handleMenuSelect("증명서")}>증명서</MenuButton>
              <MenuButton onClick={() => handleMenuSelect("비교과 프로그램")}>비교과 프로그램</MenuButton>
              <MenuButton onClick={() => handleMenuSelect("학생회")}>학생회</MenuButton>
            </PopupMenu>
          </>
        )}

        <ServiceIconWrapper>
          <ServiceLink to="share">
            <ServiceIcon>
              <TbShieldShare />
            </ServiceIcon>
            QR코드 공유
          </ServiceLink>
        </ServiceIconWrapper>
      </ServiceLinkContainer>
    </Container>
  );
};

export default Main;
