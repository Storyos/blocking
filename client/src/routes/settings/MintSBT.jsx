import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 480px;
  padding: 30px 5px;
  border-radius: 12px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  box-shadow: 1px 1px rgba(86, 204, 212, 0.5);
`;

// const Title = styled.h2`
//   text-align: center;
//   font-size: 25px;
//   font-weight: 700;
//   color: #333;
//   margin-bottom: 8px;
//   margin-top: 15px;
// `;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-right: 30px;

  label {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }

  input,
  select {
    padding: 12px;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.3s, box-shadow 0.3s;
    background-color: #fefefe;

    &:focus {
      border-color: #50c2c9;
      outline: none;
      box-shadow: 0 0 4px rgba(80, 194, 201, 0.5);
    }
  }

  input[type="file"] {
    padding: 8px;
  }
`;
const Logo1 = styled.img`
  width: 200px;
  height: auto;
  margin: 0 auto;
  display: block;
  position: relative; /* 부모 요소로 위치를 상대적으로 설정 */
`;

const Logo = styled.img`
  width: 50px;
  height: auto;
  margin: 0 auto;
  display: block;
  position: absolute;
  top: 160px; /* 위치를 조정하여 Logo1 위로 올리기 */
  left: 55%; /* 수평으로 가운데 정렬 */
  transform: translateX(-50%) rotate(45deg); /* 75도 회전 */
`;

const SubmitButton = styled.button`
  display: block;
  width: 180px;
  height: 44px;
  border: none;
  border-radius: 8px;
  margin: 0 auto;
  background-color: #50c2c9;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #3ba9b1;
    transform: translateY(-3px);
  }

  &:disabled {
    background-color: #a0d8dc;
    cursor: not-allowed;
  }
`;

export default function MintSBT() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [userAddress, setUserAddress] = useState(""); // MetaMask 지갑 주소 상태 추가
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const menuValue = queryParams.get("menu");

  // MetaMask 지갑 주소 가져오기
  const getUserAddress = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setUserAddress(accounts[0]); // 첫 번째 계정을 상태에 저장
        return accounts[0];
      } catch (error) {
        console.error("MetaMask 연결 실패:", error);
        alert("MetaMask 연결을 확인해주세요.");
        return null;
      }
    } else {
      console.error("MetaMask가 설치되지 않았습니다.");
      alert("MetaMask를 설치해주세요.");
      return null;
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);

    try {
      // MetaMask 지갑 주소 가져오기
      const address = await getUserAddress();
      if (!address) {
        setIsLoading(false);
        return;
      }

      // Pinata에 데이터 업로드
      const pinataResponse = await axios.post(
        `https://pscs.store/api/sbt/uploadToPinata`,
        {
          name: data.name,
          studentId: data.studentId,
          university: "Pukyong University",
          status: data.status,
        }
      );

      if (!pinataResponse.data?.data?.IpfsHash) {
        throw new Error("Pinata에서 IPFS 해시를 반환하지 못했습니다.");
      }

      console.log("Pinata 업로드 성공:", pinataResponse.data.data.IpfsHash);

      // SBT 발급 요청
      const mintResponse = await axios.post(`https://pscs.store/api/sbtmint/mintSBT`, {
        recipientAddress: address, // MetaMask에서 가져온 지갑 주소
        sbtType: 0, // SBT 타입 (enum, 예: 0 = CLUB_ACTIVITY)
        name: data.name, // 이름
        studentId: data.studentId, // 학번
        ipfsUrl: pinataResponse.data.data.IpfsHash, // Pinata에서 반환된 IPFS Hash
      });

      console.log("SBT 발급 성공:", mintResponse.data);
      alert("SBT 발급이 완료되었습니다!");
    } catch (error) {
      console.error("오류 발생:", error);
      alert(`오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStatusOptions = () => {
    switch (menuValue) {
      case "동아리":
        return (
          <>
            <option value="">선택</option>
            <option value="해커톤 수상내역">해커톤 수상내역</option>
            <option value="동아리 활동내역">동아리 활동내역</option>
            <option value="임원직/직책">임원직/직책</option>
          </>
        );
      case "증명서":
        return (
          <>
            <option value="">선택</option>
            <option value="재학증명서">재학증명서</option>
            <option value="졸업증명서">졸업증명서</option>
          </>
        );
      case "비교과 프로그램":
        return (
          <>
            <option value="비교과 프로그램">비교과 프로그램</option>
          </>
        );
      case "학생회":
        return (
          <>
            <option value="학생회 활동내역">학생회 활동내역</option>
          </>
        );
      default:
        return <option value="">선택</option>;
    }
  };

  const renderStatusLabel = () => {
    switch (menuValue) {
      case "동아리":
        return "동아리 활동 내용";
      case "증명서":
        return "재학/졸업증명서";
      case "비교과 프로그램":
        return "비교과 프로그램";
      case "학생회":
        return "학생회 활동 내용 선택";
      default:
        return "증명서 종류";
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Logo1 src={`/img/pknuLogo.png`} alt="PKNU Logo" />
        <InputGroup>
          <label htmlFor="name">이름</label>
          <input
            {...register("name", { required: true })}
            placeholder="이름"
            type="text"
            id="name"
            disabled={isLoading}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="studentId">학번</label>
          <input
            {...register("studentId", { required: true })}
            placeholder="학번"
            type="text"
            id="studentId"
            disabled={isLoading}
          />
        </InputGroup>
        <InputGroup>
          <label htmlFor="status">{renderStatusLabel()}</label>
          <select
            {...register("status", { required: true })}
            id="status"
            disabled={isLoading}
          >
            {renderStatusOptions()}
          </select>
        </InputGroup>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "로딩 중..." : "발급하기"}
        </SubmitButton>
      </FormContainer>
    </Container>
  );
}