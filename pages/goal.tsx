import Head from "next/head";
import { NextPage } from "next";
import Container from "../components/common/container";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MonthButton from "../components/common/monthButtonList";
import { AuthContext } from "../hooks/authProvider";
import { BalanceDetail, ExpenseData } from "../models/interface";
import { monthlyInputData } from "../apiCaller/inputDataQuery";
import { divideData } from "../hooks/functions";
import {
  getBalanceData,
  updateBalanceData,
} from "../apiCaller/balanceDataQuery";
import GoalDataForm from "../components/goal/goalDataForm";
import InputExpenseData from "../components/goal/inputExpenseData";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import { current } from "../const/date";
import { useMediaQuery } from "@chakra-ui/react";

const Goal: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<ExpenseData>();
  const { loginUser } = useContext(AuthContext);
  const [isLarger] = useMediaQuery("(min-width: 768px)");

  const [nowMonth, setNowMonth] = useState<number>(current.month);
  const [nowYear, setNowYear] = useState<number>(current.year);
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

  const getAllData = async (month: number) => {
    const monthlyResult = await monthlyInputData(
      nowYear,
      ("0" + month).slice(-2)
    );
    if (!monthlyResult) return;
    const priceDataByCategory = divideData(monthlyResult);

    const goalData = await getBalanceData(month, nowYear, priceDataByCategory);

    if (!goalData) return;
    const { monthlyData, expenseTotal, balanceData } = goalData;

    setGoalExpenses(expenseTotal);
    setExpenseDetail(priceDataByCategory);
    setAllBalance(expenseTotal - priceDataByCategory.totalExpensePrice);

    reset(monthlyData);
    setBalanceDetail(balanceData);
  };

  useEffect(() => {
    if (loginUser) {
      getAllData(nowMonth);
    }
  }, [nowMonth, loginUser]);

  const changeBalanceData = async (data: ExpenseData, month: number) => {
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
      nowYear,
      expenseGoalData,
      expenseDetail
    );

    setGoalExpenses(expenseTotal);
    setAllBalance(expenseTotal - expenseDetail.totalExpensePrice);
    reset({ ...expenseGoalData });
    if (balanceData) {
      setBalanceDetail(balanceData);
    }
  };

  const clickShowOtherMonth = (otherMonth: number) => {
    if (otherMonth <= 0) {
      otherMonth = 12;

      setNowYear(nowYear - 1);
    } else if (otherMonth > 12) {
      otherMonth = 1;
      setNowYear(nowYear + 1);
    }
    setNowMonth(otherMonth);
  };

  return (
    <>
      <Head>
        <title>goal</title>
      </Head>
      <HeaderAfterLogin />
      <MonthButton
        nowMonth={nowMonth}
        nowYear={nowYear}
        clickShowOtherMonth={clickShowOtherMonth}
        clickShowNowMonth={() => setNowMonth(new Date().getMonth() + 1)}
      />
      {loginUser && (
        <>
          <Container>
            {isLarger ? (
              <Box>
                <HStack mt={3} alignItems="flex-start">
                  <GoalDataForm
                    nowMonth={nowMonth}
                    goalExpenses={goalExpenses}
                    register={register}
                    handleSubmit={handleSubmit}
                    changeBalanceData={changeBalanceData}
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
                <VStack mb={3} alignItems="flex-start">
                  <GoalDataForm
                    nowMonth={nowMonth}
                    goalExpenses={goalExpenses}
                    register={register}
                    handleSubmit={handleSubmit}
                    changeBalanceData={changeBalanceData}
                  />
                  <InputExpenseData
                    expenseDetail={expenseDetail}
                    balanceDetail={balanceDetail}
                    allBalance={allBalance}
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

export default Goal;