import { Box, Text } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Dispatch, SetStateAction, useContext } from "react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { DataContext } from "../../hooks/dataProvider";
import { AllGoalData } from "../../models/interface";
import ExpenseForm from "./expenseForm";
import GoalButtons from "./goalButtons";
import IncomeForm from "./incomeForm";

interface Props {
  isExpense: boolean;
  goalExpenses: number;
  goalIncomes: number;
  register: UseFormRegister<AllGoalData>;
  handleSubmit: UseFormHandleSubmit<AllGoalData>;
  submitData: (data: AllGoalData, month: number) => Promise<void>;
  setIsExpense: Dispatch<SetStateAction<boolean>>;
}

const GoalDataForm: NextPage<Props> = ({
  isExpense,
  goalExpenses,
  goalIncomes,
  register,
  handleSubmit,
  submitData,
  setIsExpense,
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
        {isExpense ? "支出合計: " + goalExpenses : "収入合計: " + goalIncomes}円
      </Text>
      <GoalButtons
        handleSubmit={handleSubmit}
        submitData={submitData}
        isExpense={isExpense}
        setIsExpense={setIsExpense}
      />
    </Box>
  );
};

export default GoalDataForm;
