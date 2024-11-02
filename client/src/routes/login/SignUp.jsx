import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase";

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

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
        // auth/email-already-in-use : 이미 존재하는 이메일로 만드려고할때 ( alert등으로 막는거 필요
        // auth/week-password : (6자리 이하로 비밀번호 작성시) 이거는 FE단에서 input못하게 막기.
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
          placeholder="Name"
          type="text"
        />
        <input
          {...register("email", { required: true })}
          placeholder="Email"
          type="email"
        />
        <input
          {...register("password", { required: true })}
          placeholder="Password"
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
