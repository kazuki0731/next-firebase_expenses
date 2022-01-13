import { useState } from "react";
import {
  getBalanceData,
  updateBalanceData,
} from "../apiCaller/balanceDataQuery";
import { monthlyInputData } from "../apiCaller/inputDataQuery";
import { BalanceDetail, ExpenseData } from "../models/interface";
import { divideData } from "../util/function";

export const useGetGoalData = () => {
  const [goalExpenses, setGoalExpenses] = useState(0);
  const [allBalance, setAllBalance] = useState(0);
  const [expenseDetail, setExpenseDetail] = useState<ExpenseData>({
    daily: 0,
    food: 0,
    traffic: 0,
    enter: 0,
    fixed: 0,
    otherExpense: 0,
    totalExpensePrice: 0,
  });

  const [balanceDetail, setBalanceDetail] = useState<BalanceDetail>({
    dailyBalance: 0,
    foodBalance: 0,
    trafficBalance: 0,
    enterBalance: 0,
    fixedBalance: 0,
    otherBalance: 0,
  });

  // 目標データとカテゴリ別データを取得
  const getInitData = async (year: number, month: number) => {
    const monthlyResult = await monthlyInputData(year, ("0" + month).slice(-2));
    if (!monthlyResult) return;
    const priceDataByCategory = divideData(monthlyResult);

    const goalData = await getBalanceData(month, year, priceDataByCategory);

    if (!goalData) return;
    const { monthlyData, expenseTotal, balanceData } = goalData;
    console.log(expenseTotal);

    setGoalExpenses(expenseTotal);
    setExpenseDetail(priceDataByCategory);
    setAllBalance(expenseTotal - priceDataByCategory.totalExpensePrice);

    setBalanceDetail(balanceData);
    return monthlyData;
  };

  const saveBalanceData = async (
    data: ExpenseData,
    month: number,
    year: number
  ) => {
    let expenseTotal = 0;

    for (let key in data) {
      if (!data[key]) {
        data[key] = 0;
      }
      data[key] = Number(data[key]);
      expenseTotal = expenseTotal + data[key];
    }

    const { daily, food, traffic, enter, fixed, otherExpense } = data;
    const expenseGoalData: ExpenseData = {
      daily: daily | 0,
      food: food | 0,
      traffic: traffic | 0,
      enter: enter | 0,
      fixed: fixed | 0,
      otherExpense: otherExpense | 0,
    };

    const balanceData = await updateBalanceData(
      month,
      year,
      expenseGoalData,
      expenseDetail
    );

    setGoalExpenses(expenseTotal);
    setAllBalance(expenseTotal - expenseDetail.totalExpensePrice);
    if (balanceData) {
      setBalanceDetail(balanceData);
    }
    return expenseGoalData;
  };

  return {
    goalExpenses,
    setGoalExpenses,
    allBalance,
    setAllBalance,
    expenseDetail,
    setExpenseDetail,
    balanceDetail,
    setBalanceDetail,
    saveBalanceData,
    getInitData,
  };
};
