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
      w={{ base: "80px", md: "80px" }}
      h={{ base: "30px", md: "45px" }}
      fontSize={{ base: "12px", md: "18px" }}
      bg="gray.300"
      onClick={clickHandle}
      borderRadius="3px"
    >
      {children}
    </Button>
  );
};

export default MonthButton;
