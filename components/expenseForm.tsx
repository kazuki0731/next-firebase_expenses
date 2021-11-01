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

const ExpenseForm: NextPage<Props> = ({ register }) => {
  return (
    <VStack spacing={3}>
      <FormControl id="daily">
        <InputGroup>
          <InputLeftAddon>日用品</InputLeftAddon>
          <Input
            type="number"
            bg="white"
            placeholder="金額"
            {...register("daily")}
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="food">
        <InputGroup>
          <InputLeftAddon>食費</InputLeftAddon>
          <Input
            type="number"
            bg="white"
            placeholder="金額"
            {...register("food")}
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="rent">
        <InputGroup>
          <InputLeftAddon>家賃</InputLeftAddon>
          <Input
            type="number"
            bg="white"
            placeholder="金額"
            {...register("rent")}
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="util">
        <InputGroup>
          <InputLeftAddon>光熱費</InputLeftAddon>
          <Input
            type="number"
            bg="white"
            placeholder="金額"
            {...register("util")}
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="otherExpense1">
        <InputGroup>
          <InputLeftAddon>その他</InputLeftAddon>
          <Input type="text" bg="white" placeholder="カテゴリ名" />
          <Input
            type="number"
            bg="white"
            placeholder="金額"
            {...register("otherExpense1")}
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="otherExpense2">
        <InputGroup>
          <InputLeftAddon>その他</InputLeftAddon>
          <Input type="text" bg="white" placeholder="カテゴリ" />
          <Input
            type="number"
            bg="white"
            placeholder="金額"
            {...register("otherExpense2")}
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
    </VStack>
  );
};

export default ExpenseForm;
