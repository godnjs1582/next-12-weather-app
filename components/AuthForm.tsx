import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import InputContainer from "./InputContainer";
import emailIcon from "@/public/email_envelope_mail_send_icon.svg";
import lockIcon from "@/public/lock_locker_icon.svg";
import { User } from "@/models/customTypes";
import { signIn } from "next-auth/react";

async function registerUser(userData: User) {
  const response = await fetch("api/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

const AuthForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmedPassword, setEnteredConfirmedPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const authModeHandler = () => {
    setIsLogin((prev) => !prev);
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredConfirmedPassword("");
  };

  const submitHandler = async (evnet: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const userData: User = { enteredEmail, enteredPassword };
    if (
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0
    ) {
      return alert("먼저 유저의 이름과 비밀번호를 입력해주세요");
    }

    if (!isLogin) {
      //회원가입
      if (enteredPassword !== enteredConfirmedPassword) {
        return alert("비밀번호가 일치하지 않습니다");
      }
      try {
        const response = await registerUser(userData);
        alert("회원가입에 성공했습니다");
      } catch (error) {
        console.error(error);
      }
    } else {
      //로그인
      const result = await signIn("credentials", {
        redirect: false,
        enteredEmail,
        enteredPassword,
      });

      if (!result?.error) {
        router.replace("/weather");
      }

      if (result?.error) {
        console.error(result.error);
      }
    }
  };
  return (
    <form className="auth__form" onSubmit={submitHandler}>
      <InputContainer
        type="email"
        value={enteredEmail}
        onChangeHandler={setEnteredEmail}
        placeholder="이메일을 입력해주세요"
        iconAlt="email icon"
        iconSrc={emailIcon}
      />
      <InputContainer
        type="password"
        value={enteredPassword}
        onChangeHandler={setEnteredPassword}
        placeholder="비밀번호를 입력해주세요"
        iconAlt="lock icon"
        iconSrc={lockIcon}
      />
      {!isLogin && (
        <InputContainer
          type="password"
          value={enteredConfirmedPassword}
          onChangeHandler={setEnteredConfirmedPassword}
          placeholder="비밀번호를 입력해주세요"
          iconAlt="lock icon"
          iconSrc={lockIcon}
        />
      )}
      <button className="auth__btn">
        {isLogin ? "Login" : "Create Account"}
      </button>
      <div>
        {isLogin ? "이미계정이 있습니다" : "존재하는 아이디로 로그인하기"}
        <button
          className="ml-2 text-primary"
          type="button"
          onClick={authModeHandler}
        >
          {isLogin ? "회원가입" : "로그인"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
