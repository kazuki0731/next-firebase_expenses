import { useState } from "react";
import {
  allExpenseInputData,
  allIncomeInputData,
  monthlyInputData,
} from "../apiCaller/inputDataQuery";
import { initAllCategoryData } from "../const/categoryInitData";
import { current } from "../const/date";
import { AllCategoryData, Chart } from "../models/interface";
import { divideData, yearlyAllData } from "../util/function";

export const useGetCategoryData = () => {
  const [allDataBycategory, setAlldataByCategory] =
    useState<AllCategoryData>(initAllCategoryData);

  const getCategoryData = async (year: number, month: number) => {
    const inputData = await monthlyInputData(year, month);
    if (!inputData) return;
    const priceDataByCategory = divideData(inputData);
    setAlldataByCategory(priceDataByCategory);
  };

  return {
    allDataBycategory,
    getCategoryData,
  };
};

export const useGetYearlyData = () => {
  const [barChart, setBarChart] = useState<Chart>({ labels: [], datasets: [] });
  const [monthlyAvg, setMonthlyAvg] = useState<number>(0);
  const [selectedBalance, setSelectedBalance] = useState("支出");

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
    setMonthlyAvg(totalAvg);
    if (text) {
      setSelectedBalance(text);
    }
  };

  return {
    barChart,
    monthlyAvg,
    setMonthlyAvg,
    getYearlyData,
    selectedBalance,
    setSelectedBalance,
  };
};
