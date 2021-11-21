import type { NextPage } from "next";
import { Box, HStack, Button } from "@chakra-ui/react";
import PageLink from "./pageLink";
import { Logout } from "../../hooks/clickEvent";

const Header: NextPage = () => {
  const { currentUser, clickLogout } = Logout();
  return (
    <>
      <Box bg="tomato" p={1}>
        <Box w="90%" m="0 auto">
          <HStack justify="space-between">
            <HStack spacing={10}>
              <PageLink
                underline="underLine"
                href="/input"
                color="whiteAlpha.800"
              >
                入力
              </PageLink>
              <PageLink
                underline="underLine"
                href="/detail"
                color="whiteAlpha.800"
              >
                詳細
              </PageLink>
              <PageLink
                underline="underLine"
                href="/overall"
                color="whiteAlpha.800"
              >
                全体
              </PageLink>
            </HStack>

            {currentUser ? (
              <Button onClick={clickLogout}>ログアウト</Button>
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
