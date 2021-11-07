import { FormControl } from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/input";
import { Icon } from "@chakra-ui/react";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoIosBasket } from "react-icons/io";
import { ImHome } from "react-icons/im";
import { BsFillLightbulbFill } from "react-icons/bs";
import { RiPsychotherapyFill } from "react-icons/ri";
import { VStack } from "@chakra-ui/layout";
import { NextPage } from "next";

interface Props {
  register: any;
}

const ExpenseForm: NextPage<Props> = ({ register }) => {
  return (
    <VStack spacing={2} w="90%" m="0 auto">
      <FormControl id="daily">
        <InputGroup>
          <InputLeftAddon fontSize="20px">
            <Icon as={IoIosBasket} color="green.500" />
            日用品
          </InputLeftAddon>
          <Input
            fontSize="20px"
            type="number"
            bg="white"
            {...register("daily")}
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="food">
        <InputGroup>
          <InputLeftAddon fontSize="20px">
            <Icon as={IoFastFoodOutline} color="green.500" />
            食費
          </InputLeftAddon>
          <Input
            fontSize="20px"
            type="number"
            bg="white"
            {...register("food")}
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="rent">
        <InputGroup>
          <InputLeftAddon fontSize="20px">
            <Icon as={ImHome} color="green.500" />
            家賃
          </InputLeftAddon>
          <Input
            fontSize="20px"
            type="number"
            bg="white"
            {...register("rent")}
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="util">
        <InputGroup>
          <InputLeftAddon fontSize="20px">
            <Icon as={BsFillLightbulbFill} color="green.500" />
            光熱費
          </InputLeftAddon>
          <Input
            fontSize="20px"
            type="number"
            bg="white"
            {...register("util")}
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="otherExpense">
        <InputGroup>
          <InputLeftAddon fontSize="20px">
            <Icon as={RiPsychotherapyFill} color="green.500" />
            その他
          </InputLeftAddon>
          <Input
            fontSize="20px"
            type="number"
            bg="white"
            {...register("otherExpense")}
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
    </VStack>
  );
};

export default ExpenseForm;
