import type { NextPage } from "next";
import { Box, HStack, Button, Text } from "@chakra-ui/react";
import PageLink from "./pageLink";
import Link from "next/link";
import { Image } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../hooks/provider/authProvider";
import { useAuth } from "../../hooks/auth";

const HeaderAfterLogin: NextPage = () => {
  const { logout } = useAuth();
  const { loginUser } = useContext(AuthContext);
  return (
    <>
      <Box py="5px" mb="10px" bg="#fff">
        <HStack justify="space-between" w="90%" m="0 auto">
          <HStack>
            <Link href={loginUser ? "/home" : "/"} passHref>
              <Image
                src="/images/logo.png"
                width={{ base: "130px", md: "200px" }}
                height={{ base: "25px", md: "32px" }}
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
          <PageLink underline="underLine" href="/home" color="blackAlpha.700">
            ホーム
          </PageLink>
          <PageLink underline="underLine" href="/input" color="blackAlpha.700">
            入力
          </PageLink>
          <PageLink
            underline="underLine"
            href="/calendar"
            color="blackAlpha.700"
          >
            カレンダー
          </PageLink>
          <PageLink underline="underLine" href="/detail" color="blackAlpha.700">
            詳細
          </PageLink>
          <PageLink underline="underLine" href="/goal" color="blackAlpha.700">
            目標
          </PageLink>
          <PageLink underline="underLine" href="/total" color="blackAlpha.700">
            トータル
          </PageLink>
        </HStack>
      </Box>
    </>
  );
};

export default HeaderAfterLogin;
