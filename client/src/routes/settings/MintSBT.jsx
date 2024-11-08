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
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  label {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 6px;
  }
  input,
  select {
    padding: 10px;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.3s;
    &:focus {
      border-color: #50c2c9;
      outline: none;
    }
  }
  input[type="file"] {
    padding: 6px;
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 180px;
  height: 40px;
  border: none;
  border-radius: 10px;
  margin: 10px auto;
  background-color: #50c2c9;
  color: #fff;
  font-weight: 600;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #3ba9b1;
    transform: translateY(-3px) scale(1);
  }
`;

export default function MintSBT() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const menuValue = queryParams.get("menu");

  const onSubmit = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("studentId", data.studentId);
    formData.append("university", data.university);
    formData.append("status", data.status);
    formData.append("photo", data.photo[0]);
    formData.append("type", menuValue);

    try {
      console.log(formData);
      const response = await axios.post("/api/url작성", formData);
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
          <label htmlFor="university">대학교</label>
          <input
            {...register("university", { required: true })}
            placeholder="대학교"
            type="text"
            id="university"
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
        <InputGroup>
          <label htmlFor="photo">사진 업로드</label>
          <input
            {...register("photo", { required: true })}
            type="file"
            id="photo"
            disabled={isLoading}
          />
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
