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
import { UseFormRegister } from "react-hook-form";
import { AllGoalData } from "../../models/interface";
import { DataContext } from "../../hooks/provider/dataProvider";
import { useContext } from "react";

interface Props {
  register: UseFormRegister<AllGoalData>;
}

const ExpenseForm: NextPage<Props> = ({ register }) => {
  const { isLarger } = useContext(DataContext);

  return (
    <VStack spacing={2} w="90%" m="0 auto">
      <FormControl id="daily">
        <InputGroup>
          <InputLeftAddon fontSize={isLarger ? "20px" : "16px"}>
            <Icon as={IoIosBasket} color="green.500" />
            日用品
          </InputLeftAddon>
          <Input
            fontSize={isLarger ? "20px" : "16px"}
            type="number"
            bg="white"
            {...register("daily")}
            textAlign="right"
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="food">
        <InputGroup>
          <InputLeftAddon fontSize={isLarger ? "20px" : "16px"}>
            <Icon as={IoFastFoodOutline} color="green.500" />
            食費
          </InputLeftAddon>
          <Input
            fontSize={isLarger ? "20px" : "16px"}
            type="number"
            bg="white"
            {...register("food")}
            textAlign="right"
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="rent">
        <InputGroup>
          <InputLeftAddon fontSize={isLarger ? "20px" : "16px"}>
            <Icon as={ImHome} color="green.500" />
            家賃
          </InputLeftAddon>
          <Input
            fontSize={isLarger ? "20px" : "16px"}
            type="number"
            bg="white"
            {...register("rent")}
            textAlign="right"
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="util">
        <InputGroup>
          <InputLeftAddon fontSize={isLarger ? "20px" : "16px"}>
            <Icon as={BsFillLightbulbFill} color="green.500" />
            光熱費
          </InputLeftAddon>
          <Input
            fontSize={isLarger ? "20px" : "16px"}
            type="number"
            bg="white"
            {...register("util")}
            textAlign="right"
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="otherExpense">
        <InputGroup>
          <InputLeftAddon fontSize={isLarger ? "20px" : "16px"}>
            <Icon as={RiPsychotherapyFill} color="green.500" />
            その他
          </InputLeftAddon>
          <Input
            fontSize={isLarger ? "20px" : "16px"}
            type="number"
            bg="white"
            {...register("otherExpense")}
            textAlign="right"
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
    </VStack>
  );
};

export default ExpenseForm;
