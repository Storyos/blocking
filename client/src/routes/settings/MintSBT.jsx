import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

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
  
    // S3 업로드를 위한 사전 서명된 URL 요청
    const fileName = `${data.name}-${Date.now()}`;
    try {
      const { data: presignedData } = await axios.post("http://localhost:4000/api/getPresignedUrl", {
        fileName,
        fileType: "application/octet-stream", // 파일 MIME 유형
      });

      // S3에 파일 업로드
      const file = data.photo[0];
      await axios.put(presignedData.url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      // 업로드된 URL과 나머지 폼 데이터를 백엔드로 전송
      const backendResponse = await axios.post("http://localhost:4000/api/upload", {
        ...data,
        photoUrl: presignedData.url.split("?")[0], // S3 URL에서 쿼리스트링 제거
      });

      console.log("백엔드 응답:", backendResponse.data);
    } catch (error) {
      console.error("파일 업로드 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <label htmlFor="name">이름</label>
          <input {...register("name", { required: true })} placeholder="이름" type="text" id="name" disabled={isLoading} />
        </InputGroup>
        <InputGroup>
          <label htmlFor="studentId">학번</label>
          <input {...register("studentId", { required: true })} placeholder="학번" type="text" id="studentId" disabled={isLoading} />
        </InputGroup>
        <InputGroup>
          <label htmlFor="university">대학교</label>
          <input {...register("university", { required: true })} placeholder="대학교" type="text" id="university" disabled={isLoading} />
        </InputGroup>
        <InputGroup>
          <label htmlFor="status">재학/졸업/학위 여부</label>
          <select {...register("status", { required: true })} id="status" disabled={isLoading}>
            <option value="">선택</option>
            <option value="재학">재학</option>
            <option value="졸업">졸업</option>
            <option value="학위">학위</option>
          </select>
        </InputGroup>
        <InputGroup>
          <label htmlFor="photo">사진 업로드</label>
          <input {...register("photo", { required: true })} type="file" id="photo" disabled={isLoading} />
        </InputGroup>
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "로딩 중..." : "발급하기"}
        </SubmitButton>
      </FormContainer>
    </Container>
  );
}
