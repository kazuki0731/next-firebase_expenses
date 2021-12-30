import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TitleText from "../components/common/titleText";
import { Text, VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { AuthContext } from "../hooks/authProvider";
import FormSpace from "../components/common/formSpace";
import PageLink from "../components/common/pageLink";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

interface FormData {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const { loginUser } = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const { onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (loginUser) {
      router.push("/top");
    }
  }, [loginUser]);

  const submitData = async (data: FormData) => {
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
      {!loginUser && (
        <>
          <TitleText>ログイン</TitleText>
          <FormSpace>
            <form onSubmit={handleSubmit(submitData)}>
              <VStack w="90%" m="0 auto" spacing={6}>
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
                {msg && <Text color="red">{msg}</Text>}
                <Text fontSize="16px" w="100%">
                  新規登録は
                  <PageLink
                    href="/signup"
                    color={"blue.400"}
                    underline={"underLine"}
                  >
                    こちら
                  </PageLink>
                </Text>
              </VStack>
            </form>
          </FormSpace>
          
        </>
      )}
    </>
  );
};

export default Login;
