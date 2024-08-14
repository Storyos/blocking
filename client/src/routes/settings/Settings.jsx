import styled from "styled-components";
import MenubarLayout from "../../components/MenubarLayout";
import { Link } from "react-router-dom";
import BackIcon from "../../components/BackIcon";
import { FaUser, FaBell, FaLock, FaChevronRight, FaSignOutAlt } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  background-color: #f5f5f5;
`;

const Title = styled.h2`
  margin: 50px 0 40px;
  font-size: 24px;
  font-weight: bold;
`;

const LinkWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SettingsLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 10px 15px;

  & > .chevron {
    color: #a2a2a2;
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #50c2c9;
  background-color: #ffffff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const LinkText = styled.span`
  flex-grow: 1;
`;

const LogOutContainer = styled.div`
  margin-top: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogOutIcon = styled(FaSignOutAlt)`
  font-size: 25px;
  color: #50c2c9;
  margin-bottom: 15px;
`;

const LogOutText = styled.div`
  font-size: 16px;
  color: #50c2c9;
  font-weight: bold;
`;

export default function Settings() {
  return (
    <Container>
      <Link to={`/Main`}>
        <BackIcon />
      </Link>
      <Title>설정</Title>
      <LinkWrapper>
        <SettingsLink to={`/Profile`}>
          <Icon>
            <FaUser />
          </Icon>
          <LinkText>Profile</LinkText>
          <FaChevronRight className="chevron" />
        </SettingsLink>
        <SettingsLink to={`/Noti`}>
          <Icon>
            <FaBell />
          </Icon>
          <LinkText>알림</LinkText>
          <FaChevronRight className="chevron" />
        </SettingsLink>
        <SettingsLink>
          <Icon>
            <FaLock />
          </Icon>
          <LinkText>사용 정지</LinkText>
          <FaChevronRight className="chevron" />
        </SettingsLink>
      </LinkWrapper>
      <LogOutContainer>
        <LogOutIcon />
        <LogOutText>로그아웃</LogOutText>
      </LogOutContainer>
      <MenubarLayout />
    </Container>
  );
}
