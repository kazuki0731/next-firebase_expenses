import Head from "next/head";
import type { NextPage } from "next";

import PageLink from "../components/common/pageLink";
import HeaderBeforeLogin from "../components/common/headerBeforeLogin";
import { useContext, useEffect } from "react";
import { AuthContext } from "../hooks/authProvider";
import { Box, Text, HStack } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { Button } from "@chakra-ui/react";
import GuestLoginLink from "../components/common/guestLoginLink";

const Home: NextPage = () => {
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (loginUser) {
      router.push("/home");
    }
  }, [loginUser]);

  return (
    <Box w="100vw" h="90vh" minH="700px" position="relative">
      <Head>
        <title>Top</title>
      </Head>
      <HeaderBeforeLogin />
      <GuestLoginLink />
      <Box
        position="absolute"
        top="37%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Text textAlign="left" fontSize={{ base: "16px", md: "24px" }}>
          ここにアプリの説明文が入りますここにアプリの説明文が入りますここにアプリの説明文が入りますここにアプリの説明文が入ります
        </Text>
        <PageLink href="/signup">
          <Button
            borderRadius="4px"
            fontSize={{ base: "14px", md: "22px" }}
            w={{ base: "90px", md: "170px" }}
            h={{ base: "50px", md: "70px" }}
            m="10px auto"
            bg="blue.200"
          >
            新規登録
          </Button>
        </PageLink>
      </Box>
    </Box>
  );
};

export default Home;
