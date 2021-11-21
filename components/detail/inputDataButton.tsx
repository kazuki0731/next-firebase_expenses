import { Button } from "@chakra-ui/button";
import { NextPage } from "next";
import { MouseEventHandler, useContext } from "react";
import { DataContext } from "../../hooks/dataProvider";

interface Props {
  children: React.ReactNode;
  disabled: boolean;
  clickHandle: MouseEventHandler<HTMLButtonElement>;
}

const InputDataButton: NextPage<Props> = ({ children, disabled, clickHandle }) => {
  const { isLarger } = useContext(DataContext);

  return (
    <Button
      w={isLarger ? "130px" : "80px"}
      h={isLarger ? "45px" : "30px"}
      fontSize={isLarger ? "18px" : "12px"}
      disabled={disabled}
      onClick={clickHandle}
    >
      {children}
    </Button>
  );
};

export default InputDataButton;
