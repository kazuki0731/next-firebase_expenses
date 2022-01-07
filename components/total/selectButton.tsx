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
      fontWeight={selectedBalance === text ? "bold" : "normal"}
      onClick={() => changeBalance(text)}
    >
      {text}
    </Button>
  );
};

export default SelectButton;
