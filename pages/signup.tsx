import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TitleText from "../components/common/titleText";
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
import { AuthContext } from "../components/common/hooks/authProvider";
import { useRouter } from "next/router";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import { Signup } from "../models/interface";
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
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      if (auth.currentUser) {
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          name,
          email,
        });
      }
      setMsg("登録できました");
      setMemberData({
        name,
        email,
      });
      reset();
    } catch (e: any) {
      deleteUser(auth.currentUser);
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
      <TitleText>新規登録</TitleText>
      <FormSpace>
        {msg !== "登録できました" ? (
          <>
            <form onSubmit={handleSubmit(submitData)}>
              <VStack w="70%" m="0 auto" spacing={6}>
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
                    placeholder="パスワードを入力してください"
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
            <PageLink href={"top"} color={"blue.300"} underline={"underLine"}>
              会員ページへ
            </PageLink>
          </VStack>
        )}
      </FormSpace>
    </>
  );
};

export default Signup;
