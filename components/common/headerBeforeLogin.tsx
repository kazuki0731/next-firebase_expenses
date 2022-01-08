import type { NextPage } from "next";
import { Box, HStack, Button, Text } from "@chakra-ui/react";
import PageLink from "./pageLink";
import Link from "next/link";
import { Image } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../hooks/authProvider";

const HeaderBeforeLogin: NextPage = () => {
  const { loginUser } = useContext(AuthContext);
  return (
    <>
      <Box bg="#fff">
        <Box m="0 auto" py="5px" position="relative" w="95%">
          <HStack justify={{ base: "flex-start", md: "center" }}>
            <Link href={loginUser ? "/home" : "/"} passHref>
              <Image
                src="/images/sample-logo.jpg"
                width={{ base: 100, md: 150 }}
                height={{ base: 30, md: 50 }}
                alt="logo"
                cursor="pointer"
              />
            </Link>
          </HStack>
          <Box
            position="absolute"
            top="50%"
            right="0%"
            transform="translateY(-50%)"
          >
            <HStack spacing={3}>
              <PageLink href="/signup">
                <Button
                  w={{ base: "60px", md: "100px" }}
                  h={{ base: "30px", md: "45px" }}
                  bg="blue.200"
                  fontSize={{ base: "12px", md: "18px" }}
                >
                  新規登録
                </Button>
              </PageLink>
              <PageLink href="/login">
                <Button
                  w={{ base: "60px", md: "100px" }}
                  h={{ base: "30px", md: "45px" }}
                  bg="blue.200"
                  fontSize={{ base: "12px", md: "18px" }}
                >
                  ログイン
                </Button>
              </PageLink>
            </HStack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HeaderBeforeLogin;
