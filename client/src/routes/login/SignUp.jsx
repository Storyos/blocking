import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import styled from "styled-components";
import { FaRegEye } from "react-icons/fa";
import { RiEyeCloseFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Form = styled.form`
  background-color: #f2f4f4;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 15px rgba(35, 0, 77, 0.2);
  width: 100%;
  max-width: 480px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 24px;
  font-size: 23px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 93%;
  padding: 11px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 11px;
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
  margin-bottom: 5px;
  font-weight: 550;
  color: #555;
  font-size: 13px;
`;

const Select = styled.select`
  padding: 12px;
  margin-bottom: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #50c2c9;
    outline: none;
  }
`;

const Button = styled.button`
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
  }

  &:disabled {
    background-color: #a5a5a5;
  }
`;

const ComfirmButton = styled.button`
  width: 50px;
  height: 35px;
  border: none;
  border-radius: 10px;
  margin: 2px 2px 14px;
  background-color: #50c2c9;
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #3ba9b1;
  }

  &:disabled {
    background-color: #a5a5a5;
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

const ConfirmIcon = styled.span`
  margin: 5px 5px 12px 7px;
  color: #50c2c9;
`;

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

const EyeIcon = styled.span`
  position: absolute;
  right: 5px;
  top: 35%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #50c2c9;
`;

const EmailConfirmContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const SignInLink = styled.span`
  color: #5f9ea0;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  text-align: center; /* Center the text */
  display: block; /* Ensure it behaves like a block element */
  margin-top: 10px; /* Add margin for spacing */
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
        <Input
          {...register("name", { required: true })}
          placeholder="이름"
          type="text"
        />

        <Label>학번</Label>
        <Input
          {...register("studentNumber", { required: true })}
          placeholder="학번"
          type="number"
        />

        <Label>생년월일</Label>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Select {...register("year", { required: true })}>
            {years.map((year) => (
              <option
                key={year}
                value={year}
              >
                {year}
              </option>
            ))}
          </Select>
          <Select {...register("month", { required: true })}>
            {months.map((month) => (
              <option
                key={month}
                value={month}
              >
                {month}
              </option>
            ))}
          </Select>
          <Select {...register("day", { required: true })}>
            {days.map((day) => (
              <option
                key={day}
                value={day}
              >
                {day}
              </option>
            ))}
          </Select>
        </div>

        <Label>학교이메일 주소</Label>
        <EmailConfirmContainer>
          <Input
            {...register("email", { required: true })}
            placeholder="학교이메일 주소"
            type="email"
            disabled={isCodeSended}
          />
          {isCodeSended ? (
            <ConfirmIcon>
              <GiConfirmed />
            </ConfirmIcon>
          ) : (
            <ComfirmButton
              type="button"
              onClick={handleEmailCheck}
            >
              인증
            </ComfirmButton>
          )}
        </EmailConfirmContainer>

        {isCodeSended && (
          <>
            <Label>인증코드</Label>
            <EmailConfirmContainer>
              <Input
                {...register("confirmCode", { required: true })}
                placeholder="인증코드 입력"
                type="number"
                disabled={emailConfirm}
              />
              {emailConfirm ? (
                <ConfirmIcon>
                  <GiConfirmed />
                </ConfirmIcon>
              ) : (
                <ComfirmButton
                  type="button"
                  onClick={confirmCodeCheck}
                >
                  확인
                </ComfirmButton>
              )}
            </EmailConfirmContainer>
          </>
        )}

        <Label>비밀번호</Label>
        <PasswordContainer>
          <Input
            {...register("password", { required: true })}
            placeholder="비밀번호"
            type={showPassword ? "text" : "password"}
          />
          <EyeIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <FaRegEye
                onClick={() => setShowPassword(false)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <RiEyeCloseFill
                onClick={() => setShowPassword(true)}
                style={{ cursor: "pointer" }}
              />
            )}
          </EyeIcon>
        </PasswordContainer>

        <Label>비밀번호 확인</Label>
        <PasswordContainer>
          <Input
            {...register("passwordConfirm", { required: true })}
            placeholder="비밀번호 확인"
            type={showPasswordConfirm ? "text" : "password"}
          />
          <EyeIcon onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
            {showPasswordConfirm ? (
              <FaRegEye
                onClick={() => setShowPasswordConfirm(false)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <RiEyeCloseFill
                onClick={() => setShowPasswordConfirm(true)}
                style={{ cursor: "pointer" }}
              />
            )}
          </EyeIcon>
        </PasswordContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "가입 중..." : "회원가입"}
        </Button>
        <SignInLink onClick={() => navigate("/LogIn")}>로그인</SignInLink>
      </Form>
    </SignUpContainer>
  );
}
