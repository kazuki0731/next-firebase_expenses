import Head from "next/head";
import { useForm } from "react-hook-form";
import { NextPage } from "next";
import { Login } from "../models/interface";
import HeaderBeforeLogin from "../components/common/headerBeforeLogin";
import GuestLoginLink from "../components/common/guestLoginLink";
import LoginForm from "../components/login/loginForm";
import { useAuth, useIsLogin } from "../hooks/auth";

const Login: NextPage = () => {
  useIsLogin("/home");
  const { register, handleSubmit } = useForm<Login>();
  const { login, msg } = useAuth();

  // ログインボタン押下時
  const submitData = async (date: Login) => {
    login(date);
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <HeaderBeforeLogin />
      <GuestLoginLink />
      <LoginForm
        handleSubmit={handleSubmit}
        register={register}
        msg={msg}
        submitData={submitData}
      />
    </>
  );
};

export default Login;
