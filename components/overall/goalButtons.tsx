import { Button } from "@chakra-ui/button";
import { HStack } from "@chakra-ui/layout";
import { NextPage } from "next";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { DataContext } from "../../hooks/dataProvider";
import { AllGoalData } from "../../models/interface";

interface Props {
  handleSubmit: UseFormHandleSubmit<AllGoalData>;
  submitData: (data: AllGoalData, month: number) => Promise<void>;
  isExpense: boolean;
  setIsExpense: Dispatch<SetStateAction<boolean>>;
}

const GoalButtons: NextPage<Props> = ({
  handleSubmit,
  submitData,
  isExpense,
  setIsExpense,
}) => {
  const { nowMonth } = useContext(DataContext);
  return (
    <HStack m="10px 0" spacing={10} justify="center">
      <Button
        w={{ base: "80px", md: "110px" }}
        h={{ base: "32px", md: "45px" }}
        fontSize={{ base: "12px", md: "16px" }}
        type="submit"
        onClick={handleSubmit((data) => submitData(data, nowMonth))}
      >
        変更を保存
      </Button>
      <Button
        w={{ base: "80px", md: "110px" }}
        h={{ base: "32px", md: "45px" }}
        fontSize={{ base: "12px", md: "16px" }}
        onClick={() => setIsExpense(!isExpense)}
      >
        支出/収入
      </Button>
    </HStack>
  );
};

export default GoalButtons;
