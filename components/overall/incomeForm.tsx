import { FormControl } from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/input";
import { Icon } from "@chakra-ui/react";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { RiPsychotherapyFill } from "react-icons/ri";
import { VStack } from "@chakra-ui/layout";
import { NextPage } from "next";
import { UseFormRegister } from "react-hook-form";
import { AllGoalData } from "../../models/interface";

interface Props {
  register: UseFormRegister<AllGoalData>;
}

const IncomeForm: NextPage<Props> = ({ register }) => {
  return (
    <VStack spacing={2} w="90%" m="0 auto">
      <FormControl id="salary">
        <InputGroup>
          <InputLeftAddon
            w={{ base: "110px", md: "130px" }}
            fontSize={{ base: "16px", md: "20px" }}
          >
            <Icon as={FaRegMoneyBillAlt} color="green.500" />
            給料
          </InputLeftAddon>
          <Input
            fontSize={{ base: "16px", md: "20px" }}
            required
            type="number"
            bg="white"
            {...register("salary")}
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="otherIncome">
        <InputGroup>
          <InputLeftAddon
            w={{ base: "110px", md: "130px" }}
            fontSize={{ base: "16px", md: "20px" }}
          >
            <Icon as={RiPsychotherapyFill} color="green.500" />
            その他
          </InputLeftAddon>
          <Input
            fontSize={{ base: "16px", md: "20px" }}
            type="number"
            bg="white"
            {...register("otherIncome")}
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
    </VStack>
  );
};

export default IncomeForm;
