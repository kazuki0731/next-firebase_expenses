import { Box } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Children } from "../../models/interface";

const Container: NextPage<Children> = ({ children }) => {
  return (
    <Box bg="#fff" w="90%" m="0 auto" padding={4}>
      {children}
    </Box>
  );
};

export default Container;
