import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import PageLink from "../common/pageLink";

const Introduction = () => {
  return (
    <Box
      position="absolute"
      top="37%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Text textAlign="left" fontSize={{ base: "16px", md: "24px" }}>
        ここにアプリの説明文が入りますここにアプリの説明文が入りますここにアプリの説明文が入りますここにアプリの説明文が入ります
      </Text>
      <PageLink href="/signup">
        <Button
          borderRadius="4px"
          fontSize={{ base: "14px", md: "22px" }}
          w={{ base: "90px", md: "170px" }}
          h={{ base: "50px", md: "70px" }}
          m="10px auto"
          bg="blue.200"
        >
          新規登録
        </Button>
      </PageLink>
    </Box>
  );
};

export default Introduction;
