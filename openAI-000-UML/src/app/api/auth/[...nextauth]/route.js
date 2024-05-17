import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const Handler = NextAuth({
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/auth/error",
    verifyRequest: "auth-verify-request",
    newUser: "/join",
  },
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: {
          label: "이메일",
          type: "email",
          placeholder: "이메일을 입력하세요",
        },
        password: {
          label: "비밀번호",
          type: "password",
          placeholder: "비밀번호를 입력하세요",
        },
      },
      async authorize(_, req) {
        const user = {
          id: "1",
          name: "tory",
          email: "tory@tory.com",
          password: "1234",
        };
        if (user) return user;
        else return null;
      },
    }),
  ],
});

// hadler 를 get, post 로 요청하면 너가 해
export { Handler as GET, Handler as POST };
