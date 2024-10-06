import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import styled from "styled-components";

// Styled-components
const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Form = styled.form`
  background-color: white;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 2px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #50c2c9;
    outline: none;
  }

  &:hover {
    border-color: #b0e0e6;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #50c2c9;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #50c2c9;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3ba9b1;
  }

  &:disabled {
    background-color: #d0d0d0;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid red;
  border-radius: 5px;
  background-color: #ffe6e6;
`;

const ConfirmationMessage = styled.span`
  color: green;
  font-weight: bold;
  margin-left: 10px;
`;

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

const EyeIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

// SignUp component
export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const email = watch("email");

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "이미 사용 중인 이메일 주소입니다.";
      case "auth/invalid-email":
        return "유효하지 않은 이메일 주소입니다.";
      case "auth/weak-password":
        return "비밀번호는 6자 이상이어야 합니다.";
      case "auth/network-request-failed":
        return "네트워크 오류가 발생했습니다. 다시 시도해주세요.";
      default:
        return "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  };

  const handleEmailCheck = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("유효한 이메일 형식이 아닙니다.");
      return;
    }
    setIsCodeSended(true);
  };

  const confirmCodeCheck = async () => {
    setEmailConfirm(true);
  };

  const createUserDocument = async (user, data) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        name: data.name,
        studentNumber: data.studentNumber,
        email: data.email,
        birthDate: `${data.year}-${data.month}-${data.day}`,
        createdAt: new Date(),
      });
    } catch (error) {
      throw error;
    }
  };

  const onSubmit = async (data) => {
    if (!emailConfirm) {
      alert("이메일 인증을 완료해 주세요.");
      return;
    }
    const { name, email, password } = data;
    setError("");
    if (isLoading) return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credentials.user, { displayName: name });
      await createUserDocument(credentials.user, data);
      navigate("/WalletPwd");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(getErrorMessage(e.code));
        if (auth.currentUser) {
          try {
            await auth.currentUser.delete();
          } catch (deleteError) {
            console.error("계정 삭제 오류: ", deleteError);
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUpContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>회원가입</Title>
        <Label>이름</Label>
        <Input {...register("name", { required: true })} placeholder="이름" type="text" />

        <Label>학번</Label>
        <Input {...register("studentNumber", { required: true })} placeholder="학번" type="number" />

        <Label>생년월일</Label>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Select {...register("year", { required: true })}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
          <Select {...register("month", { required: true })}>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </Select>
          <Select {...register("day", { required: true })}>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </Select>
        </div>

        <Label>학교이메일 주소</Label>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Input
            {...register("email", { required: true })}
            placeholder="학교이메일 주소"
            type="email"
            disabled={isCodeSended}
          />
          {isCodeSended ? (
            <ConfirmationMessage>완료</ConfirmationMessage>
          ) : (
            <Button type="button" onClick={handleEmailCheck}>
              인증
            </Button>
          )}
        </div>

        {isCodeSended && (
          <>
            <Label>인증코드</Label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Input
                {...register("confirmCode", { required: true })}
                placeholder="인증코드 입력"
                type="number"
                disabled={emailConfirm}
              />
              {emailConfirm ? (
                <ConfirmationMessage>완료</ConfirmationMessage>
              ) : (
                <Button type="button" onClick={confirmCodeCheck}>
                  확인
                </Button>
              )}
            </div>
          </>
        )}

        <Label>비밀번호</Label>
        <PasswordContainer>
          <Input
            {...register("password", { required: true, minLength: 6 })}
            placeholder="비밀번호"
            type={showPassword ? "text" : "password"}
          />
          <EyeIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </EyeIcon>
        </PasswordContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "로딩 중..." : "회원가입"}
        </Button>
      </Form>
    </SignUpContainer>
  );
}
