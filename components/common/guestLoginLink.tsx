import { HStack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../../hooks/provider/authProvider";

const GuestLoginLink = () => {
  const { loginAsGuest } = useContext(AuthContext);
  return (
    <HStack m="20px0 auto" justify="flex-end">
      <Text
        mr={{ base: "10px", md: "35px" }}
        mt="20px"
        fontSize={{ base: "12px", sm: "16px", md: "20px", lg: "24px" }}
        color="blue.500"
        fontWeight="semibold"
        cursor="pointer"
        _hover={{ textDecoration: "underline" }}
        onClick={loginAsGuest}
      >
        登録せずに使ってみる
      </Text>
    </HStack>
  );
};

export default GuestLoginLink;
