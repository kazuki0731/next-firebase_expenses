import { Text, Box } from "@chakra-ui/layout";
import React, { useContext } from "react";
import { AuthContext } from "../hooks/authProvider";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import HeaderBeforeLogin from "../components/common/headerBeforeLogin";

const Top = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser ? (
        <>
          <HeaderAfterLogin />
          <Text>Top（ログイン後の画面）</Text>
        </>
      ) : (
        <>
          <HeaderBeforeLogin />
          <Text mt={5}>会員専用ページです</Text>
        </>
      )}
    </>
  );
};

export default Top;
