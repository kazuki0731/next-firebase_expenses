import type { NextPage } from "next";
import { Box, HStack, Button, Text } from "@chakra-ui/react";
import PageLink from "./pageLink";
import Link from "next/link";
import { Image } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../hooks/provider/authProvider";
import { useAuth } from "../../hooks/auth";
import { MenuContext } from "../../hooks/provider/menuProvider";

const HeaderAfterLogin: NextPage = () => {
  const { logout } = useAuth();
  const { loginUser } = useContext(AuthContext);
  const { currentMenu } = useContext(MenuContext);
  return (
    <>
      <Box py="5px" mb="10px" bg="#fff">
        <HStack justify="space-between" w="90%" m="0 auto">
          <HStack>
            <Link href={loginUser ? "/home" : "/"} passHref>
              <Image
                src="/images/logo.png"
                width={{ base: "130px", md: "200px" }}
                height={{ base: "23px", md: "32px" }}
                alt="logo"
                cursor="pointer"
              />
            </Link>
          </HStack>
          <HStack spacing={6}>
            {loginUser && (
              <Text
                fontWeight="semibold"
                fontSize={{ base: "12px", md: "18px" }}
                display="inline"
              >
                {loginUser.displayName || "ゲスト"}さん
              </Text>
            )}
            <Button
              w={{ base: "80px", md: "120px" }}
              h={{ base: "30px", md: "45px" }}
              fontSize={{ base: "12px", md: "18px" }}
              bg="blue.200"
              _hover={{ bg: "blue.100" }}
              onClick={logout}
            >
              ログアウト
            </Button>
          </HStack>
        </HStack>

        <HStack spacing={{ base: "20px", md: "50px" }} w="90%" m="10px auto 0">
          <PageLink href="/home" color="blackAlpha.700">
            <Text
              textDecoration={currentMenu === "/home" ? "underline" : "none"}
            >
              ホーム
            </Text>
          </PageLink>
          <PageLink href="/input" color="blackAlpha.700">
            <Text
              textDecoration={currentMenu === "/input" ? "underline" : "none"}
            >
              入力
            </Text>
          </PageLink>
          <PageLink href="/calendar" color="blackAlpha.700">
            <Text
              textDecoration={
                currentMenu === "/calendar" ? "underline" : "none"
              }
            >
              カレンダー
            </Text>
          </PageLink>
          <PageLink href="/list" color="blackAlpha.700">
            <Text
              textDecoration={currentMenu === "/list" ? "underline" : "none"}
            >
              一覧
            </Text>
          </PageLink>
          <PageLink href="/goal" color="blackAlpha.700">
            <Text
              textDecoration={currentMenu === "/goal" ? "underline" : "none"}
            >
              目標
            </Text>
          </PageLink>
          <PageLink href="/total" color="blackAlpha.700">
            <Text
              textDecoration={currentMenu === "/total" ? "underline" : "none"}
            >
              トータル
            </Text>
          </PageLink>
        </HStack>
      </Box>
    </>
  );
};

export default HeaderAfterLogin;
