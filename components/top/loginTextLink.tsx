import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PageLink from "../common/pageLink";

const LoginTextLink = () => {
  return (
    <Box position="absolute" top="20px" right={{ base: "180px", md: "260px" }}>
      <PageLink href="/login">
        <Text
          fontSize={{ base: "14px", md: "20px" }}
          color="blue.500"
          fontWeight="semibold"
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
        >
          ログイン
        </Text>
      </PageLink>
    </Box>
  );
};

export default LoginTextLink;
