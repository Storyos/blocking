import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase";

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
      로그인
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", { required: true })}
          placeholder="이메일"
          type="email"
        />
        <input
          {...register("password", { required: true })}
          placeholder="비밀번호"
          type="password"
        />
        <input
          type="submit"
          value={isLoading ? "로그인 중..." : "로그인"}
        />
      </form>
      {error && <p>{error}</p>}
    </>
  );
}
