import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TitleText from "../components/titleText";
import Container from "../components/container";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { NextPage } from "next";
import router from "next/router";
import { auth } from "../src/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { AuthContext } from "../hooks/authProvider";

interface FormData {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const { currentUser, setCurrentUser } = useContext<any>(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    } else {
      setIsLogin(false);
    }
  }, [currentUser]);

  const submitData = async (data: FormData) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (e: any) {
      switch (e.code) {
        case "auth/wrong-password":
          setMsg("パスワードが間違っています");
          break;
        case "auth/user-not-found":
          setMsg("ユーザーが見つかりません");
          break;
        case "auth/too-many-requests":
          setMsg("５回間違えたのでしばらく待ってください");
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
      {!isLogin && (
        <>
          <TitleText>ログイン</TitleText>
          <Container>
            <form onSubmit={handleSubmit(submitData)}>
              <VStack w="70%" m="0 auto" spacing={6}>
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
                    {...register("password")}
                    bg="white"
                    placeholder="パスワードを入力"
                    required
                  />
                </FormControl>
                <Button type="submit">ログイン</Button>
              </VStack>
            </form>
          </Container>
        </>
      )}
    </>
  );
};

export default Login;