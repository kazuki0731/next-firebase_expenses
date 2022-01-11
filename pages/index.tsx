import Head from "next/head";
import type { NextPage } from "next";
import HeaderBeforeLogin from "../components/common/headerBeforeLogin";
import { Box } from "@chakra-ui/layout";
import GuestLoginLink from "../components/common/guestLoginLink";
import Introduction from "../components/top/introduction";
import { useIsLogin } from "../hooks/auth";

const Home: NextPage = () => {
  useIsLogin("/home");

  return (
    <Box w="100vw" h="90vh" minH="700px" position="relative">
      <Head>
        <title>Top</title>
      </Head>
      <HeaderBeforeLogin />
      <GuestLoginLink />
      <Introduction />
    </Box>
  );
};

export default Home;
