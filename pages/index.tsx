import Head from "next/head";
import type { NextPage } from "next";
import PageLink from "../components/common/pageLink";
import HeaderBeforeLogin from "../components/common/headerBeforeLogin";
import { Box, Text, HStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import GuestLoginLink from "../components/common/guestLoginLink";
import useIsLogin from "../hooks/useTest";
import Introduction from "../components/top/introduction";

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
