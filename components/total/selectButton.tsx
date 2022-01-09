import { Button, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";

interface Props {
  text: string;
  selectedBalance: string;
  changeBalance: (text: string) => void;
}

const SelectButton: NextPage<Props> = ({
  text,
  changeBalance,
  selectedBalance,
}) => {
  return (
    <Button
      cursor="pointer"
      w={{base: "45px", md: "60px"}}
      h={{base: "30px", md: "40px"}}
      fontSize={{base: "14px", md: "18px"}}
      fontWeight={selectedBalance === text ? "bold" : "normal"}
      onClick={() => changeBalance(text)}
    >
      {text}
    </Button>
  );
};

export default SelectButton;
