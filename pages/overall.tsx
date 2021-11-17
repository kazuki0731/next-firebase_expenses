import Head from "next/head";
import { NextPage } from "next";
import TitleText from "../components/titleText";
import Container from "../components/container";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoIosBasket } from "react-icons/io";
import { ImHome } from "react-icons/im";
import { BsFillLightbulbFill } from "react-icons/bs";
import { RiPsychotherapyFill } from "react-icons/ri";
import { Button } from "@chakra-ui/button";
import { useBreakpointValue } from "@chakra-ui/react";

import {
  Box,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  Divider,
} from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ExpenseForm from "../components/expenseForm";
import IncomeForm from "../components/incomeForm";
import BalancePrice from "../components/balancePrice";
import MonthButton from "../components/monthButton";
import { AuthContext } from "../hooks/authProvider";
import { AllGoalData, ExpenseData, IncomeData } from "../models/interface";
import PieChart from "../components/pieChart";
import { DataContext } from "../hooks/dataProvider";
import { monthlyInputData } from "../hooks/api/getInputData";
import BarChart from "../components/barChart";
import { divideData } from "../util/functions";
import { getBalanceData, updateBalanceData } from "../hooks/api/getBalanceData";


interface BalanceDetail {
  dailyBalance: number;
  foodBalance: number;
  rentBalance: number;
  utilBalance: number;
  otherBalance: number;
}

const Overall: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<AllGoalData>();

  const { currentUser } = useContext<any>(AuthContext);
  const { nowMonth, setNowMonth, barChart, pieChart, setPieChart } =
    useContext<any>(DataContext);

  // 目標金額の合計（num）
  const [goalExpenses, setGoalExpenses] = useState(0);

  // 収入の合計（num）
  const [goalIncomes, setGoalIncomes] = useState(0);

  // 収支計算の合計（num）
  const [totalBalance, setTotalBalanse] = useState(0);

  // 目標金額の合計から実際の支出合計を引いたもの
  const [allBalance, setAllBalance] = useState<number>(0);

  // 実際に入力した支出金額（obj）
  const [expenseDetail, setExpenseDetail] = useState<ExpenseData>({
    daily: 0,
    food: 0,
    rent: 0,
    util: 0,
    otherExpense: 0,
    totalPrice: 0,
  });

  // 目標金額（expenses）から実際の現在支出（expenseData）を引いた金額（obj）
  const [balanceDetail, setBalanceDetail] = useState<BalanceDetail>({
    dailyBalance: 0,
    foodBalance: 0,
    rentBalance: 0,
    utilBalance: 0,
    otherBalance: 0,
  });

  const [isExpense, setIsExpense] = useState(true);

  // const isMobile = useBreakpointValue({ base: true, md: false });

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
          <HStack mb={5} justify="center" spacing={10}>
            <BarChart barChart={barChart} />
            <PieChart pieChart={pieChart} />
          </HStack>
          <HStack mt={3} alignItems="flex-start">
            <Box w="50%">
              <Text mb={2}>{isExpense ? "目標" : "収入"}</Text>
              <form>
                {isExpense ? (
                  <ExpenseForm register={register} />
                ) : (
                  <IncomeForm register={register} />
                )}
              </form>
              <Text textAlign="right" m="0 auto" w="85%" fontSize="24px" mt={2}>
                合計: {isExpense ? goalExpenses : goalIncomes}円
              </Text>
            </Box>
            <Box w="50%">
              <Text mb={3}>現在の支出</Text>

              <Box w="80%" m="0 auto">
                <List spacing={3}>
                  <Box>
                    <Divider w="100%" mb="7px" borderColor="black" />
                    <ListItem textAlign="right" fontSize="22px">
                      <ListIcon as={IoIosBasket} color="green.500" />
                      {expenseDetail.daily}円 (
                      <Text
                        display="inline"
                        color={
                          balanceDetail.dailyBalance >= 0 ? "black" : "red"
                        }
                      >
                        {balanceDetail.dailyBalance >= 0 && "あと"}
                        {balanceDetail.dailyBalance}円
                      </Text>
                      )
                    </ListItem>
                    <Divider w="100%" mb="7px" borderColor="black" />
                  </Box>
                  <Box>
                    <ListItem textAlign="right" fontSize="22px">
                      <ListIcon as={IoFastFoodOutline} color="green.500" />
                      {expenseDetail.food}円 (
                      <Text
                        display="inline"
                        color={balanceDetail.foodBalance >= 0 ? "black" : "red"}
                      >
                        {balanceDetail.foodBalance >= 0 && "あと"}
                        {balanceDetail.foodBalance}円
                      </Text>
                      )
                    </ListItem>
                    <Divider w="100%" mb="7px" borderColor="black" />
                  </Box>
                  <Box>
                    <ListItem textAlign="right" fontSize="22px">
                      <ListIcon as={ImHome} color="green.500" />
                      {expenseDetail.rent}円 (
                      <Text
                        display="inline"
                        color={balanceDetail.rentBalance >= 0 ? "black" : "red"}
                      >
                        {balanceDetail.rentBalance >= 0 && "あと"}
                        {balanceDetail.rentBalance}
                      </Text>
                      円)
                    </ListItem>
                    <Divider w="100%" mb="7px" borderColor="black" />
                  </Box>
                  <Box>
                    <ListItem textAlign="right" fontSize="22px">
                      <ListIcon as={BsFillLightbulbFill} color="green.500" />
                      {expenseDetail.util}円 (
                      <Text
                        display="inline"
                        color={balanceDetail.utilBalance >= 0 ? "black" : "red"}
                      >
                        {balanceDetail.utilBalance >= 0 && "あと"}
                        {balanceDetail.utilBalance}円
                      </Text>
                      )
                    </ListItem>
                    <Divider w="100%" mb="7px" borderColor="black" />
                  </Box>
                  <Box>
                    <ListItem textAlign="right" fontSize="22px">
                      <ListIcon as={RiPsychotherapyFill} color="green.500" />
                      {expenseDetail.otherExpense}円 (
                      <Text
                        display="inline"
                        color={
                          balanceDetail.otherBalance >= 0 ? "black" : "red"
                        }
                      >
                        {balanceDetail.otherBalance >= 0 && "あと"}
                        {balanceDetail.otherBalance}円
                      </Text>
                      )
                    </ListItem>
                    <Divider w="100%" mb="7px" borderColor="black" />
                  </Box>
                </List>
                <Box mt={3} textAlign="right" fontSize="24px">
                  合計: {expenseDetail.totalPrice}円(
                  <Text
                    display="inline"
                    color={allBalance >= 0 ? "black" : "red"}
                  >
                    {allBalance >= 0 && "あと"}
                    {allBalance}円
                  </Text>
                  )
                </Box>
              </Box>
            </Box>
          </HStack>
          <HStack m="10px 0" spacing={10} justify="center">
            <Button
              w="110px"
              type="submit"
              onClick={handleSubmit((data) => submitData(data, nowMonth))}
            >
              変更を保存
            </Button>
            <Button w="110px" onClick={() => setIsExpense(!isExpense)}>
              支出/収入
            </Button>
          </HStack>
        </Container>
      )}
      <MonthButton
        clickShowOtherMonth={clickShowOtherMonth}
        nowMonth={nowMonth}
        clickShowNowMonth={() => setNowMonth(new Date().getMonth() + 1)}
      />
    </>
  );
};

export default Overall;
