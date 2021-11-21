import { Box } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Children } from "../../models/interface";

const Container: NextPage<Children> = ({ children }) => {
  return (
    <Box
      bg="blackAlpha.200"
      w="80%"
      minH="350px"
      m="0 auto"
      padding={4}
      borderRadius={10}
    >
      {children}
    </Box>
  );
};

export default Container;
