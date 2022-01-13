import Head from "next/head";
import type { NextPage } from "next";
import { Box } from "@chakra-ui/layout";
import GuestLoginLink from "../components/common/guestLoginLink";
import Introduction from "../components/top/introduction";
import { useIsLogin } from "../hooks/auth";
import LoginTextLink from "../components/top/loginTextLink";
import Logo from "../components/top/logo";

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
        <Logo />
        <LoginTextLink />
        <Introduction />
      </Box>
    </>
  );
};

export default Home;
