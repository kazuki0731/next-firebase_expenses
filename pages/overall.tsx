import Head from "next/head";
import { NextPage } from "next";
import TitleText from "../components/common/titleText";
import Container from "../components/common/container";
import { Box, Flex, HStack, VStack } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MonthButton from "../components/common/monthButtonList";
import { AuthContext } from "../hooks/authProvider";
import {
  AllGoalData,
  BalanceDetail,
  ExpenseData,
  IncomeData,
} from "../models/interface";
import PieChart from "../components/common/pieChart";
import { DataContext } from "../hooks/dataProvider";
import { monthlyInputData } from "../apiCaller/inputDataQuery";
import BarChart from "../components/common/barChart";
import { divideData } from "../hooks/functions";
import {
  getBalanceData,
  updateBalanceData,
} from "../apiCaller/balanceDataQuery";
import GoalDataForm from "../components/overall/goalDataForm";
import InputExpenseData from "../components/overall/inputExpenseData";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import { auth } from "../lib/firebase";

const Overall: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<AllGoalData>();

  const { loginUser } = useContext(AuthContext);
  const {
    nowMonth,
    setNowMonth,
    nowYear,
    setNowYear,
    barChart,
    pieChart,
    setPieChart,
    isLarger,
    getYearlyData,
  } = useContext(DataContext);
  const [goalExpenses, setGoalExpenses] = useState(0);
  const [goalIncomes, setGoalIncomes] = useState(0);
  const [totalBalance, setTotalBalanse] = useState(0);
  const [allBalance, setAllBalance] = useState<number>(0);
  const [expenseDetail, setExpenseDetail] = useState<ExpenseData>({
    daily: 0,
    food: 0,
    traffic: 0,
    enter: 0,
    fixed: 0,
    otherExpense: 0,
    totalPrice: 0,
  });

  const [balanceDetail, setBalanceDetail] = useState<BalanceDetail>({
    dailyBalance: 0,
    foodBalance: 0,
    trafficBalance: 0,
    enterBalance: 0,
    fixedBalance: 0,
    otherBalance: 0,
  });

  const [isExpense, setIsExpense] = useState(true);

  const getAllData = async (month: string | string[] | number | undefined) => {
    let allexpenseData = {
      daily: 0,
      food: 0,
      traffic: 0,
      enter: 0,
      fixed: 0,
      otherExpense: 0,
      totalPrice: 0,
    };

    month = ("0" + month).slice(-2);
    // month = Number(month)

    const monthlyResult = await monthlyInputData(nowYear, month);

    if (monthlyResult) {
      divideData(monthlyResult, allexpenseData);
    }

    const goalData = await getBalanceData(month, nowYear, allexpenseData);

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

    const { food, daily, traffic, enter, fixed, otherExpense } = allexpenseData;

    setPieChart({
      labels: [
        "日用品",
        "食費",
        "光熱費",
        "交通費",
        "交際費",
        "固定費",
        "その他",
      ],
      datasets: [
        {
          data: [daily, food, traffic, enter, fixed, otherExpense],
          backgroundColor: [
            "rgba(255, 0, 0, 0.2)",
            "rgba(255, 69, 0, 0.2)",
            "rgba(255, 255, 0, 0.2)",
            "rgba(0, 128, 0, 0.2)",
            "rgba(0, 0, 255, 0.2)",
            "rgba(75, 0, 130, 0.2)",
            "rgba(238, 130, 238, 0.2)",
            "#ccc",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  useEffect(() => {
    if (loginUser) {
      getAllData(nowMonth);
    }
  }, [nowMonth, loginUser]);

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

    const {
      daily,
      food,
      traffic,
      enter,
      fixed,
      otherExpense,
      salary,
      otherIncome,
    } = data;

    const expenseGoalData: ExpenseData = {
      daily: daily | 0,
      food: food | 0,
      traffic: traffic | 0,
      enter: enter | 0,
      fixed: fixed | 0,
      otherExpense: otherExpense | 0,
    };

    const incomeGoalData: IncomeData = {
      salary: salary | 0,
      otherIncome: otherIncome | 0,
    };

    const balanceData = await updateBalanceData(
      month,
      nowYear,
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
      getYearlyData(nowYear - 1);
      setNowYear(nowYear - 1);
    } else if (otherMonth > 12) {
      otherMonth = 1;
      getYearlyData(nowYear + 1);
      setNowYear(nowYear + 1);
    }
    setNowMonth(otherMonth);
  };

  return (
    <>
      <Head>
        <title>overall</title>
      </Head>
      <HeaderAfterLogin />
      <MonthButton
        clickShowOtherMonth={clickShowOtherMonth}
        clickShowNowMonth={() => setNowMonth(new Date().getMonth() + 1)}
      />
      {loginUser && (
        <>
          <Container>
            {isLarger ? (
              <Box>
                <HStack mb={5}>
                  <BarChart barChart={barChart} />
                  <PieChart pieChart={pieChart} />
                </HStack>
                <HStack mt={3} alignItems="flex-start">
                  <GoalDataForm
                    isExpense={isExpense}
                    goalExpenses={goalExpenses}
                    goalIncomes={goalIncomes}
                    register={register}
                    handleSubmit={handleSubmit}
                    submitData={submitData}
                    setIsExpense={setIsExpense}
                  />
                  <InputExpenseData
                    expenseDetail={expenseDetail}
                    balanceDetail={balanceDetail}
                    allBalance={allBalance}
                    totalbalance={totalBalance}
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
                  <InputExpenseData
                    expenseDetail={expenseDetail}
                    balanceDetail={balanceDetail}
                    allBalance={allBalance}
                    totalbalance={totalBalance}
                  />
                  <GoalDataForm
                    isExpense={isExpense}
                    goalExpenses={goalExpenses}
                    goalIncomes={goalIncomes}
                    register={register}
                    handleSubmit={handleSubmit}
                    submitData={submitData}
                    setIsExpense={setIsExpense}
                  />
                </VStack>
              </Box>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default Overall;
