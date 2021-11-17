import { NextPage } from "next";
import { createContext, useEffect, useState } from "react";
import { Props } from "../models/interface";
import { allInputData } from "./api/getInputData";

export const DataContext = createContext({});

interface InputData {
  id: string;
  category: string;
  date: string;
  price: number;
  text: string;
}

interface Chart {
  labels: string[];
  datasets:
    | [
        {
          data: number[];
          backgroundColor: string[];
          borderColor?: string[];
          borderWidth: number;
        }
      ]
    | [];
}

const DataProvider: NextPage<Props> = ({ children }) => {
  const [nowMonth, setNowMonth] = useState<number>(new Date().getMonth() + 1);
  const [yearlyData, setYearlyData] = useState<number[]>([]);
  const [pieChart, setPieChart] = useState<Chart>({
    labels: [],
    datasets: [],
  });
  const [barChart, setBarChart] = useState<Chart>({ labels: [], datasets: [] });

  const getYearlyData = async () => {
    let TotalData: number[] = [];
    let barLabel: string[] = [];
    for (let i = 1; i <= 12; i++) {
      TotalData.push(0);
      barLabel.push(`${i}月`);
    }

    const result = await allInputData();
    if (result) {
      for (let item of result.data) {
        const month = Number(item.date.split("-")[1]);
        TotalData[month - 1] = TotalData[month - 1] + item.price;
      }
    }

    setBarChart({
      labels: barLabel,
      datasets: [
        {
          data: TotalData,
          backgroundColor: ["rgba(255, 99, 132, 0.3)"],
          borderColor: ["rgb(255, 99, 132)"],
          borderWidth: 1,
        },
      ],
    });

    setYearlyData(TotalData);
  };

  useEffect(() => {
    getYearlyData();
  }, []);

  const value = {
    nowMonth,
    setNowMonth,
    yearlyData,
    setYearlyData,
    pieChart,
    setPieChart,
    barChart,
    setBarChart,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
