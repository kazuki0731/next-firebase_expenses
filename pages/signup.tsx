import React from "react";
import { useForm } from "react-hook-form";
import { NextPage } from "next";
import Head from "next/head";
import FormSpace from "../components/input/formSpace";
import { Signup } from "../models/interface";
import HeaderBeforeLogin from "../components/common/headerBeforeLogin";
import GuestLoginLink from "../components/common/guestLoginLink";
import SignupForm from "../components/signup/signupForm";
import Complete from "../components/signup/complete";
import { useAuth } from "../hooks/auth";

const Signup: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>();
  const { signup, msg, memberData } = useAuth();

  // サインアップボタン押下時
  const submitData = async (data: Signup) => {
    signup(data);
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