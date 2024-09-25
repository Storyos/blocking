import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const email = watch("email");
  const confirmCode = watch("confirmCode");

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

  // 이메일 전송
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
    // 인증코드 전송 로직
    setIsCodeSended(true);
  };

  const confirmCodeCheck = async () => {
    // 인증코드 유효성 체크
    setEmailConfirm(true);
  };

  // user 정보 저장
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
      console.log("계정 doc 생성 완료");
    } catch (error) {
      console.error("계정 생성 오류: ", error);
      throw error;
    }
  };

  // 회원가입 버튼 클릭시 계정 생성
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
      // 유저 정보 doc 생성
      await createUserDocument(credentials.user, data);
      navigate("/WalletPwd");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(getErrorMessage(e.code));
        // doc 생성중 오류가 발생하면 계정 다시 삭제
        if (auth.currentUser) {
          try {
            await auth.currentUser.delete();
            console.log("계정 삭제 완료");
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
    <>
      회원가입
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: true })}
          placeholder="이름"
          type="text"
        />
        <input
          {...register("studentNumber", { required: true })}
          placeholder="학번"
          type="number"
        />
        <div>
          <label>생년월일</label>
          <select {...register("year", { required: true })}>
            {years.map((year) => (
              <option
                key={year}
                value={year}
              >
                {year}
              </option>
            ))}
          </select>
          <select {...register("month", { required: true })}>
            {months.map((month) => (
              <option
                key={month}
                value={month}
              >
                {month}
              </option>
            ))}
          </select>
          <select {...register("day", { required: true })}>
            {days.map((day) => (
              <option
                key={day}
                value={day}
              >
                {day}
              </option>
            ))}
          </select>
        </div>
        {/* 이메일 */}
        <div>
          <input
            {...register("email", { required: true })}
            placeholder="학교이메일 주소"
            type="email"
            disabled={isCodeSended}
          />
          {isCodeSended ? (
            "전송 완료"
          ) : (
            <button
              type="button"
              onClick={handleEmailCheck}
            >
              인증코드 전송
            </button>
          )}
        </div>
        {/* 인증코드 입력칸 */}
        <div>
          {isCodeSended ? (
            <>
              <input
                {...register("confirmCode", { required: true })}
                placeholder="인증코드 입력칸"
                type="number"
                disabled={emailConfirm}
              />
              {emailConfirm ? (
                "인증코드 확인 완료"
              ) : (
                <button
                  type="button"
                  onClick={confirmCodeCheck}
                >
                  인증코드 확인
                </button>
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <input
          {...register("password", { required: true })}
          placeholder="비밀번호"
          type="password"
        />
        <input
          type="submit"
          value={isLoading ? "Loading..." : "회원가입"}
        />
      </form>
      {error && <p>{error}</p>}
    </>
  );
}
