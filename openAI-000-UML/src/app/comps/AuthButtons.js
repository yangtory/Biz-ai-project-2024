"use client";

import Link from "next/link";
import css from "../../css/login.module.css";
import { useSession, signOut } from "next-auth/react";

const AuthButtons = () => {
  const { data: session } = useSession();
  return session ? (
    <button
      className={css.logout}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      로그아웃
    </button>
  ) : (
    <Link href="/login">
      <button className={css.login}>로그인</button>
    </Link>
  );
};

export default AuthButtons;
