import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import BackIcon from "../../components/BackIcon";
import { FaUser, FaBell, FaLock, FaChevronRight, FaSignOutAlt } from "react-icons/fa";
import { auth } from "../../firebase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  position: relative;
`;

const Title = styled.h2`
  margin: 50px 0 40px;
  font-size: 24px;
  font-weight: bold;
`;

const LinkWrapper = styled.div`
  width: 100%;
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
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
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
  const navigate = useNavigate();
  const onLogOutClick = async () => {
    const LogOutConfirm = window.confirm("로그아웃 하시겠습니까?");
    if (LogOutConfirm) {
      await auth.signOut();
      navigate("/walletlogin");
    }
  };
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
        {/* <SettingsLink to={`/Noti`}>
          <Icon>
            <FaBell />
          </Icon>
          <LinkText>알림</LinkText>
          <FaChevronRight className="chevron" />
        </SettingsLink> */}
        <SettingsLink>
          <Icon>
            <FaLock />
          </Icon>
          <LinkText>사용 정지</LinkText>
          <FaChevronRight className="chevron" />
        </SettingsLink>
      </LinkWrapper>
      <LogOutContainer onClick={onLogOutClick}>
        <LogOutIcon />
        <LogOutText>로그아웃</LogOutText>
      </LogOutContainer>
    </Container>
  );
}
