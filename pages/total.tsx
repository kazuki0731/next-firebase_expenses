import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import { NextPage } from "next";
import { AuthContext } from "../hooks/authProvider";
import Container from "../components/common/container";
import TotalDataByCategory from "../components/detail/TotalDataByCategory";
import MonthButtonList from "../components/common/monthButtonList";
import BarChart from "../components/common/barChart";
import { HStack } from "@chakra-ui/react";
import SelectButton from "../components/total/selectButton";
import {
  allExpenseInputData,
  allIncomeInputData,
  monthlyInputData,
} from "../apiCaller/inputDataQuery";
import { divideData, yearlyAllData } from "../hooks/functions";
import { current } from "../const/date";
import { AllCategoryData, Chart } from "../models/interface";

const Total: NextPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [allDataBycategory, setAlldataByCategory] = useState<AllCategoryData>({
    daily: 0,
    food: 0,
    traffic: 0,
    enter: 0,
    fixed: 0,
    otherExpense: 0,
    salary: 0,
    otherIncome: 0,
    totalExpensePrice: 0,
    totalIncomePrice: 0,
    totalBalancePrice: 0,
  });
  const [selectedBalance, setSelectedBalance] = useState("支出");
  const [nowMonth, setNowMonth] = useState<number>(current.month);
  const [nowYear, setNowYear] = useState<number>(current.year);
  const [barChart, setBarChart] = useState<Chart>({ labels: [], datasets: [] });
  const [yearlyData, setYearlyData] = useState<number[]>([]);
  const [monthlyAvg, setMonthlyAvg] = useState<number>(0);

  const getTotalDataByCategory = async (year: number, month: number) => {
    const inputData = await monthlyInputData(year, month);
    if (!inputData) return;
    const priceDataByCategory = divideData(inputData);
    setAlldataByCategory(priceDataByCategory);
  };

  const getYearlyData = async (year: number, text?: string) => {
    let result;
    if (!text || text === "支出") {
      result = await allExpenseInputData(year);
    } else if (text === "収入") {
      result = await allIncomeInputData(year);
    } else {
      const balanceData: number[] = [];
      const expenseData = await allExpenseInputData(year);
      const incomeData = await allIncomeInputData(year);
      if (!expenseData || !incomeData) return;

      const expenseTotal = yearlyAllData(expenseData.data);
      const incomeTotal = yearlyAllData(incomeData.data);
      incomeTotal.totalData.forEach((data, index) => {
        balanceData.push(data - expenseTotal.totalData[index]);
      });
      setBarChart({
        labels: expenseTotal.barLabel,
        datasets: [
          {
            data: balanceData,
            backgroundColor: ["rgba(255, 99, 132, 0.3)"],
            borderColor: ["rgb(255, 99, 132)"],
            borderWidth: 1,
          },
        ],
      });
      setYearlyData(balanceData);
      setMonthlyAvg(incomeTotal.totalAvg - expenseTotal.totalAvg);
      return;
    }

    if (!result) return;
    const { totalData, totalAvg, barLabel } = yearlyAllData(result.data);
    setBarChart({
      labels: barLabel,
      datasets: [
        {
          data: totalData,
          backgroundColor: ["rgba(255, 99, 132, 0.3)"],
          borderColor: ["rgb(255, 99, 132)"],
          borderWidth: 1,
        },
      ],
    });
    setYearlyData(totalData);
    setMonthlyAvg(totalAvg);
  };

  useEffect(() => {
    if (loginUser) {
      getTotalDataByCategory(nowYear, nowMonth);
      getYearlyData(nowYear);
    }
  }, [loginUser]);

  const clickShowOtherMonth = (otherMonth: number) => {
    if (otherMonth <= 0) {
      otherMonth = 12;
      getTotalDataByCategory(nowYear - 1, otherMonth);
      getYearlyData(nowYear - 1, selectedBalance);
      setNowYear(nowYear - 1);
    } else if (otherMonth > 12) {
      otherMonth = 1;
      getTotalDataByCategory(nowYear + 1, otherMonth);
      getYearlyData(nowYear + 1, selectedBalance);
      setNowYear(nowYear + 1);
    } else {
      getTotalDataByCategory(nowYear, otherMonth);
      getYearlyData(nowYear, selectedBalance);
    }
    setNowMonth(otherMonth);
  };

  const changeBalance = (text: string) => {
    getYearlyData(nowYear, text);
    setSelectedBalance(text);
  };

  return (
    <>
      <Head>
        <title>total</title>
      </Head>
      <HeaderAfterLogin />
      <MonthButtonList
        nowMonth={nowMonth}
        nowYear={nowYear}
        clickShowOtherMonth={clickShowOtherMonth}
        clickShowNowMonth={() => setNowMonth(new Date().getMonth() + 1)}
      />
      {loginUser && (
        <>
          <Container>
            <HStack spacing={5} w="550px" m="0 auto">
              <SelectButton
                selectedBalance={selectedBalance}
                text="支出"
                changeBalance={changeBalance}
              >
                支出
              </SelectButton>
              <SelectButton
                selectedBalance={selectedBalance}
                text="収入"
                changeBalance={changeBalance}
              >
                収入
              </SelectButton>
              <SelectButton
                selectedBalance={selectedBalance}
                text="収支"
                changeBalance={changeBalance}
              >
                収支
              </SelectButton>
            </HStack>
            <BarChart
              monthlyAvg={monthlyAvg}
              nowYear={nowYear}
              barChart={barChart}
            />
            <TotalDataByCategory allDataByCategory={allDataBycategory} />
          </Container>
        </>
      )}
    </>
  );
};

export default Total;
