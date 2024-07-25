import React from 'react';
import styled from 'styled-components';
import { VscChevronLeft } from 'react-icons/vsc'; 
import { FaUserCog, FaLock, FaTrash } from 'react-icons/fa'; 
import { RiArrowRightSLine } from 'react-icons/ri'; 
import MenubarLayout from './MenubarLayout';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  background-color: #f5f5f5;
`;

const BackIcon = styled(VscChevronLeft)`
  position: absolute;
  left: 15px;
  top: 15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #50C2C9;
  font-size: 20px;
  cursor: pointer;
`;

const ProfilePicContainer = styled.div`
  margin-top: 60px; /* BackIcon과의 간격 */
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ProfilePic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.input`
  margin-top: 20px;
  padding: 8px;
  font-size: 18px;
  border: none; /* 테두리 제거 */
  border-bottom: 1px solid #ddd; /* 밑줄 추가 */
  text-align: center;
  background-color: transparent; /* 배경색 투명으로 설정 */
  outline: none; /* 포커스 시 외곽선 제거 */
`;

const LinkedAccountContainer = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* 항목 사이 간격 */
`;

const Icon = styled.div`
  font-size: 22px;
  color: #50C2C9;
  margin-right: 20px;
  margin-left: 20px;
`;

const Text = styled.div`
  font-size: 16px;
`;

const Email = styled.div`
  font-size: 14px;
  color: #a0a0a0; /* 연한 회색 */
  margin-left: 50px; /* 아이콘과 텍스트 사이 간격 조정 */
  margin-top: 5px; /* 상단 간격 조정 */
`;

const RightArrowIcon = styled(RiArrowRightSLine)`
  font-size: 20px;
  margin-left: auto; /* 오른쪽 끝으로 이동 */
`;

const DeleteContainer = styled.div`
  margin-top: 220px; 
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DeleteIcon = styled(FaTrash)`
  font-size: 25px;
  color: #50C2C9;
  margin-bottom: 15px;
`;

const DeleteText = styled.div`
  font-size: 16px;
  color: #50C2C9;
`;

const Profile = () => {
  return (
    <Container>
      <BackIcon />
      <ProfilePicContainer>
        <ProfilePic src="https://via.placeholder.com/120" alt="Profile" />
      </ProfilePicContainer>
      <Name type="text" placeholder="Your Name" />
      <LinkedAccountContainer>
        <ItemContainer>
          <Icon><FaUserCog /></Icon>
          <Text>계정 관리</Text>
          <Email>dsdf06@naver.com</Email> 
          <RightArrowIcon />
        </ItemContainer>
        <ItemContainer>
          <Icon><FaLock /></Icon>
          <Text>비밀번호 관리</Text>
          <RightArrowIcon />
        </ItemContainer>
      </LinkedAccountContainer>
      <DeleteContainer>
        <DeleteIcon />
        <DeleteText>Delete Account</DeleteText>
      </DeleteContainer>
      <MenubarLayout/>
    </Container>
  );
};

export default Profile;
