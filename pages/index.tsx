import Head from "next/head";
import type { NextPage } from "next";

import PageLink from "../components/common/pageLink";
import HeaderBeforeLogin from "../components/common/headerBeforeLogin";
import { useContext, useEffect } from "react";
import { AuthContext } from "../hooks/authProvider";
import { Box, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";

import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../lib/firebase";

const Home: NextPage = () => {
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (loginUser) {
      router.push("/home");
    }
  }, [loginUser]);

  const loginAsGuest = async () => {
    const email = process.env.NEXT_PUBLIC_TESTUSER_EMAIL;
    const password = process.env.NEXT_PUBLIC_TESTUSER_PASSWORD;
    if (!email || !password) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box w="100vw" h="90vh" minH="700px" position="relative">
      <Head>
        <title>Top</title>
      </Head>
      <HeaderBeforeLogin />
      <Text
        m="0 auto"
        w="95%"
        textAlign="right"
        textDecoration="underline"
        fontSize="19px"
        fontWeight="semibold"
        cursor="pointer"
        _hover={{ opacity: 0.7 }}
        onClick={loginAsGuest}
      >
        ゲストユーザーログイン
      </Text>
      <Box
        position="absolute"
        top="37%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Text textAlign="left" fontSize="28px">
          ここにアプリの説明文が入りますここにアプリの説明文が入りますここにアプリの説明文が入りますここにアプリの説明文が入ります
        </Text>
        <PageLink href="/signup">
          <Box w="170px" h="65px" lineHeight="65px" m="10px auto" bg="blue.200">
            新規登録
          </Box>
        </PageLink>
      </Box>
    </Box>
  );
};

export default Home;
