import React from "react";
import { Box, Image } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Box position="absolute" top="18px" left={{ base: "10px", md: "30px" }}>
      <Image
        src="/images/logo.png"
        width={{ base: "130px", md: "260px" }}
        height={{ base: "23px", md: "32px" }}
      />
    </Box>
  );
};

export default Logo;
