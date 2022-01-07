import { Box, Flex } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Children } from "../../models/interface";

const FormSpace: NextPage<Children> = ({ children }) => {
  return (
    <Flex justify="center">
      <Box
        w={{ base: "300px", md: "420px" }}
        mt="10px"
        p="20px"
        bg="#fff"
        border="1px solid #aaa"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default FormSpace;
