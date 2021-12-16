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
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Box p={1} bg="#fff">
        <Box w="97%" m="0 auto">
          <HStack justify="space-between">
            <HStack spacing={7}>
              <Link href="/top" passHref>
                <Image
                  src="/images/sample-logo.jpg"
                  width={150}
                  height={50}
                  alt="logo"
                  cursor="pointer"
                />
              </Link>
              <PageLink
                underline="underLine"
                href="/input"
                color="blackAlpha.700"
              >
                入力
              </PageLink>
              <PageLink
                underline="underLine"
                href="/detail"
                color="blackAlpha.700"
              >
                詳細
              </PageLink>
              <PageLink
                underline="underLine"
                href="/overall"
                color="blackAlpha.700"
              >
                全体
              </PageLink>
            </HStack>
            <HStack spacing={6}>
              <Text fontWeight="semibold" fontSize="20px" display="inline">
                {currentUser?.displayName} さん
              </Text>
              <Button
                bg="blue.200"
                _hover={{ bg: "blue.100" }}
                onClick={clickLogout}
              >
                ログアウト
              </Button>
            </HStack>
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default HeaderAfterLogin;
