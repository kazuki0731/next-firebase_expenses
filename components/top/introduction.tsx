import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import PageLink from "../common/pageLink";
import Logo from "./logo";

const Introduction = () => {
  return (
    <Box
      w={{ base: "300px", md: "600px" }}
      position="absolute"
      top={{ base: "45%", sm: "40%" }}
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Text
        textAlign="center"
        fontWeight="bold"
        color="blue"
        fontFamily="serif"
        fontSize={{ base: "16px", sm: "24px", md: "38px" }}
      >
        カンタン入力で
        <br />
        便利な家計簿アプリ
      </Text>
      <Text
        mb="10px"
        textAlign="center"
        fontWeight="bold"
        color="blue.500"
        fontFamily="serif"
        fontSize={{ base: "10px", sm: "14px", md: "24px" }}
      >
        目標を立てて楽しく記帳
      </Text>
      <PageLink href="/signup">
        <Button
          borderRadius="3px"
          color="#fff"
          fontSize={{ base: "12px", sm: "16px", md: "22px" }}
          w={{ base: "70px", sm: "110px", md: "170px" }}
          h={{ base: "45px", sm: "50px", md: "70px" }}
          m="10px auto"
          bg="linear-gradient(blue, lightblue)"
          _hover={{ opacity: 0.85 }}
        >
          新規登録
        </Button>
      </PageLink>
    </Box>
  );
};

export default Introduction;
