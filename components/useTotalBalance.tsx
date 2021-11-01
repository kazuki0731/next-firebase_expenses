import { doc, getDoc } from "@firebase/firestore";
import router from "next/router";
import { useState } from "react";
import { db } from "../src/firebase";

const useTotalBalance = () => {
  const [expenses, setExpenses] = useState(0);
  const [incomes, setIncomes] = useState(0);
  const [balance, setBalanse] = useState(0);

  const clickChangeIsIncome = (url: string) => {
    router.push(`/simulate/${url}`);
  };

  const getExpensesData = async () => {
    let total = 0;
    try {
      const docRef = doc(db, "balances", "expenses");
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      for (let key in data) {
        total = total + data[key];
      }
      setExpenses(total);
      return { total, data };
    } catch (e) {
      console.log(e);
    }
  };

  const getIncomesData = async () => {
    let total = 0;
    try {
      const docRef = doc(db, "balances", "incomes");
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      for (let key in data) {
        total = total + data[key];
      }
      setIncomes(total);
      return { total, data };
    } catch (e) {
      console.log(e);
    }
  };

  return {
    expenses,
    setExpenses,
    incomes,
    setIncomes,
    balance,
    setBalanse,
    getExpensesData,
    getIncomesData,
    clickChangeIsIncome,
  };
};

export default useTotalBalance;
