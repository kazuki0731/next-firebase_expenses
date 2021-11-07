import type { NextPage } from "next";
import { Box, HStack, Button } from "@chakra-ui/react";
import PageLink from "./pageLink";
import { onAuthStateChanged, signOut } from "@firebase/auth";

import { auth } from "../src/firebase";
import router from "next/router";
import { useContext } from "react";
import { AuthContext } from "../hooks/authProvider";

const Header: NextPage = () => {
  const { currentUser, setCurrentUser } = useContext<any>(AuthContext);
  const clickLogout = () => {
    signOut(auth);
    setCurrentUser(null);
    router.push("/login");
  };
  return (
    <>
      <Box bg="tomato" p={1}>
        <HStack spacing={10} justify="center">
          <PageLink underline="underLine" href="/input" color="whiteAlpha.800">
            入力
          </PageLink>
          <PageLink underline="underLine" href="/detail" color="whiteAlpha.800">
            詳細
          </PageLink>
          <PageLink underline="underLine" href="/graph" color="whiteAlpha.800">
            グラフ
          </PageLink>
          {currentUser ? (
            <Button onClick={clickLogout}>ログアウト</Button>
          ) : (
            <PageLink href="/login" >
              <Button>ログイン</Button>
            </PageLink>
          )}
        </HStack>
      </Box>
    </>
  );
};

export default Header;
