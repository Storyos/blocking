import styled from "styled-components";
import { useForm } from "react-hook-form";
import MenubarLayout from "../../components/MenubarLayout";
import { useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button``;

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
