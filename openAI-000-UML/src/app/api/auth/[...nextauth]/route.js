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
        id: {
          label: "아이디",
          type: "id",
          placeholder: "아이디를 입력하세요",
        },
        password: {
          label: "비밀번호",
          type: "password",
          placeholder: "비밀번호를 입력하세요",
        },
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          name: "tory",
          email: "tory@tory.com",
          password: "1234",
        };
        const { id, password } = credentials;
        if (user.id === id && user.password === password) {
          console.log("로그인ㅇㅋ");
          return { ...user };
        } else {
          console.log("로그인ㄴㄴ");
          throw new Error("CredentialsSignin");
        }
      },
    }),
  ],
});

// hadler 를 get, post 로 요청하면 너가 해
export { Handler as GET, Handler as POST };
