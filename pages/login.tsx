import Head from "next/head";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NextPage } from "next";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { AuthContext } from "../hooks/authProvider";
import { Login } from "../models/interface";
import HeaderBeforeLogin from "../components/common/headerBeforeLogin";
import GuestLoginLink from "../components/common/guestLoginLink";
import useIsLogin from "../hooks/useTest";
import LoginForm from "../components/login/loginForm";

const Login: NextPage = () => {
  useIsLogin("/home");
  const { register, handleSubmit } = useForm<Login>();
  const { loginUser } = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  const submitData = async (data: Login) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      switch (e.code) {
        case "auth/wrong-password":
          setMsg("パスワードが間違っています");
          break;
        case "auth/user-not-found":
          setMsg("ユーザーが見つかりません");
          break;
        case "auth/too-many-requests":
          setMsg("間違いが多すぎます。ロードし直してください");
          break;
        default:
          setMsg("通信に失敗しました");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <HeaderBeforeLogin />
      <GuestLoginLink />
      {!loginUser && (
        <LoginForm
          handleSubmit={handleSubmit}
          register={register}
          msg={msg}
          submitData={submitData}
        />
      )}
    </>
  );
};

export default Login;
