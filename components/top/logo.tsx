import React from "react";
import { Box, Image } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Box position="absolute" top="18px" left={{ base: "10px", md: "30px" }}>
      <Image
        src="/images/logo.png"
        width={{ base: "140px", md: "300px" }}
        height={{ base: "23px", md: "42px" }}
        alt="logo"
      />
    </Box>
  );
};

export default Logo;
