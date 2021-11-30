import type { NextPage } from "next";
import { Box, HStack, Button } from "@chakra-ui/react";
import PageLink from "./pageLink";
import { Logout } from "../../hooks/clickEvent";
import Link from "next/link";
import { Image } from "@chakra-ui/react";

const Header: NextPage = () => {
  const { currentUser, clickLogout } = Logout();
  return (
    <>
      <Box p={1} bg="#fff">
        <Box w="97%" m="0 auto">
          <HStack justify="space-between">
            <HStack spacing={7}>
              <Link href="/" passHref>
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

            {currentUser ? (
              <Button
                bg="blue.200"
                _hover={{ bg: "blue.100" }}
                onClick={clickLogout}
              >
                ログアウト
              </Button>
            ) : (
              <PageLink href="/login">
                <Button>ログイン</Button>
              </PageLink>
            )}
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default Header;
