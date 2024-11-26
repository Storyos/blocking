import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { FaUser } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { RiApps2AddLine } from "react-icons/ri";
import { TbShieldShare } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CalendarComponent from "../components/Calendar";
import NotifyIcon from "../components/NotifyIcon";
import { auth } from "../firebase";
import { FaRegSmileBeam, FaCertificate, FaBookReader, FaUsers } from "react-icons/fa"; // 아이콘 추가

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
    font-size: 16px;
    margin-top: 4px;
  }
  display: flex;
  justify-content: left;
  align-items: center;
  font-weight: bold;
  gap: 10px;
`;

const ProfilePicContainer = styled.div`
  width: 30px;
  height: 30px;
  @media (min-width: 600px) {
    width: 40px;
    height: 40px;
  }
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0px 2px 4px #50c2c9;  /* Adding shadow */
`;

const TitleText = styled.div`
  width: 90%;
  @media (min-width: 600px) {
    width: 70%;
    font-size: 16px;
  }
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
`;

const ServiceLinkContainer = styled.div`
  z-index: 10;
  width: 100%;
  background-color: #80d0d3;
  border-radius: 30px;
  box-shadow: 0px -1px 5px #80d0d3;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0px;
  justify-items: center;
  padding: 20px 10px;

  @media (min-width: 600px) {
    width: 80%;
    padding: 15px 0px;
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
  gap: 15px;
  font-size: 13px;

  @media (min-width: 600px) {
    font-size: 15px;
  }

  &:hover {
    font-weight: thin;
    color: grey; /* 텍스트 호버 색상 */
  }
`;

const ServiceIcon = styled.div`
  width: 55px; /* Reduced size */
  height: 55px; /* Reduced size */
  @media (min-width: 600px) {
    width: 60px; /* Reduced size */
    height: 60px; /* Reduced size */

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
    transform: scale(1.1); /* 확대 효과 */
  }

  svg {
    font-size: 30px; /* Reduced icon size */
    @media (max-width: 600px) {
      font-size: 22px; /* Reduced icon size */
    }
  }
`;

const PopupMenu = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 10px ;
  display: flex;
  flex-direction: column;
  gap: 0px;
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
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 5px;
  border: none;
  background-color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  & > svg {
    margin-right: 10px;
    font-size: 20px;
    color: #50c2c9;
  }
`;

const Main = () => {
  useEffect(() => {
    setUserName(auth.currentUser.displayName);
  }, []);

  const [userName, setUserName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSBTClick = () => {
    setIsPopupOpen(true); // Popup open when "SBT 발행" is clicked
  };

  const handleMenuSelect = (menu) => {
    setIsPopupOpen(false); // Close the popup after selection
    navigate(`/mintsbt?menu=${encodeURIComponent(menu)}`); // Navigate to the selected menu page
  };

  return (
    <Container>
      <Header>
        <NotifyIcon />
      </Header>

      <UserContent>
        <ProfilePicContainer>
          <FaUser size={17} color="#50c2c9" />
        </ProfilePicContainer>
        {userName}님, 안녕하세요.
      </UserContent>
      <CalendarComponent selectedDate={selectedDate} handleDateChange={handleDateChange} />
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
          <ServiceLink to="#" onClick={handleSBTClick}>
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
              <MenuButton onClick={() => handleMenuSelect("동아리")}><FaRegSmileBeam />동아리</MenuButton>
              <MenuButton onClick={() => handleMenuSelect("증명서")}><FaCertificate />증명서</MenuButton>
              <MenuButton onClick={() => handleMenuSelect("비교과 프로그램")}><FaBookReader />비교과 프로그램</MenuButton>
              <MenuButton onClick={() => handleMenuSelect("학생회")}><FaUsers />학생회</MenuButton>
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
