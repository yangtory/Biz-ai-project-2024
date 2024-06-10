"use client";
import { useCallback, useRef, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import css from "../../css/login.module.css";

const LoginPage = () => {
  // react 에서 사용하는 아이디 개념
  const emailRef = useRef();
  const passRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const onLoginSubmit = useCallback(async (e) => {
    e.preventDefault();
    setErrorMessage("");
    // 로그인 하는 함수
    const res = await signIn("credentials", {
      id: emailRef.current.value,
      password: passRef.current.value,
      redirect: false,
      // callbackUrl: "/",
    });

    if (res?.error === "CredentialsSignin") {
      setErrorMessage("로그인 정보를 확인하세요");
      return;
    }
    window.location.href = "/";
  }, []);

  return (
    <>
      <form className={css.form}>
        <div>{errorMessage}</div>
        <input
          className={css.email}
          ref={emailRef}
          type="text"
          placeholder="이메일을 입력하세요"
        />
        <input
          className={css.password}
          ref={passRef}
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
        <input
          className={css.loginBtn}
          type="button"
          value="로그인"
          onClick={onLoginSubmit}
        />
      </form>
    </>
  );
};
export default LoginPage;
