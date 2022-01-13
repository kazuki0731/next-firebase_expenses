import type { NextPage } from "next";
import { Box, HStack, Button, Text } from "@chakra-ui/react";
import PageLink from "./pageLink";
import Link from "next/link";
import { Image } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../hooks/provider/authProvider";

const HeaderBeforeLogin: NextPage = () => {
  const { loginUser } = useContext(AuthContext);
  return (
    <>
      <Box bg="#fff" py="10px">
        <Box m="0 auto" w="95%">
          <HStack justify="space-between">
            <Link href={loginUser ? "/home" : "/"}>
              <Image
                src="/images/logo.png"
                width={{ base: "130px", md: "200px" }}
                height={{ base: "25px", md: "32px" }}
                alt="logo"
                cursor="pointer"
              />
            </Link>
            <Box>
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
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default HeaderBeforeLogin;
