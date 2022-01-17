import { useState } from "react";
import { monthlyInputData } from "../apiCaller/inputDataQuery";
import { BalanceChart, Filter, InputData } from "../models/interface";
import { divideData } from "../util/function";

const initPageLimit = 5;

export const useGetDetailData = () => {
  const [pageLimit, setPageLimit] = useState<number>(initPageLimit);
  const [dataByCategory, setDataByCategory] = useState<InputData[]>([]);
  const [displayPage, setDisplayPage] = useState<InputData[][]>([]);
  const [pageLen, setPageLen] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
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

  // 今月のデータ取得
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

    const limitedData = inputData.slice(0, initPageLimit);
    let pageLen = Math.ceil(inputData.length / initPageLimit);
    if (pageLen === 0) {
      pageLen = 1;
    }
    setPageLen(pageLen);

    const displayPage = [];
    const displayInputData = inputData.slice(
      0,
      pageLimit * (pageLen >= 3 ? 4 : 3)
    );
    for (let i = 0; i < displayInputData.length / pageLimit; i++) {
      displayPage.push(
        displayInputData.slice(pageLimit * i, pageLimit * (i + 1))
      );
    }
    console.log(displayInputData);
    setDisplayPage(displayPage);

    setPieChart({
      expense: {
        labels: ["日用品", "食費", "交通費", "交際費", "固定費", "その他"],
        datasets: [
          {
            data: [daily, food, traffic, enter, fixed, otherExpense],
            backgroundColor: [
              "rgba(255, 0, 0, 0.2)",
              "rgba(255, 0, 180, 0.2)",
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
    setCurrentPage(1);
  };

  const filterData = ({ category, number, order }: Filter) => {
    const displayPage = [];
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
      const pageLen = Math.ceil(monthlyAllData.length / displayNumber);
      const displayInputData = monthlyAllData.slice(
        displayNumber * (currentPage <= 2 ? 0 : currentPage - 3),
        displayNumber *
          (currentPage === 1 && pageLen >= 3
            ? currentPage + 3
            : currentPage + 2)
      );
      for (let i = 0; i < displayInputData.length / displayNumber; i++) {
        displayPage.push(
          displayInputData.slice(displayNumber * i, displayNumber * (i + 1))
        );
      }

      setDetailData(limitedData);
      setDataByCategory(monthlyAllData);
      setPageLen(pageLen);
    } else {
      const categorizedData = monthlyAllData.filter((data) => {
        return data.category === category;
      });
      const limitedData = categorizedData.slice(0, displayNumber);
      const pageLen = Math.ceil(categorizedData.length / displayNumber);
      const displayInputData = categorizedData.slice(
        displayNumber * (currentPage <= 2 ? 0 : currentPage - 3),
        displayNumber *
          (currentPage === 1 && pageLen >= 3
            ? currentPage + 3
            : currentPage + 2)
      );
      for (let i = 0; i < displayInputData.length / displayNumber; i++) {
        displayPage.push(
          displayInputData.slice(displayNumber * i, displayNumber * (i + 1))
        );
      }
      setDataByCategory(categorizedData);
      setPageLen(pageLen);
      setDetailData(limitedData);
    }

    setDisplayPage(displayPage);
    setCurrentPage(1);
    setPageLimit(displayNumber);
  };

  return {
    pageLimit,
    setPageLimit,
    dataByCategory,
    setDataByCategory,
    pageLen,
    setPageLen,
    monthlyAllData,
    setMonthlyAllData,
    detailData,
    setDetailData,
    pieChart,
    setPieChart,
    currentPage,
    setCurrentPage,
    displayPage,
    setDisplayPage,
    getInitData,
    filterData,
  };
};
