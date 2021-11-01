import Head from "next/head";
import { NextPage } from "next";
import TitleText from "../components/titleText";
import Container from "../components/container";
import { Button } from "@chakra-ui/button";
import { HStack, VStack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "../src/firebase";
import ExpenseForm from "../components/expenseForm";
import IncomeForm from "../components/incomeForm";
import BalancePrice from "./balancePrice";

interface FormData {
  daily: number;
  food: number;
  rent: number;
  util: number;
  otherExpense1: number;
  otherExpense2: number;
  salary: number;
  otherIncome1: number;
  otherIncome2: number;
  [key: string]: number;
}

interface ExpenseData {
  daily: number;
  food: number;
  rent: number;
  util: number;
  otherExpense1: number;
  otherExpense2: number;
  [key: string]: number;
}

interface IncomeData {
  salary: number;
  otherIncome1: number;
  otherIncome2: number;
  [key: string]: number;
}

const Expense: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [expenses, setExpenses] = useState(0);
  const [incomes, setIncomes] = useState(0);
  const [balance, setBalanse] = useState(0);
  const [isExpense, setIsExpense] = useState(true);

  const getBalanceData = async () => {
    let expenseTotal = 0;
    let incomeTotal = 0;

    try {
      const expenseDoc = doc(db, "balances", "expenses");
      const expenseSnap = await getDoc(expenseDoc);
      const expenseData = expenseSnap.data();
      for (let key in expenseData) {
        expenseTotal = expenseTotal + expenseData[key];
      }

      const incomeDoc = doc(db, "balances", "incomes");
      const incomeSnap = await getDoc(incomeDoc);
      const incomeData = incomeSnap.data();
      for (let key in incomeData) {
        incomeTotal = incomeTotal + incomeData[key];
      }
      const allData = { ...incomeData, ...expenseData };

      setIncomes(incomeTotal);
      setExpenses(expenseTotal);
      setBalanse(incomeTotal - expenseTotal);
      reset(allData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBalanceData();
  }, [expenses, incomes]);

  const submitData = async (data: FormData) => {
    const {
      daily,
      food,
      rent,
      util,
      otherExpense1,
      otherExpense2,
      salary,
      otherIncome1,
      otherIncome2,
    } = data;

    const expenseData: ExpenseData = {
      daily,
      food,
      rent,
      util,
      otherExpense1,
      otherExpense2,
    };

    const incomeData: IncomeData = {
      salary,
      otherIncome1,
      otherIncome2,
    };

    let expenseTotal = 0;
    let incomeTotal = 0;

    for (let key in expenseData) {
      expenseData[key] = Number(expenseData[key]);
      expenseTotal = expenseTotal + expenseData[key];
      if (!expenseData[key]) {
        expenseData[key] = 0;
      }
    }

    for (let key in incomeData) {
      incomeData[key] = Number(incomeData[key]);
      incomeTotal = incomeTotal + incomeData[key];
      if (!incomeData[key]) {
        incomeData[key] = 0;
      }
    }
    try {
      await updateDoc(doc(db, "balances", "expenses"), {
        daily: expenseData.daily,
        food: expenseData.food,
        rent: expenseData.rent,
        util: expenseData.util,
        otherExpense1: expenseData.otherExpense1,
        otherExpense2: expenseData.otherExpense2,
      });

      await updateDoc(doc(db, "balances", "incomes"), {
        salary: incomeData.salary,
        otherIncome1: incomeData.otherIncome1,
        otherIncome2: incomeData.otherIncome2,
      });
      setExpenses(expenseTotal);
      setIncomes(incomeTotal);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>simulate</title>
      </Head>
      <TitleText>シミュレート</TitleText>
      <Container>
        <HStack spacing={2} justify="center">
          <Button onClick={() => setIsExpense(!isExpense)}>支出/収入</Button>
        </HStack>
        <form>
          <BalancePrice
            incomes={incomes}
            expenses={expenses}
            balance={balance}
          />
          <VStack w={["95%", "80%", "60%", "55%"]} m="0 auto">
            {isExpense && <ExpenseForm register={register} />}
            {isExpense || <IncomeForm register={register} />}
            <HStack>
              <Button mt={3} type="submit" onClick={handleSubmit(submitData)}>
                変更
              </Button>
            </HStack>
          </VStack>
        </form>
      </Container>
    </>
  );
};

export default Expense;
