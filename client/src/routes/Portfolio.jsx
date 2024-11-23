import axios from "axios"; // Axios 사용
import React, { useEffect, useState } from "react";
import { FaCertificate, FaLock, FaLockOpen } from "react-icons/fa"; // 아이콘 불러오기
import styled from "styled-components";
import NotifyIcon from "../components/NotifyIcon";

// 스타일링
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  @media (min-width: 600px) {
    padding-left: 60px;
    padding-right: 60px;
  }
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-left: 0; /* 왼쪽에 붙이기 */
  text-align: left;
  padding: 10px;
  width: 100%;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 한 줄에 3개의 박스 */
  gap: 20px;
  width: 100%;
  padding: 0 20px;
`;

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 20px;
  box-shadow: 1px 1px rgba(86, 204, 212, 0.5);
  padding: 18px;
  text-align: center;
  font-size: 11px;
  color: #333;

  h3 {
    margin: 8px 0 5px; /* h3 요소의 마진을 조정 */
    font-size: 14px; /* h3의 폰트 크기 조정 */
  }

  p {
    margin: 0; /* p 요소의 기본 마진을 제거 */
    font-size: 11px; /* p의 폰트 크기 조정 */
  }
`;

const SbtContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

const LockIcon = styled.div`
  margin-left: 5px;
  cursor: pointer;
  color: #50c2c9;
`;

const Portfolio = () => {
  const [lockState, setLockState] = useState([]);
  const [sbtData, setSbtData] = useState([]); // SBT 데이터를 저장할 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [userAddress, setUserAddress] = useState(""); // 사용자의 지갑 주소 상태

  // MetaMask에서 지갑 주소 가져오기
  const getUserAddress = async () => {
    if (window.ethereum) {
      try {
        // MetaMask 지갑 연결
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setUserAddress(accounts[0]); // 첫 번째 계정의 주소를 저장
        console.log(accounts);
        return accounts[0];
      } catch (error) {
        console.error("MetaMask 연결 실패:", error);
        return null;
      }
    } else {
      console.error("MetaMask가 설치되지 않았습니다.");
      return null;
    }
  };

  const fetchSBTs = async () => {
    try {
      const address = await getUserAddress();
      if (!address) {
        console.error("지갑 주소를 가져오지 못했습니다.");
        setIsLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:4000/api/sbtmint/getSBTData?userAddress=${address}`
      );
      console.log("SBT 조회 결과:", response.data);
      const sbtDetails = response.data.sbtDetails;
      setSbtData(sbtDetails); // SBT 데이터를 상태에 저장
      setLockState(sbtDetails.map(() => true)); // 초기 lockState는 모두 잠금 상태
      setIsLoading(false); // 로딩 완료
    } catch (error) {
      console.error("SBT 조회 실패:", error);
      setIsLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    fetchSBTs();
  }, []);

  const toggleLock = (index) => {
    const newLockState = [...lockState];
    newLockState[index] = !newLockState[index];
    setLockState(newLockState);
  };

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 화면 표시
  }

  return (
    <Container>
      <Header>
        <Title>자격증</Title>
        <NotifyIcon />
      </Header>
      <GridContainer>
        {sbtData.map((sbt, index) => (
          <div key={sbt.tokenId}>
            <Card>
              <FaCertificate />
              <h3>{sbt.metadata.status || `자격증 ${index + 1}`}</h3>
              <p>{`학번: ${sbt.metadata.studentId}`}</p>
              <p>{`학교: ${sbt.metadata.university}`}</p>
            </Card>
            <SbtContainer>
              {`Token ID: ${sbt.tokenId}`}
              <LockIcon onClick={() => toggleLock(index)}>
                {lockState[index] ? <FaLock /> : <FaLockOpen />}
              </LockIcon>
            </SbtContainer>
          </div>
        ))}
      </GridContainer>
    </Container>
  );
};

export default Portfolio;
