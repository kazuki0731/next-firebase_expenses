import { doc, getDoc, setDoc } from "@firebase/firestore";
import { ExpenseData, IncomeData } from "../models/interface";
import { auth, db } from "../lib/firebase";
import { calcBalanceData } from "../util/function";

export const getBalanceData = async (
  month: number,
  year: number,
  allexpenseData: ExpenseData
) => {
  if (!auth.currentUser) return;
  let expenseTotal = 0;
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
        salary: 0,
        traffic: 0,
        enter: 0,
        fixed: 0,
      };
    }

    for (let key in monthlyData) {
      expenseTotal += monthlyData[key];
    }

    const balanceData = calcBalanceData(monthlyData, allexpenseData);

    return {
      expenseTotal,
      monthlyData,
      balanceData,
    };
  } catch (e) {
    console.log(e);
  }
};

export const updateBalanceData = async (
  month: number | string,
  year: number,
  expenseGoalData: ExpenseData,
  expenseDetail: ExpenseData
) => {
  if (!auth.currentUser) return;
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
        traffic: expenseGoalData.traffic,
        enter: expenseGoalData.enter,
        fixed: expenseGoalData.fixed,
        otherExpense: expenseGoalData.otherExpense,
      }
    );

    const balanceData = calcBalanceData(expenseGoalData, expenseDetail);

    return balanceData;
  } catch (e) {
    console.log(e);
  }
};
