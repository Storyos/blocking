import React, { useState } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronDown, VscChevronUp } from 'react-icons/vsc'; 
import MenubarLayout from './MenubarLayout';

// Notification 컴포넌트를 위한 메인 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  background-color: #f5f5f5;
  padding-left: 20px; 
  padding-right: 20px; 
`;

// 뒤로가기 버튼 아이콘 스타일
const BackIcon = styled(VscChevronLeft)`
  position: absolute;
  left: 25px; 
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

// 알림 섹션 제목 스타일
const Title = styled.h2`
  margin: 50px 0 40px; 
  font-size: 24px;
`;
const Time = styled.div`
  font-size: 15px;
  color: #808080;
  
`;
// 알림 목록 컨테이너 스타일
const NotificationList = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 개별 알림 항목 스타일
const NotificationItem = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  width: calc(100% - 40px); 
  overflow: hidden; 
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  justify-content: space-between;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
  border-radius: 10px; 
  cursor: pointer; 
`;

// 알림 텍스트 스타일
const NotificationText = styled.div`
  font-size: 16px;
  color: #333;
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 넘칠 경우 생략 부호 표시 */
  display: -webkit-box;
  -webkit-line-clamp: ${props => (props.expanded ? 'none' : 2)}; /* 기본적으로 두 줄만 표시, 확장 시 전체 표시 */
  -webkit-box-orient: vertical;
`;

// 아이콘 컨테이너 스타일
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

// 텍스트를 확장하는 화살표 아이콘 (아래 방향)
const DownArrowIcon = styled(VscChevronDown)`
  font-size: 30px;
  color: #50C2C9;
  margin-left: 10px; 
  cursor: pointer; 
  position: relative;
`;

// 텍스트를 축소하는 화살표 아이콘 (위 방향)
const UpArrowIcon = styled(VscChevronUp)`
  font-size: 30px;
  color: #50C2C9;
  margin-left: 10px; 
  cursor: pointer; 
  position: relative;
`;

// 읽음/안 읽음 상태를 표시하는 작은 점
const Dot = styled.div`
  width: 6px; 
  height: 6px; 
  border-radius: 50%; 
  position: absolute;
  top: 10px; 
  right: 10px; 
  background-color: ${props => (props.read ? '' : 'red')}; 
`;

const Notification = () => {
  // 알림 상태를 관리하는 state
  const [notifications, setNotifications] = useState([
    { text: "새로운 알림이 있습니다. 이 알림은 매우 긴 텍스트를 포함하고 있으며 전체 내용을 보려면 아래 화살표 아이콘을 클릭하세요.", read: false, expanded: false },
    { text: "계정 설정이 업데이트되었습니다. 계정 설정 업데이트 내용은 다음과 같습니다: 비밀번호 변경, 이메일 주소 업데이트, 전화번호 추가.", read: false, expanded: false },
    { text: "비밀번호가 성공적으로 변경되었습니다. 비밀번호 변경 내역은 보안 설정에서 확인할 수 있습니다.", read: false, expanded: false }
  ]);

  // 알림 항목을 확장/축소하고 읽음 상태로 변경하는 함수
  const toggleExpand = index => {
    setNotifications(prevState =>
      prevState.map((notification, i) => 
        i === index
          ? { ...notification, expanded: !notification.expanded, read: true }
          : notification
      )
    );
  };

  // 알림 항목을 클릭하여 확장/축소하고 읽음 상태로 변경하는 함수
  const handleNotificationClick = index => {
    setNotifications(prevState =>
      prevState.map((notification, i) => 
        i === index
          ? { ...notification, expanded: !notification.expanded, read: true }
          : notification
      )
    );
  };

  return (
    <Container>
      <BackIcon />
      <Title>Notification</Title>
      <Time>New</Time>
      <NotificationList>
      {/* 알림 배열을 순회하며 각 알림 항목을 렌더링 */}
      {notifications.map((notification, index) => (
        <NotificationItem
          key={index}
          onClick={() => handleNotificationClick(index)} // 알림 항목 클릭 시 핸들러 호출
        >
          <IconContainer>
            {/* 알림 텍스트 (확장 여부에 따라 다르게 표시) */}
            <NotificationText expanded={notification.expanded}>
              {notification.text}
            </NotificationText>
            
            {/* 알림이 확장된 상태에 따라 위 또는 아래 화살표 아이콘 표시 */}
            {notification.expanded ? (
              <UpArrowIcon onClick={() => toggleExpand(index)} /> // 축소 버튼 (위쪽 화살표)
            ) : (
              <DownArrowIcon onClick={() => toggleExpand(index)} /> // 확장 버튼 (아래쪽 화살표)
            )}
            
            {/* 읽음 상태를 나타내는 작은 점 (읽었는지 여부에 따라 색상 변경) */}
            <Dot read={notification.read} />
          </IconContainer>
        </NotificationItem>
      ))}
    </NotificationList>
    <Time>Recent</Time>
    <MenubarLayout />
    </Container>
  );
};

export default Notification;
