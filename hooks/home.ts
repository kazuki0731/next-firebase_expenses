import { useState } from "react";
import {
  recentlyInputData,
  recentlyMonthlyInputData,
} from "../apiCaller/inputDataQuery";
import { initAllCategoryData } from "../const/categoryInitData";
import { AllCategoryData, Chart, InputData } from "../models/interface";
import { divideData } from "../util/function";

export const useGetTotalData = () => {
  const [pieChart, setPieChart] = useState<Chart>({ labels: [], datasets: [] });
  const [recentExpenseData, setRecentExpenseData] =
    useState<AllCategoryData>(initAllCategoryData);

  const getInitTotalData = async () => {
    const inputData = await recentlyMonthlyInputData();
    if (!inputData) return;
    const priceDataByCategory = divideData(inputData);
    setRecentExpenseData(priceDataByCategory);
    const { food, daily, traffic, enter, fixed, otherExpense } =
      priceDataByCategory;
    setPieChart({
      labels: ["日用品", "食費", "交通費", "交際費", "固定費", "その他"],
      datasets: [
        {
          data: [daily, food, traffic, enter, fixed, otherExpense],
          backgroundColor: [
            "rgba(255, 0, 0, 0.2)",
            "rgba(255, 69, 0, 0.2)",
            "rgba(255, 255, 0, 0.2)",
            "rgba(0, 128, 0, 0.2)",
            "rgba(0, 0, 255, 0.2)",
            "#ccc",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  return {
    pieChart,
    recentExpenseData,
    getInitTotalData,
  };
};

export const useGetInputData = () => {
  const [recentInputData, setRecentInputData] = useState<InputData[]>([]);

  const getRecentlyInputData = async () => {
    const result = await recentlyInputData();
    if (!result) return;
    setRecentInputData(result);
  };

  return { recentInputData, getRecentlyInputData };
};

