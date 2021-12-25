import { NextPage } from "next";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Children } from "../models/interface";
import { allInputData } from "../apiCaller/inputDataQuery";
import { useMediaQuery } from "@chakra-ui/react";
import { AuthContext } from "./authProvider";

export const DataContext = createContext(
  {} as {
    nowMonth: number;
    setNowMonth: Dispatch<SetStateAction<number>>;
    nowYear: number;
    setNowYear: Dispatch<SetStateAction<number>>;
    yearlyData: number[];
    setYearlyData: Dispatch<SetStateAction<number[]>>;
    pieChart: Chart;
    setPieChart: Dispatch<SetStateAction<Chart>>;
    barChart: Chart;
    setBarChart: Dispatch<SetStateAction<Chart>>;
    isLarger: boolean;
    getYearlyData: (year: number) => Promise<void>;
    lastMonthDiff: number;
    setLastMonthDiff: (value: SetStateAction<number>) => void;
    monthlyAvg: number;
    setMonthlyAvg: Dispatch<SetStateAction<number>>;
  }
);

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

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

const DataProvider: NextPage<Children> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [nowMonth, setNowMonth] = useState<number>(currentMonth);
  const [nowYear, setNowYear] = useState<number>(currentYear);
  const [lastMonthDiff, setLastMonthDiff] = useState<number>(0);
  const [yearlyData, setYearlyData] = useState<number[]>([]);
  const [monthlyAvg, setMonthlyAvg] = useState<number>(0);
  const [isLarger] = useMediaQuery("(min-width: 768px)");
  const [pieChart, setPieChart] = useState<Chart>({
    labels: [],
    datasets: [],
  });
  const [barChart, setBarChart] = useState<Chart>({ labels: [], datasets: [] });

  const getYearlyData = async (year: number) => {
    let TotalData: number[] = [];
    let barLabel: string[] = [];
    for (let i = 1; i <= 12; i++) {
      TotalData.push(0);
      barLabel.push(`${i}月`);
    }

    const result = await allInputData(year);
    if (result) {
      for (let item of result.data) {
        const month = Number(item.date.split("-")[1]);
        TotalData[month - 1] = TotalData[month - 1] + item.price;
      }
    }

    const nonZeroTotal = TotalData.filter((data, index) => {
      if (index === currentMonth - 1) {
        return;
      }
      return data !== 0;
    });

    let lastMonthTotal = TotalData[nowMonth - 2];
    if (nowMonth === 1) {
      lastMonthTotal = TotalData[11];
    }
    let nowMonthTotal = TotalData[nowMonth - 1];

    if (nonZeroTotal.length !== 0) {
      const totalExpense = nonZeroTotal.reduce((a, b) => a + b);
      const totalAvg = Math.round(totalExpense / nonZeroTotal.length);
      setLastMonthDiff(lastMonthTotal - nowMonthTotal);
      setMonthlyAvg(totalAvg);
    } else {
      setLastMonthDiff(0);
      setMonthlyAvg(0);
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
    if (currentUser) {
      getYearlyData(nowYear);
    }
  }, [currentUser]);

  const value = {
    nowMonth,
    setNowMonth,
    yearlyData,
    setYearlyData,
    pieChart,
    setPieChart,
    barChart,
    setBarChart,
    isLarger,
    getYearlyData,
    lastMonthDiff,
    setLastMonthDiff,
    monthlyAvg,
    setMonthlyAvg,
    nowYear,
    setNowYear,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
