import { NextPage } from "next";
import { Heading } from "@chakra-ui/layout";
import { Props } from "../models/interface";

const TitleText: NextPage<Props> = ({ children }) => {
  return (
    <Heading as="h2" m={2}>
      {children}
    </Heading>
  );
};

export default TitleText;
