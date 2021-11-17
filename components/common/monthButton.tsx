import { Button } from "@chakra-ui/button";
import { NextPage } from "next";
import React, { MouseEventHandler, useContext } from "react";
import { DataContext } from "../../hooks/dataProvider";

interface Props {
  children: React.ReactNode;
  clickHandle: MouseEventHandler<HTMLButtonElement>;
}

const MonthButton: NextPage<Props> = ({ children, clickHandle }) => {
  const { isLarger } = useContext(DataContext)

  return (
    <Button
      w={isLarger ? "120px" : "80px"}
      h={isLarger ? "40px" : "30px"}
      fontSize={isLarger ? "18px" : "12px"}
      bg="blue.300"
      _hover={{ bg: "blue.200" }}
      onClick={clickHandle}
    >
      {children}
    </Button>
  );
};

export default MonthButton;
