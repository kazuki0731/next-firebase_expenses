import type { NextPage } from "next";
import { Box, HStack, Button, Text } from "@chakra-ui/react";
import PageLink from "./pageLink";
import Link from "next/link";
import { Image } from "@chakra-ui/react";

const HeaderBeforeLogin: NextPage = () => {
  return (
    <>
      <Box bg="#fff">
        <Box m="0 auto" py="5px" position="relative" w="95%">
          <HStack justify="center">
            <Link href="/home" passHref>
              <Image
                src="/images/sample-logo.jpg"
                width={{base: 100, md: 150}}
                height={{base: 30, md: 50}}
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
      </Box>
    </>
  );
};

export default HeaderBeforeLogin;
