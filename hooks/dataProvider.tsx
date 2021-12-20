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
    yearlyData: number[];
    setYearlyData: Dispatch<SetStateAction<number[]>>;
    pieChart: Chart;
    setPieChart: Dispatch<SetStateAction<Chart>>;
    barChart: Chart;
    setBarChart: Dispatch<SetStateAction<Chart>>;
    isLarger: boolean;
    getYearlyData: () => Promise<void>;
    lastMonthDif: number;
    setLastMonthDif: (value: SetStateAction<number>) => void;
    monthlyAvg: MonthlyAvg;
    setMonthlyAvg: Dispatch<SetStateAction<MonthlyAvg>>;
  }
);

const currentMonth = new Date().getMonth() + 1;

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

interface MonthlyAvg {
  totalAvg: number;
  diff: number;
}

const DataProvider: NextPage<Children> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [nowMonth, setNowMonth] = useState<number>(currentMonth);
  const [lastMonthDif, setLastMonthDif] = useState<number>(0);
  const [yearlyData, setYearlyData] = useState<number[]>([]);
  const [monthlyAvg, setMonthlyAvg] = useState<MonthlyAvg>({
    totalAvg: 0,
    diff: 0,
  });
  const [isLarger] = useMediaQuery("(min-width: 768px)");
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
      const diff = totalAvg - nowMonthTotal;
      setLastMonthDif(lastMonthTotal - nowMonthTotal);
      setMonthlyAvg({ totalAvg, diff });
    } else {
      setLastMonthDif(0);
      setMonthlyAvg({ totalAvg: 0, diff: 0 });
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
      getYearlyData();
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
    lastMonthDif,
    setLastMonthDif,
    monthlyAvg,
    setMonthlyAvg,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
