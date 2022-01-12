import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import PageLink from "../common/pageLink";

const Introduction = () => {
  return (
    <Box
      w={{ base: "300px", md: "600px" }}
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <PageLink href="/signup">
        <Button
          borderRadius="3px"
          color="#fff"
          fontSize={{ base: "14px", md: "22px" }}
          w={{ base: "90px", md: "170px" }}
          h={{ base: "50px", md: "70px" }}
          m="10px auto"
          bg="linear-gradient(blue, pink)"
          _hover={{ opacity: 0.85 }}
        >
          新規登録
        </Button>
      </PageLink>
      <Text
        textAlign="left"
        fontWeight="bold"
        color="purple"
        fontFamily="serif"
        fontSize={{ base: "20px", md: "34px" }}
      >
        ここにアプリの説明文が入りますここにアプリの説明文が入りますここにアプリの説明文が入ります
      </Text>
    </Box>
  );
};

export default Introduction;
