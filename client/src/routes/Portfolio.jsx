import axios from "axios"; // Axios 사용
import React, { useEffect, useState } from "react";
import { FaCertificate, FaLock, FaLockOpen } from "react-icons/fa"; // 아이콘 불러오기
import styled from "styled-components";
import Modal from "../components/Modal"; // Modal 컴포넌트 불러오기
import NotifyIcon from "../components/NotifyIcon";
import { Loader } from "../components/Loader";

// 스타일링
const ModalContent = styled.div`
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eaeaea;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  strong {
    font-weight: 600;
    color: #333;
  }

  span {
    font-size: 14px;
    color: #666;
  }
`;

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
const DeleteButton = styled.button`
  display: block;
  width: 100%;
  max-width: 180px;
  margin: 20px auto 0;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #e74c3c;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;

const LockIcon = styled.div`
  margin-left: 5px;
  cursor: pointer;
  color: #50c2c9;
`;
const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
  text-align: center;
`;

const ModalInfo = styled.p`
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;

  strong {
    color: #333;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 60vh;
  color: #535353;
`;

const Portfolio = () => {
  const [lockState, setLockState] = useState([]);
  const [sbtData, setSbtData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userAddress, setUserAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSbt, setSelectedSbt] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const getUserAddress = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setUserAddress(accounts[0]);
        return accounts[0];
      } catch (error) {
        console.error("MetaMask 연결 실패:", error);
        setErrorMessage("MetaMask 연결에 실패했습니다. 다시 시도해 주세요.");
        return null;
      }
    } else {
      console.error("MetaMask가 설치되지 않았습니다.");
      setErrorMessage("MetaMask를 설치해주세요.");
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

      const response = await axios.get(`https://pscs.store/api/sbtmint/getSBTData?userAddress=${address}`);
      const sbtDetails = response.data.sbtDetails;
      if (sbtDetails.length === 0) {
        setErrorMessage("포트폴리오 정보가 존재하지 않습니다. 자격증을 추가해 보세요.");
      }
      setSbtData(sbtDetails);
      console.log(sbtDetails);
      setLockState(sbtDetails.map(() => true));
      setIsLoading(false);
    } catch (error) {
      console.error("SBT 조회 실패:", error);
      setIsLoading(false);
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

  const openModal = (sbt) => {
    setSelectedSbt(sbt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSbt(null);
  };

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>자격증</Title>
        <NotifyIcon />
      </Header>
      {errorMessage ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : (
        <GridContainer>
          {sbtData.map((sbt, index) => (
            <div
              key={sbt.tokenId}
              onClick={() => openModal(sbt)}
            >
              <Card>
                <FaCertificate />
                <h3>{sbt.metadata.status || `자격증 ${index + 1}`}</h3>
                <p>{`학번: ${sbt.metadata.studentId}`}</p>
                <p>{`학교: ${sbt.metadata.university}`}</p>
              </Card>
              <SbtContainer>
                {`Token ID: ${sbt.tokenId}`}
                <LockIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLock(index);
                  }}
                >
                  {lockState[index] ? <FaLock /> : <FaLockOpen />}
                </LockIcon>
              </SbtContainer>
            </div>
          ))}
        </GridContainer>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {selectedSbt && (
          <ModalContent>
            <ModalTitle>자격증 상세 정보</ModalTitle>

            <Section>
              <InfoRow>
                <strong>상태</strong>
                <span>{selectedSbt.metadata.status}</span>
              </InfoRow>
              <InfoRow>
                <strong>학번</strong>
                <span>{selectedSbt.metadata.studentId}</span>
              </InfoRow>
              <InfoRow>
                <strong>학교</strong>
                <span>{selectedSbt.metadata.university}</span>
              </InfoRow>
              <InfoRow>
                <strong>Token ID</strong>
                <span>{selectedSbt.tokenId}</span>
              </InfoRow>
            </Section>

            <Section>
              <InfoRow>
                <strong>설명</strong>
                <span>{selectedSbt.metadata.description}</span>
              </InfoRow>
              <InfoRow>
                <strong>발급일</strong>
                <span>{selectedSbt.metadata.issuedDate}</span>
              </InfoRow>
            </Section>

            {selectedSbt.metadata.extraDetails && (
              <Section>
                <InfoRow>
                  <strong>동아리 이름</strong>
                  <span>{selectedSbt.metadata.extraDetails.clubName}</span>
                </InfoRow>
                <InfoRow>
                  <strong>역할</strong>
                  <span>{selectedSbt.metadata.extraDetails.role}</span>
                </InfoRow>
                <InfoRow>
                  <strong>활동 기간</strong>
                  <span>{selectedSbt.metadata.extraDetails.activityDuration}</span>
                </InfoRow>
              </Section>
            )}

            {/* 삭제 버튼 추가 */}
            <DeleteButton
              onClick={async () => {
                try {
                  const response = await axios.post("https://pscs.store/api/sbtmint/deleteSBT", {
                    tokenId: selectedSbt.tokenId,
                  });
                  alert("SBT가 성공적으로 삭제되었습니다!");
                  closeModal(); // 모달 닫기
                  window.location.reload(); // 데이터 갱신
                } catch (error) {
                  console.error("삭제 실패:", error);
                  alert("SBT 삭제 중 오류가 발생했습니다.");
                }
              }}
            >
              삭제하기
            </DeleteButton>
          </ModalContent>
        )}
      </Modal>
    </Container>
  );
};

export default Portfolio;
