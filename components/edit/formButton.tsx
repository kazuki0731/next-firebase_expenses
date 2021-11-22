import { Button } from "@chakra-ui/button";
import { HStack } from "@chakra-ui/layout";
import { NextPage } from "next";
import { MouseEventHandler } from "react";

interface Props {
  clickBack: MouseEventHandler<HTMLButtonElement>;
}

const FormButton: NextPage<Props> = ({ clickBack }) => {
  return (
    <HStack w="100%" justify="center">
      <Button w="50%" type="submit">
        変更する
      </Button>
      <Button w="50%" onClick={clickBack}>
        戻る
      </Button>
    </HStack>
  );
};

export default FormButton;
