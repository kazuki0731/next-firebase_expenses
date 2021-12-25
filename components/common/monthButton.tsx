import { Button } from "@chakra-ui/button";
import { NextPage } from "next";
import React, { MouseEventHandler } from "react";

interface Props {
  children: React.ReactNode;
  clickHandle: MouseEventHandler<HTMLButtonElement>;
}

const MonthButton: NextPage<Props> = ({ children, clickHandle }) => {
  return (
    <Button
      w={{ base: "90px", md: "120px" }}
      h={{ base: "30px", md: "45px" }}
      fontSize={{ base: "12px", md: "18px" }}
      bg="blue.300"
      _hover={{ bg: "blue.200" }}
      onClick={clickHandle}
    >
      {children}
    </Button>
  );
};

export default MonthButton;
