import { Box, Text } from "@chakra-ui/layout";
import { NextPage } from "next";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { ExpenseData } from "../../models/interface";
import ExpenseForm from "./expenseForm";
import GoalButtons from "./goalButtons";

interface Props {
  goalExpenses: number;
  register: UseFormRegister<ExpenseData>;
  handleSubmit: UseFormHandleSubmit<ExpenseData>;
  changeBalanceData: (data: ExpenseData, month: number) => Promise<void>;
  nowMonth: number;
}

const GoalDataForm: NextPage<Props> = ({
  goalExpenses,
  register,
  handleSubmit,
  changeBalanceData,
  nowMonth,
}) => {
  return (
    <Box
      border="1px solid #aaa"
      bg="#fff"
      m="0 auto"
      w={{ base: "85%", sm: "350px", md: "50%", lg: "50%" }}
      h="435px"
    >
      <Text mt="10px" fontSize={{ base: "18px", md: "20px", lg: "22px" }}>
        目標設定
      </Text>
      <ExpenseForm register={register} />
      <Text
        textAlign="right"
        m="0 auto"
        w="85%"
        fontSize={{ base: "18px", md: "19px", lg: "22px" }}
        my={{ base: "10px", md: "5px" }}
      >
        目標合計: {goalExpenses}円
      </Text>
      <GoalButtons
        nowMonth={nowMonth}
        handleSubmit={handleSubmit}
        changeBalanceData={changeBalanceData}
      />
    </Box>
  );
};

export default GoalDataForm;
