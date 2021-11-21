import { Box } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Children } from "../../models/interface";

const FormSpace: NextPage<Children> = ({ children }) => {
  return (
    <Box w={400} bg="blue.300">
      {children}
    </Box>
  );
};

export default FormSpace;
