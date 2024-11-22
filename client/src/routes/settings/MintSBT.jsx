import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const menuValue = queryParams.get("menu");

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/sbt/postDatatoPinata", data);
      console.log("Response:", response.data);
      reset();
    } catch (error) {
      console.error(error);
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
        {/* <Title>SBT 발급</Title> */}
        {/* <Logo src={`/img/Logo.gif`} alt="PKNU Logo" /> */}
        <Logo1
          src={`/img/pknuLogo.png`}
          alt="PKNU Logo"
        />
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

        <SubmitButton
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "로딩 중..." : "발급하기"}
        </SubmitButton>
      </FormContainer>
    </Container>
  );
}
