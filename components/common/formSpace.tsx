import { Box, Flex } from "@chakra-ui/layout";
import { NextPage } from "next";
import { useContext } from "react";
import { DataContext } from "../../hooks/dataProvider";
import { Children } from "../../models/interface";

const FormSpace: NextPage<Children> = ({ children }) => {
  const { isLarger } = useContext(DataContext);
  return (
    <Flex justify="center">
      <Box
        w={isLarger ? "420px" : "300px"}
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
