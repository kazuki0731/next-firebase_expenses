import { Box } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Props } from "../models";
import Header from "./header";

const Container: NextPage<Props> = ({ children }) => {
  return (
    <Box 
      bg="blackAlpha.200"
      w="80%"
      m="0 auto"
      padding={4}
      // minH="80vh"
      borderRadius={10}
    >
      {children}
    </Box>
  );
};

export default Container;
