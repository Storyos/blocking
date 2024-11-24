import { BrowserProvider } from "ethers";
import { FaChevronRight, FaLock, FaSignOutAlt, FaUser, FaWallet } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackIcon from "../../components/BackIcon";
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
  padding: 10px 60px;

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
  box-shadow: 0 1px 5px #a2a2a2;
`;

const LinkText = styled.span`
  flex-grow: 1;
`;

const WalletButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #50c2c9;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #3aa3b0;
  }
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

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask가 설치되어 있지 않습니다. 설치 후 다시 시도해주세요.");
        return;
      }

      const provider = new BrowserProvider(window.ethereum); // Web3Provider 대신 BrowserProvider 사용
      const accounts = await provider.send("eth_requestAccounts", []); // 계정 요청
      const signer = await provider.getSigner(); // 서명 객체 가져오기
      const address = await signer.getAddress(); // MetaMask 주소 가져오기

      alert(`MetaMask와 성공적으로 연결되었습니다: ${address}`);
    } catch (error) {
      console.error("MetaMask 연동 에러:", error);
      alert("MetaMask 연동 중 오류가 발생했습니다.");
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
      <WalletButton onClick={connectWallet}>
        <FaWallet style={{ marginRight: "10px" }} />
        지갑 연동
      </WalletButton>
      <LogOutContainer onClick={onLogOutClick}>
        <LogOutIcon />
        <LogOutText>로그아웃</LogOutText>
      </LogOutContainer>
    </Container>
  );
}
