import { NextPage } from "next";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Children, InputData } from "../models/interface";

export const DataContext = createContext(
  {} as {
    // yearlyData: number[];
    // setYearlyData: Dispatch<SetStateAction<number[]>>;
    // monthlyAllData: InputData[];
    // setMonthlyAllData: Dispatch<SetStateAction<InputData[]>>;
  }
);

const DataProvider: NextPage<Children> = ({ children }) => {
  // const [monthlyAllData, setMonthlyAllData] = useState<InputData[]>([]);
  // const [yearlyData, setYearlyData] = useState<number[]>([]);

  const value = {
    // yearlyData,
    // setYearlyData,
    // monthlyAllData,
    // setMonthlyAllData,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
