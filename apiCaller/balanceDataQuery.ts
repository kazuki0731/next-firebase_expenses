import { doc, getDoc, setDoc } from "@firebase/firestore";
import { ExpenseData, IncomeData } from "../models/interface";
import { auth, db } from "../lib/firebase";
import { calcBalanceData } from "../hooks/functions";

export const getBalanceData = async (
  month: string,
  year: number,
  allexpenseData: ExpenseData
) => {
  let expenseTotal = 0;
  let incomeTotal = 0;
  try {
    const res = await getDoc(
      doc(db, "users", auth.currentUser.uid, "balances", `${year}年-${month}月`)
    );
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
        traffic: 0,
        enter: 0,
        tax: 0,
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
  year: number,
  expenseGoalData: ExpenseData,
  incomeGoalData: IncomeData,
  expenseDetail: ExpenseData
) => {
  try {
    await setDoc(
      doc(
        db,
        "users",
        auth.currentUser.uid,
        "balances",
        `${year}年-${month}月`
      ),
      {
        daily: expenseGoalData.daily,
        food: expenseGoalData.food,
        rent: expenseGoalData.rent,
        util: expenseGoalData.util,
        traffic: expenseGoalData.traffic,
        enter: expenseGoalData.enter,
        tax: expenseGoalData.tax,
        otherExpense: expenseGoalData.otherExpense,
        salary: incomeGoalData.salary,
        otherIncome: incomeGoalData.otherIncome,
      }
    );

    const balanceData = calcBalanceData(expenseGoalData, expenseDetail);

    return balanceData;
  } catch (e) {
    console.log(e);
  }
};
