import { HStack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../../hooks/authProvider";

const GuestLoginLink = () => {
  const { loginAsGuest } = useContext(AuthContext);
  return (
    <HStack m="0 auto" justify="flex-end">
      <Text
        mr="30px"
        textDecoration="underline"
        fontSize={{ base: "14px", md: "19px" }}
        fontWeight="semibold"
        cursor="pointer"
        _hover={{ opacity: 0.7 }}
        onClick={loginAsGuest}
      >
        ゲストユーザーログイン
      </Text>
    </HStack>
  );
};

export default GuestLoginLink;
