import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import { Box } from "@chakra-ui/layout";
import GuestLoginLink from "../components/common/guestLoginLink";
import Introduction from "../components/top/introduction";
import { useIsLogin } from "../hooks/auth";
import PageLink from "../components/common/pageLink";
import { Text } from "@chakra-ui/react";

const Home: NextPage = () => {
  useIsLogin("/home");

  return (
    <>
      <Head>
        <title>Top</title>
      </Head>
      <Box
        h={{
          base: "300px",
          sm: "700px",
          xl: "850px",
        }}
        w="100%"
        bgImage="/images/bg4.jpg"
        bgRepeat="no-repeat"
        bgSize="cover"
        position="relative"
      >
        <GuestLoginLink />
        <Box position="absolute" top="18px" left={{ base: "30px", md: "30px" }}>
          <Image src="/images/logo.png" width="260px" height="37px" />
        </Box>
        <Box
          position="absolute"
          top="20px"
          right={{ base: "180px", md: "260px" }}
        >
          <PageLink href="/login">
            <Text
              fontSize={{ base: "14px", md: "20px" }}
              color="blue.500"
              fontWeight="semibold"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              ログイン
            </Text>
          </PageLink>
        </Box>
        <Introduction />
      </Box>
    </>
  );
};

export default Home;
