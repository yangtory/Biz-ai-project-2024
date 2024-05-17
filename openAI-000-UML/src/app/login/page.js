"use client";
import { useCallback, useRef } from "react";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  // react 에서 사용하는 아이디 개념
  const emailRef = useRef();
  const passRef = useRef();

  const onLoginSubmit = useCallback(async () => {
    // 로그인 하는 함수
    await signIn("credentials", {
      username: emailRef.current,
      password: passRef.current,
      redirect: true,
      callbackUrl: "/",
    });
  }, []);

  return (
    <form>
      <input
        ref={emailRef}
        type="email"
        placeholder="이메일을 입력하세요"
      />
      <input
        ref={passRef}
        type="password"
        placeholder="비밀번호를 입력하세요"
      />
      <input type="button" onClick={onLoginSubmit} value="로그인" />
    </form>
  );
};
export default LoginPage;
