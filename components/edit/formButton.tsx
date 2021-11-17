import { Button } from "@chakra-ui/button";
import { HStack } from "@chakra-ui/layout";
import { NextPage } from "next";
import { MouseEventHandler } from "react";

interface Props {
  clickBack: MouseEventHandler<HTMLButtonElement>;
}

const FormButton: NextPage<Props> = ({ clickBack }) => {
  return (
    <HStack>
      <Button type="submit">変更する</Button>
      <Button onClick={clickBack}>戻る</Button>
    </HStack>
  );
};

export default FormButton;
