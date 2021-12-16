import type { NextPage } from "next";
import { Box, HStack, Button, Text } from "@chakra-ui/react";
import PageLink from "./pageLink";
import Link from "next/link";
import { Image } from "@chakra-ui/react";

const HeaderBeforeLogin: NextPage = () => {
  return (
    <>
      <Box p={1} bg="#fff" position="relative">
        <HStack justify="center">
          <Link href="/top" passHref>
            <Image
              src="/images/sample-logo.jpg"
              width={160}
              height={50}
              alt="logo"
              cursor="pointer"
            />
          </Link>
        </HStack>
        <Box
          position="absolute"
          top="50%"
          right="1%"
          transform="translateY(-50%)"
        >
          <HStack spacing={3}>
            <PageLink href="/signup">
              <Button bg="blue.200">新規登録</Button>
            </PageLink>
            <PageLink href="/login">
              <Button bg="blue.200" _hover={{ bg: "blue.100" }}>
                ログイン
              </Button>
            </PageLink>
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default HeaderBeforeLogin;
