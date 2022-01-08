import { Button } from "@chakra-ui/button";
import { HStack } from "@chakra-ui/layout";
import { NextPage } from "next";
import React from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { ExpenseData } from "../../models/interface";

interface Props {
  handleSubmit: UseFormHandleSubmit<ExpenseData>;
  changeBalanceData: (data: ExpenseData, month: number) => Promise<void>;
  nowMonth: number;
}

const GoalButtons: NextPage<Props> = ({
  handleSubmit,
  changeBalanceData,
  nowMonth,
}) => {
  return (
    <HStack justify="center">
      <Button
        w={{ base: "80px", md: "110px" }}
        h={{ base: "32px", md: "45px" }}
        fontSize={{ base: "12px", md: "16px" }}
        type="submit"
        onClick={handleSubmit((data) => changeBalanceData(data, nowMonth))}
      >
        変更を保存
      </Button>
    </HStack>
  );
};

export default GoalButtons;
