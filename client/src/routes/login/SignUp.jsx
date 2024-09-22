import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const email = watch("email");

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

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
    try {
      const response = await axios.post("http://univcert.com/api/v1/certify", {
        key: "80718826-ee42-485f-a2ce-65b366bd1e74",
        email: email,
        univName: "부경대학교",
        univ_check: false,
      });
      console.log(response.data);
      setIsCodeSended(true);
    } catch (error) {
      console.error(error);
    }
  };

  // 회원가입 버튼 클릭시
  const onSubmit = async (data) => {
    const { name, email, password } = data;
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(credentials.user);
      await updateProfile(credentials.user, { displayName: name });
      navigate("/WalletPwd");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
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
        <input
          {...register("password", { required: true })}
          placeholder="비밀번호"
          type="password"
        />
        <button>클립 지갑 연동하기</button>
        <input
          type="submit"
          value={isLoading ? "Loading..." : "회원가입"}
        />
      </form>
      {error && <p>{error}</p>}
    </>
  );
}
