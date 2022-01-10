import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NextPage } from "next";
import Head from "next/head";
import FormSpace from "../components/input/formSpace";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword, deleteUser } from "@firebase/auth";
import { Signup } from "../models/interface";
import HeaderBeforeLogin from "../components/common/headerBeforeLogin";
import GuestLoginLink from "../components/common/guestLoginLink";
import { createDisplayName } from "../apiCaller/authQuery";
import useIsLogin from "../hooks/useTest";
import SignupForm from "../components/signup/signupForm";
import Complete from "../components/signup/complete";

const Signup: NextPage = () => {
  useIsLogin("/home");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Signup>();
  const [msg, setMsg] = useState("");
  const [memberData, setMemberData] = useState({
    name: "",
    email: "",
  });

  const submitData = async (data: Signup) => {
    const { email, password, name } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      createDisplayName(auth, email, name);
      setMsg("登録できました");
      setMemberData({
        name,
        email,
      });
      reset();
    } catch (e: any) {
      if (auth.currentUser) {
        deleteUser(auth.currentUser);
      }
      console.log(e);
      switch (e.code) {
        case "auth/email-already-in-use":
          setMsg("メールアドレスはすでに使われています");
          break;
        case "auth/weak-password":
          setMsg("パスワードを複雑にしてください");
          break;
        default:
          setMsg("通信に失敗しました");
      }
    }
  };
  return (
    <>
      <Head>
        <title>signup</title>
      </Head>
      <HeaderBeforeLogin />
      <GuestLoginLink />
      <FormSpace>
        {msg !== "登録できました" ? (
          <SignupForm
            handleSubmit={handleSubmit}
            register={register}
            submitData={submitData}
            errors={errors}
            msg={msg}
          />
        ) : (
          <Complete memberData={memberData} msg={msg} />
        )}
      </FormSpace>
    </>
  );
};

export default Signup;
