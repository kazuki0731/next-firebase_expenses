import { useState } from "react";
import { monthlyInputData } from "../apiCaller/inputDataQuery";
import { BalanceChart, Filter, InputData } from "../models/interface";
import { divideData } from "../util/function";

export const useGetDetailData = () => {
  const [pageLimit, setPageLimit] = useState<number>(5);
  const [dataByCategory, setDataByCategory] = useState<InputData[]>([]);
  const [maxPage, setMaxPage] = useState(1);
  const [nowPage, setNowPage] = useState(1);
  const [monthlyAllData, setMonthlyAllData] = useState<InputData[]>([]);
  const [detailData, setDetailData] = useState<InputData[]>([]);
  const [pieChart, setPieChart] = useState<BalanceChart>({
    expense: {
      labels: [],
      datasets: [],
    },
    income: {
      labels: [],
      datasets: [],
    },
  });

  const getInitData = async (year: number, month: number) => {
    const inputData = await monthlyInputData(year, month);
    if (!inputData) return;
    inputData.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else {
        return -1;
      }
    });

    const priceDataByCategory = divideData(inputData);
    const {
      food,
      daily,
      traffic,
      enter,
      fixed,
      otherExpense,
      salary,
      otherIncome,
    } = priceDataByCategory;

    const limitedData = inputData.slice(0, pageLimit);
    let pageLen = Math.ceil(inputData.length / pageLimit);
    if (pageLen === 0) {
      pageLen = 1;
    }
    setMaxPage(pageLen);

    setPieChart({
      expense: {
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
      },
      income: {
        labels: ["給料", "その他"],
        datasets: [
          {
            data: [salary, otherIncome],
            backgroundColor: ["rgba(255, 0, 0, 0.2)", "#ccc"],
            borderWidth: 1,
          },
        ],
      },
    });
    setMonthlyAllData(inputData);
    setDataByCategory(inputData);
    setDetailData(limitedData);
  };

  const filterData = ({ category, number, order }: Filter) => {
    const displayNumber = Number(number);
    if (order === "asc") {
      monthlyAllData.sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        } else {
          return -1;
        }
      });
    } else {
      monthlyAllData.sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    if (category === "すべて") {
      const limitedData = monthlyAllData.slice(0, displayNumber);
      setDetailData(limitedData);
      setDataByCategory(monthlyAllData);
      const pageLen = Math.ceil(monthlyAllData.length / displayNumber);
      setMaxPage(pageLen);
    } else {
      const categorizedData = monthlyAllData.filter((data) => {
        return data.category === category;
      });
      const limitedData = categorizedData.slice(0, displayNumber);
      setDataByCategory(categorizedData);
      const pageLen = Math.ceil(categorizedData.length / displayNumber);
      setMaxPage(pageLen);
      setDetailData(limitedData);
    }
    setNowPage(1);
    setPageLimit(displayNumber);
  };

  return {
    pageLimit,
    setPageLimit,
    dataByCategory,
    setDataByCategory,
    maxPage,
    setMaxPage,
    monthlyAllData,
    setMonthlyAllData,
    detailData,
    setDetailData,
    pieChart,
    setPieChart,
    nowPage,
    setNowPage,
    getInitData,
    filterData,
  };
};
