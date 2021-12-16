import { Button } from "@chakra-ui/button";
import { NextPage } from "next";
import { MouseEventHandler } from "react";

interface Props {
  children: React.ReactNode;
  disabled: boolean;
  clickHandle: MouseEventHandler<HTMLButtonElement>;
}

const InputDataButton: NextPage<Props> = ({
  children,
  disabled,
  clickHandle,
}) => {
  return (
    <Button
      w={{ base: "80px", md: "130px" }}
      h={{ base: "30px", md: "45px" }}
      fontSize={{ base: "12px", md: "18px" }}
      disabled={disabled}
      onClick={clickHandle}
    >
      {children}
    </Button>
  );
};

export default InputDataButton;
