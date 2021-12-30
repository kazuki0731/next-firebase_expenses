import { DocumentData } from "@firebase/firestore";
import { ExpenseData, InputData } from "../models/interface";
import { QuerySnapshot } from "@firebase/firestore";

export const divideData = (data: InputData[], expenseData: ExpenseData) => {
  data.forEach((item) => {
    switch (item.category) {
      case "日用品":
        expenseData.daily += item.price;
        break;
      case "食費":
        expenseData.food += item.price;
        break;
      case "交通費":
        expenseData.traffic += item.price;
        break;
      case "交際費":
        expenseData.enter += item.price;
        break;
      case "固定費":
        expenseData.fixed += item.price;
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
  const trafficBalance = goalData.traffic - inputData.traffic;
  const enterBalance = goalData.enter - inputData.enter;
  const fixedBalance = goalData.fixed - inputData.fixed;
  const otherBalance = goalData.otherExpense - inputData.otherExpense;

  const balanceData = {
    dailyBalance,
    foodBalance,
    trafficBalance,
    enterBalance,
    fixedBalance,
    otherBalance,
  };

  return balanceData;
};

export const getInputDataSnap = (
  snapShot: QuerySnapshot,
  data: InputData[]
) => {
  snapShot.forEach((doc) => {
    data.push({
      id: doc.id,
      title: doc.data().title,
      category: doc.data().category,
      date: doc.data().date,
      price: doc.data().price,
      memo: doc.data().memo,
      name: doc.data().name,
      files: doc.data().files,
    });
  });
  return data;
};
