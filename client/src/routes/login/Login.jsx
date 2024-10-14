import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase";
import styled from "styled-components";
import { TbPasswordUser } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";

const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  min-height: 90vh;
  background-color: white;
`;

const ImageContainer = styled.div`
  display: flex;               // Add this to enable flexbox
  justify-content: center;     // Center horizontally
  align-items: center;         // Center vertically
  height: 100%;                // Optional: make sure it takes full height
  background: white;
  img {
    max-width: 35%;
    // height: auto;
  }
`;
const FormsContainer = styled.div`
  width: 100%;
  max-width: 400px;
  position: relative;
`;

const Form = styled.form`
  padding: 30px 16px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 15px rgba(35, 0, 77, 0.2);
  background-color: #f2f4f4;
`;

const Title = styled.h1`
  font-size: 22px;
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 8px;
  padding: 10px 15px;
  background-color: #fff;
  margin-top: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  &:focus {
    border-color: #50c2c9;
    outline: none;
  }

  &:hover {
    border-color: #b0e0e6;
  }
`;

const Icon = styled.i`
  font-size: 20px;
  color: #38dacf;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 13px;
  width: 100%;

  &::placeholder {
    font-size: 13px;
    color: #a49eac;
  }
`;

const ForgotPassword = styled.a`
  display: block;
  width: max-content;
  margin-left: auto;
  margin-top: 8px;
  font-size: 10px;
  font-weight: 600;
  color: #a49eac;
  cursor: pointer;

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
  margin: 1rem auto;
  background-color: #50c2c9;
  color: #fff;
  font-weight: 600;
  text-align: center;
  transition: 0.3s;

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

const ErrorMessage = styled.p`
  color: red;
`;

const AccountMessage = styled.span`
  font-weight: 600;
  font-size: 13px;
`;

const SignInLink = styled.span`
  color: #5f9ea0;
  cursor: pointer;
  font-weight: 600;
`;

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm();

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
      reset();
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
    <LoginContainer>
      <ImageContainer>
        <img src="/img/encryption.gif" alt="Login" />
      </ImageContainer>
      <FormsContainer>
        <Form onSubmit={handleSubmit(onSubmit)} className="login__register" id="login-in">
          <Title className="login__title">로그인</Title>
          <InputContainer className="login__box">
            <Icon>
              <HiOutlineMail /> {/* Email icon */}
            </Icon>
            <Input
              {...register("email", { required: true })}
              placeholder="이메일"
              type="email"
              disabled={isLoading}
            />
          </InputContainer>
          <InputContainer className="login__box">
            <Icon>
              <TbPasswordUser /> {/* Password icon */}
            </Icon>
            <Input
              {...register("password", { required: true })}
              placeholder="비밀번호"
              type="password"
              disabled={isLoading}
            />
          </InputContainer>
          <ForgotPassword onClick={() => alert("비밀번호 복구 기능이 준비 중입니다.")}>
            비밀번호를 잊으셨나요?
          </ForgotPassword>
          <SubmitButton type="submit" value={isLoading ? "로그인 중..." : "로그인"} disabled={isLoading} />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <div>
            <AccountMessage>계정이 없으신가요? </AccountMessage>
            <SignInLink onClick={() => navigate("/signup")} id="SignUp">
              회원가입
            </SignInLink>
          </div>
        </Form>
      </FormsContainer>
    </LoginContainer>
  );
}
