import { FormControl } from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { NextPage } from "next";

interface Props {
  register: any;
}

const IncomeForm: NextPage<Props> = (props) => {
  const { register } = props;
  return (
    <VStack spacing={3}>
      <FormControl id="salary">
        <InputGroup>
          <InputLeftAddon>給料</InputLeftAddon>
          <Input type="number" bg="white" {...register("salary")} />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="otherIncome1">
        <InputGroup>
          <InputLeftAddon>その他</InputLeftAddon>
          <Input type="text" bg="white" placeholder="カテゴリ" />
          <Input type="number" bg="white" {...register("otherIncome1")} />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="otherIncome2">
        <InputGroup>
          <InputLeftAddon>その他</InputLeftAddon>
          <Input type="text" bg="white" placeholder="カテゴリ" />
          <Input type="number" bg="white" {...register("otherIncome2")} />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
    </VStack>
  );
};

export default IncomeForm;
