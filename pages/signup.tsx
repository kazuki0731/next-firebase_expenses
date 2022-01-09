import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, FormControl, FormLabel, Button } from "@chakra-ui/react";
import { VStack, Text, Box } from "@chakra-ui/layout";
import PageLink from "../components/common/pageLink";
import { NextPage } from "next";
import Head from "next/head";
import FormSpace from "../components/input/formSpace";
import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  deleteUser,
} from "@firebase/auth";
import { AuthContext } from "../hooks/authProvider";
import { useRouter } from "next/router";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import { Signup } from "../models/interface";
import HeaderBeforeLogin from "../components/common/headerBeforeLogin";
import GuestLoginLink from "../components/common/guestLoginLink";
import { createDisplayName } from "../apiCaller/authQuery";
auth.currentUser;

const Signup: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Signup>();
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [memberData, setMemberData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (loginUser) {
      router.push("/home");
    }
  }, []);

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
          <>
            <Text>新規登録</Text>
            <form onSubmit={handleSubmit(submitData)}>
              <VStack w="80%" m="10px auto" spacing={6}>
                <FormControl id="name">
                  <FormLabel>ユーザー名:</FormLabel>
                  <Input
                    type="name"
                    {...register("name")}
                    bg="white"
                    placeholder="ユーザー名を入力"
                    required
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>メールアドレス:</FormLabel>
                  <Input
                    type="email"
                    {...register("email")}
                    bg="white"
                    placeholder="メールアドレスを入力"
                    required
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>パスワード:</FormLabel>
                  <Input
                    type="password"
                    {...register("password", {
                      minLength: {
                        value: 6,
                        message: "6文字以上にしてください",
                      },
                    })}
                    bg="white"
                    placeholder="パスワードを入力"
                    required
                  />
                </FormControl>
                {errors.password && <Text>{errors.password.message}</Text>}
                <Button type="submit">登録</Button>
              </VStack>
            </form>
            <Text color="red.400">{msg}</Text>
            <Text mt={5} fontSize="16px" w="100%">
              ログインは
              <PageLink
                href="/login"
                color={"blue.400"}
                underline={"underLine"}
              >
                こちら
              </PageLink>
            </Text>
          </>
        ) : (
          <VStack spacing={4}>
            <Text fontWeight="semibold">{msg}</Text>
            <Text>ニックネーム: {memberData.name} さん</Text>
            <Text>email: {memberData.email}</Text>
            <PageLink href="/home" color={"blue.300"} underline={"underLine"}>
              会員ページへ
            </PageLink>
          </VStack>
        )}
      </FormSpace>
    </>
  );
};

export default Signup;
