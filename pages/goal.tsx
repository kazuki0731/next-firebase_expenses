import Head from "next/head";
import { NextPage } from "next";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MonthButton from "../components/common/monthButtonList";
import { AuthContext } from "../hooks/provider/authProvider";
import { ExpenseData } from "../models/interface";
import { changeMonthAndYear } from "../util/function";
import GoalDataForm from "../components/goal/goalDataForm";
import InputExpenseData from "../components/goal/inputExpenseData";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import { current } from "../const/date";
import { useMediaQuery } from "@chakra-ui/react";
import { useGetGoalData } from "../hooks/goal";

const Goal: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<ExpenseData>();
  const { loginUser } = useContext(AuthContext);
  const [isLarger] = useMediaQuery("(min-width: 768px)");
  const {
    goalExpenses,
    allBalance,
    expenseDetail,
    balanceDetail,
    getInitData,
    saveBalanceData,
  } = useGetGoalData();

  const [nowMonth, setNowMonth] = useState<number>(current.month);
  const [nowYear, setNowYear] = useState<number>(current.year);

  // 全データ取得
  const getAllData = async (year: number, month: number) => {
    const monthlyData = await getInitData(year, month);
    reset(monthlyData);
  };

  useEffect(() => {
    if (loginUser) {
      getAllData(nowYear, nowMonth);
    }
  }, [loginUser]);

  // 目標変更をクリックした時
  const changeBalanceData = async (data: ExpenseData, month: number) => {
    const expenseGoalData = await saveBalanceData(data, month, nowYear);
    reset(expenseGoalData);
  };

  // 表示月を変更させる
  const clickShowOtherMonth = (year: number, otherMonth: number) => {
    const { newMonth, newYear } = changeMonthAndYear(year, otherMonth);
    setNowMonth(newMonth);
    setNowYear(newYear);
    getAllData(newYear, newMonth);
  };

  // 表示月を今月に戻す
  const clickShowCurrentMonth = () => {
    setNowMonth(current.month);
    setNowYear(current.year);
    getAllData(current.year, current.month);
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
        clickShowCurrentMonth={clickShowCurrentMonth}
      />
      {loginUser && (
        <>
          {isLarger ? (
            <Box m="0 auto" w={{ base: "350px", md: "85%", lg: "850px" }}>
              <HStack m="0 auto" justify="center">
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
              <VStack mb={3}>
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
        </>
      )}
    </>
  );
};

export default Goal;
