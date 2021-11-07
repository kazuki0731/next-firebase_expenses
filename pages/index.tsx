import Head from "next/head";
import type { NextPage } from "next";
import TitleText from "../components/titleText";

import { useContext } from "react";
import { AuthContext } from "../hooks/authProvider";

const Home: NextPage = () => {
  const { currentUser } = useContext<any>(AuthContext);

  return (
    <>
      <Head>
        <title>Top</title>
      </Head>
      {currentUser && <TitleText>Top</TitleText>}
    </>
  );
};

export default Home;
