import type { NextPage } from "next";
import { Box, HStack } from "@chakra-ui/react";
import PageLink from "./pageLink";

const Header: NextPage = () => {
  return (
    <>
      <Box bg="tomato" p={1}>
        <HStack spacing={10} justify="center">
          <PageLink href="/input" color="whiteAlpha.800">
            入力
          </PageLink>
          <PageLink href="/total" color="whiteAlpha.800">
            合計
          </PageLink>
          <PageLink href="/simulate/expense" color="whiteAlpha.800">
            シミュレート
          </PageLink>
        </HStack>
      </Box>
    </>
  );
};

export default Header;
