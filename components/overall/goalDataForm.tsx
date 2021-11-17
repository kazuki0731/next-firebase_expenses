import { Box, Text } from "@chakra-ui/layout";
import { NextPage } from "next";
import { useContext } from "react";
import { UseFormRegister } from "react-hook-form";
import { DataContext } from "../../hooks/dataProvider";
import { AllGoalData } from "../../models/interface";
import ExpenseForm from "./expenseForm";
import IncomeForm from "./incomeForm";

interface Props {
  isExpense: boolean;
  goalExpenses: number;
  goalIncomes: number;
  register: UseFormRegister<AllGoalData>;
}

const GoalDataForm: NextPage<Props> = ({
  isExpense,
  goalExpenses,
  goalIncomes,
  register,
}) => {
  const { isLarger } = useContext(DataContext);
  return (
    <Box w={isLarger ? "50%" : "100%"}>
      <Text mb={2}>{isExpense ? "目標" : "収入"}</Text>
      <form>
        {isExpense ? (
          <ExpenseForm register={register} />
        ) : (
          <IncomeForm register={register} />
        )}
      </form>
      <Text
        textAlign="right"
        m="0 auto"
        w="85%"
        fontSize={isLarger ? "22px" : "18px"}
        mt={2}
      >
        合計: {isExpense ? goalExpenses : goalIncomes}円
      </Text>
    </Box>
  );
};

export default GoalDataForm;
