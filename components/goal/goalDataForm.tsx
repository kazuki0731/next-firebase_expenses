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
    <Box w={{ base: "100%", md: "50%" }}>
      <Text mb={2}>目標設定</Text>
      <form>
        <ExpenseForm register={register} />
      </form>
      <Text
        textAlign="right"
        m="0 auto"
        w="85%"
        fontSize={{ base: "18px", md: "22px" }}
        mt={2}
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
