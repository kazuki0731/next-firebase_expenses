import Head from "next/head";
import { NextPage } from "next";
import TitleText from "../components/common/titleText";
import Container from "../components/common/container";
import { Button } from "@chakra-ui/button";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BalancePrice from "../components/overall/balancePrice";
import MonthButton from "../components/common/monthButtonList";
import { AuthContext } from "../hooks/provider/authProvider";
import {
  AllGoalData,
  BalanceDetail,
  ExpenseData,
  IncomeData,
} from "../models/interface";
import PieChart from "../components/common/pieChart";
import { DataContext } from "../hooks/provider/dataProvider";
import { monthlyInputData } from "../hooks/api/getInputData";
import BarChart from "../components/common/barChart";
import { divideData } from "../util/functions";
import { getBalanceData, updateBalanceData } from "../hooks/api/getBalanceData";
import GoalDataForm from "../components/overall/goalDataForm";
import InputExpenseData from "../components/overall/inputExpenseData";

const Overall: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<AllGoalData>();
  const { isLarger } = useContext(DataContext);
  const { currentUser } = useContext(AuthContext);
  const { nowMonth, setNowMonth, barChart, pieChart, setPieChart } =
    useContext(DataContext);

  const [goalExpenses, setGoalExpenses] = useState(0);

  const [goalIncomes, setGoalIncomes] = useState(0);

  const [totalBalance, setTotalBalanse] = useState(0);

  const [allBalance, setAllBalance] = useState<number>(0);

  const [expenseDetail, setExpenseDetail] = useState<ExpenseData>({
    daily: 0,
    food: 0,
    rent: 0,
    util: 0,
    otherExpense: 0,
    totalPrice: 0,
  });

  const [balanceDetail, setBalanceDetail] = useState<BalanceDetail>({
    dailyBalance: 0,
    foodBalance: 0,
    rentBalance: 0,
    utilBalance: 0,
    otherBalance: 0,
  });

  const [isExpense, setIsExpense] = useState(true);

  const getAllData = async (month: string | string[] | number | undefined) => {
    let allexpenseData = {
      daily: 0,
      food: 0,
      rent: 0,
      util: 0,
      otherExpense: 0,
      totalPrice: 0,
    };

    month = ("0" + month).slice(-2);

    const monthlyResult = await monthlyInputData(month);

    if (monthlyResult) {
      divideData(monthlyResult.data, allexpenseData);
    }

    const goalData = await getBalanceData(month, allexpenseData);

    if (goalData) {
      const { monthlyData, expenseTotal, incomeTotal, balanceData } = goalData;

      setGoalIncomes(incomeTotal);
      setGoalExpenses(expenseTotal);
      setExpenseDetail(allexpenseData);
      setTotalBalanse(incomeTotal - allexpenseData.totalPrice);
      setAllBalance(expenseTotal - allexpenseData.totalPrice);

      reset(monthlyData);
      setBalanceDetail(balanceData);
    }

    const { food, daily, rent, util, otherExpense } = allexpenseData;

    setPieChart({
      labels: ["日用品", "食費", "家賃", "光熱費", "その他"],
      datasets: [
        {
          data: [daily, food, rent, util, otherExpense],
          backgroundColor: [
            "rgba(255, 99, 132, 0.4)",
            "rgba(255, 159, 64, 0.4)",
            "rgba(255, 205, 86, 0.4)",
            "rgba(75, 192, 192, 0.4)",
            "rgba(54, 162, 235, 0.4)",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  useEffect(() => {
    if (currentUser) {
      getAllData(nowMonth);
    }
  }, [nowMonth, currentUser]);

  const submitData = async (data: AllGoalData, month: number) => {
    let expenseTotal = 0;
    let incomeTotal = 0;

    for (let key in data) {
      if (!data[key]) {
        data[key] = 0;
      }

      data[key] = Number(data[key]);
      if (key === "salary" || key === "otherIncome") {
        incomeTotal = incomeTotal + data[key];
      } else {
        expenseTotal = expenseTotal + data[key];
      }
    }

    const { daily, food, rent, util, otherExpense, salary, otherIncome } = data;

    const expenseGoalData: ExpenseData = {
      daily: daily | 0,
      food: food | 0,
      rent: rent | 0,
      util: util | 0,
      otherExpense: otherExpense | 0,
    };

    const incomeGoalData: IncomeData = {
      salary: salary | 0,
      otherIncome: otherIncome | 0,
    };

    const balanceData = await updateBalanceData(
      month,
      expenseGoalData,
      incomeGoalData,
      expenseDetail
    );

    setGoalExpenses(expenseTotal);
    setGoalIncomes(incomeTotal);
    setTotalBalanse(incomeTotal - expenseDetail.totalPrice);
    setAllBalance(expenseTotal - expenseDetail.totalPrice);
    reset({ ...expenseGoalData, ...incomeGoalData });
    if (balanceData) {
      setBalanceDetail(balanceData);
    }
  };

  const clickShowOtherMonth = (otherMonth: number) => {
    if (otherMonth <= 0) {
      otherMonth = 12;
    } else if (otherMonth > 12) {
      otherMonth = 1;
    }
    setNowMonth(otherMonth);
  };

  return (
    <>
      <Head>
        <title>overall</title>
      </Head>
      <TitleText>{nowMonth}月</TitleText>
      {currentUser && (
        <Container>
          <BalancePrice
            incomes={goalIncomes}
            expenses={expenseDetail.totalPrice}
            balance={totalBalance}
          />
          {isLarger ? (
            <Box>
              <HStack mb={5} justify="center" spacing={10}>
                <BarChart barChart={barChart} />
                <PieChart pieChart={pieChart} />
              </HStack>
              <HStack mt={3} alignItems="flex-start">
                <GoalDataForm
                  isExpense={isExpense}
                  goalExpenses={goalExpenses}
                  goalIncomes={goalIncomes}
                  register={register}
                />
                <InputExpenseData
                  expenseDetail={expenseDetail}
                  balanceDetail={balanceDetail}
                  allBalance={allBalance}
                />
              </HStack>
            </Box>
          ) : (
            <Box>
              <VStack mb={5} justify="center" spacing={10}>
                <BarChart barChart={barChart} />
                <PieChart pieChart={pieChart} />
              </VStack>
              <VStack mb={3} alignItems="flex-start">
                <GoalDataForm
                  isExpense={isExpense}
                  goalExpenses={goalExpenses}
                  goalIncomes={goalIncomes}
                  register={register}
                />
                <InputExpenseData
                  expenseDetail={expenseDetail}
                  balanceDetail={balanceDetail}
                  allBalance={allBalance}
                />
              </VStack>
            </Box>
          )}
          <HStack m="10px 0" spacing={10} justify="center">
            <Button
              w={isLarger ? "110px" : "80px"}
              h={isLarger ? "45px" : "32px"}
              type="submit"
              fontSize={isLarger ? "16px" : "12px"}
              onClick={handleSubmit((data) => submitData(data, nowMonth))}
            >
              変更を保存
            </Button>
            <Button
              w={isLarger ? "110px" : "80px"}
              h={isLarger ? "45px" : "32px"}
              fontSize={isLarger ? "16px" : "12px"}
              onClick={() => setIsExpense(!isExpense)}
            >
              支出/収入
            </Button>
          </HStack>
        </Container>
      )}
      <MonthButton
        clickShowOtherMonth={clickShowOtherMonth}
        clickShowNowMonth={() => setNowMonth(new Date().getMonth() + 1)}
      />
    </>
  );
};

export default Overall;
