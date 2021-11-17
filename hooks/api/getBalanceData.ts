import { doc, getDoc, setDoc } from "@firebase/firestore";
import { ExpenseData, IncomeData } from "../../models/interface";
import { db } from "../../src/firebase";
import { calcBalanceData } from "../../util/functions";

export const getBalanceData = async (
  month: string,
  allexpenseData: ExpenseData
) => {
  let expenseTotal = 0;
  let incomeTotal = 0;
  try {
    const res = await getDoc(doc(db, "balances", `${month}`));
    let monthlyData = res.data();
    if (!monthlyData) {
      monthlyData = {
        daily: 0,
        food: 0,
        otherExpense: 0,
        otherIncome: 0,
        rent: 0,
        salary: 0,
        util: 0,
      };
    }

    for (let key in monthlyData) {
      if (key === "salary" || key === "otherIncome") {
        incomeTotal = incomeTotal + monthlyData[key];
      } else {
        expenseTotal = expenseTotal + monthlyData[key];
      }
    }

    const balanceData = calcBalanceData(monthlyData, allexpenseData);

    return {
      expenseTotal,
      incomeTotal,
      monthlyData,
      balanceData,
    };
  } catch (e) {
    console.log(e);
  }
};

export const updateBalanceData = async (
  month: number,
  expenseGoalData: ExpenseData,
  incomeGoalData: IncomeData,
  expenseDetail: ExpenseData
) => {
  try {
    await setDoc(doc(db, "balances", `${month}`), {
      daily: expenseGoalData.daily,
      food: expenseGoalData.food,
      rent: expenseGoalData.rent,
      util: expenseGoalData.util,
      otherExpense: expenseGoalData.otherExpense,
      salary: incomeGoalData.salary,
      otherIncome: incomeGoalData.otherIncome,
    });

    const balanceData = calcBalanceData(expenseGoalData, expenseDetail);

    return balanceData;
  } catch (e) {
    console.log(e);
  }
};
