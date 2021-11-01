import Head from "next/head";
import type { NextPage } from "next";
import Container from "../components/container";
import TitleText from "../components/titleText";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Top</title>
      </Head>
      <TitleText>Top</TitleText>
    </>
  );
};

export default Home;
