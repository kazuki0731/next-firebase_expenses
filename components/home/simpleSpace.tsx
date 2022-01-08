import { Box, Flex, Text } from "@chakra-ui/layout";
import { NextPage } from "next";

interface Props {
  children: React.ReactNode;
  text: string;
}

const SimpleSpace: NextPage<Props> = ({ children, text }) => {
  return (
    <Flex justify="center">
      <Box
        w={{ base: "300px", md: "400px" }}
        h={{ base: "340px", md: "360px" }}
        p="10px 25px"
        bg="#fff"
        border="1px solid #aaa"
      >
        <Text bg="blue.100" my="5px">
          {text}
        </Text>
        {children}
      </Box>
    </Flex>
  );
};

export default SimpleSpace;
