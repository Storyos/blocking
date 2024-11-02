import styled from "styled-components";
import { useForm } from "react-hook-form";
import MenubarLayout from "../../components/MenubarLayout";
import { useState } from "react";
import axios from "axios";

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
    transform: translateY(-3px) scale(1.0); /* Scale effect on hover */
  }

  a {
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: 8px;
    font-size: 20px;
  }
`;

export default function MintSBT() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("studentId", data.studentId);
    formData.append("university", data.university);
    formData.append("status", data.status);
    formData.append("photo", data.photo[0]);

    try {
      console.log(formData);
      const response = await axios.post("/api/url작성", formData);
      console.log("Response:", response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
          <label htmlFor="status">재학/졸업/학위 여부</label>
          <select
            {...register("status", { required: true })}
            id="status"
            disabled={isLoading}
          >
            <option value="">선택</option>
            <option value="재학">재학</option>
            <option value="졸업">졸업</option>
            <option value="학위">학위</option>
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
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "로딩 중..." : "발급하기"}
        </SubmitButton>
      </FormContainer>
    </Container>
  );
}
