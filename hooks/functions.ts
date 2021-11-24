import { DocumentData } from "@firebase/firestore";
import { ExpenseData, InputData } from "../models/interface";

export const divideData = (data: InputData[], expenseData: ExpenseData) => {
  data.forEach((item) => {
    switch (item.category) {
      case "食費":
        expenseData.food += item.price;
        break;
      case "日用品":
        expenseData.daily += item.price;
        break;
      case "家賃":
        expenseData.rent += item.price;
        break;
      case "光熱費":
        expenseData.util += item.price;
        break;
      case "その他":
        expenseData.otherExpense += item.price;
        break;
    }
    expenseData.totalPrice += item.price;
  });
  return expenseData;
};

export const calcBalanceData = (
  goalData: DocumentData,
  inputData: ExpenseData
) => {
  const dailyBalance = goalData.daily - inputData.daily;
  const foodBalance = goalData.food - inputData.food;
  const rentBalance = goalData.rent - inputData.rent;
  const utilBalance = goalData.util - inputData.util;
  const otherBalance = goalData.otherExpense - inputData.otherExpense;

  const balanceData = {
    dailyBalance,
    foodBalance,
    rentBalance,
    utilBalance,
    otherBalance,
  };

  return balanceData;
};