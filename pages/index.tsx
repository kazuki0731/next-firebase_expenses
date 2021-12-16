import Head from "next/head";
import type { NextPage } from "next";

import PageLink from "../components/common/pageLink";
import HeaderBeforeLogin from "../components/common/headerBeforeLogin";
import { useContext, useEffect } from "react";
import { AuthContext } from "../hooks/authProvider";
import { Box, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useFnc } from "../hooks/recoilTest";

const Home: NextPage = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      router.push("/top");
    }
  }, [currentUser]);

  return (
    <Box w="100vw" h="90vh" minH="700px" position="relative">
      {/* 実際はBGImage */}
      <Head>
        <title>Top</title>
      </Head>
      <HeaderBeforeLogin />
      <Box
        // bg="yellow.200"
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
