import Head from "next/head";
import type { NextPage } from "next";
import TitleText from "../components/common/titleText";

import { useContext } from "react";
import { AuthContext } from "../hooks/provider/authProvider";

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
