import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase";
import styled, { createGlobalStyle } from "styled-components";

const Style = createGlobalStyle`
  *,::before,::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
`;

const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: 100%;
  height: 100vh;
  margin: 0 24px; /* 1.5rem to px */
  background-color: #f2f2f2;
`;

const Content = styled.div`
  display: grid;
`;

const ImageContainer = styled.div`
  justify-self: center;

  img {
    width: 310px;
    margin-top: 24px; /* 1.5rem to px */
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

const FormsContainer = styled.div`
  position: relative;
  height: 368px;
`;

const Form = styled.form`
  position: absolute;
  bottom: 16px; /* 1rem to px */
  width: 100%;
  background-color: #f2f2f2;
  padding: 32px 16px; /* 2rem 1rem to px */
  border-radius: 16px; /* 1rem to px */
  text-align: center;
  box-shadow: 0 8px 20px rgba(35, 0, 77, 0.2);
  animation-duration: 0.4s;
  animation-name: animateLogin;

  @keyframes animateLogin {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.1, 1.1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
`;

const Title = styled.h1`
  font-size: 24px; /* 1.5rem to px */
  margin-bottom: 32px; /* 2rem to px */
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 8px; /* 0.5rem to px */
  padding: 18px 16px; /* 1.125rem 1rem to px */
  background-color: #fff;
  margin-top: 16px; /* 1rem to px */
  border-radius: 8px; /* 0.5rem to px */
`;

const Icon = styled.i`
  font-size: 24px; /* 1.5rem to px */
  color: #4AD395;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 15px; /* 0.938rem to px */
  font-weight: 700;
  color: #23004d;
  width: 100%;

  &::placeholder {
    font-size: 15px; /* 0.938rem to px */
    color: #a49eac;
  }
`;

const ForgotPassword = styled.a`
  display: block;
  width: max-content;
  margin-left: auto;
  margin-top: 8px; /* 0.5rem to px */
  font-size: 10px;
  font-weight: 600;
  color: #a49eac;

  &:hover {
    color: #3ba9b1;
  }
`;

const SubmitButton = styled.input`
  display: block;
  width: 180px;
  height: 40px;
  border: none;
  border-radius: 10px;
  margin: 2rem auto; /* Changed to auto for horizontal centering */
  background-color: #50c2c9;
  color: #fff;
  font-weight: 600;
  text-align: center;
  transition: 0.3s;

  &:hover {
    background-color: #3ba9b1;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const AccountMessage = styled.span`
  font-weight: 600;
  font-size: 13px; /* 0.813rem to px */
`;

const SignInLink = styled.span`
  color: #5F9EA0;
  cursor: pointer;
  font-weight: 600;
`;

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "유효하지 않은 이메일 형식입니다.";
      case "auth/user-disabled":
        return "비활성화된 계정입니다.";
      case "auth/user-not-found":
        return "등록된 사용자가 없습니다.";
      case "auth/wrong-password":
        return "잘못된 비밀번호입니다.";
      case "auth/invalid-credential":
        return "유효하지 않은 인증 정보이거나 이메일, 비밀번호가 일치하지 않습니다.";
      case "auth/too-many-requests":
        return "요청이 너무 많습니다. 잠시 후 다시 시도하세요.";
      default:
        return "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
    }
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code);
        setError(getErrorMessage(e.code));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Style />
      <LoginContainer>
        <Content>
          <ImageContainer>
            {/* 사진넣을 예정 */}
          </ImageContainer>
          <FormsContainer>
            <Form onSubmit={handleSubmit(onSubmit)} className="login__register" id="login-in">
              <Title className="login__title">로그인</Title>
              <InputContainer className="login__box">
                <Icon className="bx bx-user login__icon" />
                <Input
                  {...register("email", { required: true })}
                  placeholder="이메일"
                  type="email"
                />
              </InputContainer>
              <InputContainer className="login__box">
                <Icon className="bx bx-lock login__icon" />
                <Input
                  {...register("password", { required: true })}
                  placeholder="비밀번호"
                  type="password"
                />
              </InputContainer>
              <ForgotPassword href="#">비밀번호를 잊으셨나요?</ForgotPassword>
              <SubmitButton
                type="submit"
                value={isLoading ? "로그인 중..." : "로그인"}
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <div>
                <AccountMessage>계정이 없으신가요? </AccountMessage>
                <SignInLink id="sign-up">회원가입</SignInLink>
              </div>
            </Form>
          </FormsContainer>
        </Content>
      </LoginContainer>
    </>
  );
}
