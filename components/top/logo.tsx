import React from "react";
import Image from "next/image";
import { Box } from "@chakra-ui/react";


const Logo = () => {
  return (
    <Box position="absolute" top="18px" left={{ base: "30px", md: "30px" }}>
      <Image src="/images/logo.png" width="260px" height="37px" />
    </Box>
  );
};

export default Logo;
