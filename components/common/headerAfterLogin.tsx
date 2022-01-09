import type { NextPage } from "next";
import { Box, HStack, Button, Text } from "@chakra-ui/react";
import PageLink from "./pageLink";
import { Logout } from "../../hooks/clickEvent";
import Link from "next/link";
import { Image } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../hooks/authProvider";

const HeaderAfterLogin: NextPage = () => {
  const { clickLogout } = Logout();
  const { loginUser } = useContext(AuthContext);
  return (
    <>
      <Box p={1} pb="5px" mb="10px" bg="rgb(255, 255, 255)">
        <HStack justify="space-between" w="90%" m="0 auto">
          <HStack spacing={7}>
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
              onClick={clickLogout}
            >
              ログアウト
            </Button>
          </HStack>
        </HStack>

        <HStack spacing="50px" w="90%" m="10px auto 0">
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
