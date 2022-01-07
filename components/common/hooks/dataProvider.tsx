import { NextPage } from "next";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Children, InputData } from "../../../models/interface";
import { useMediaQuery } from "@chakra-ui/react";

export const DataContext = createContext(
  {} as {
    // yearlyData: number[];
    // setYearlyData: Dispatch<SetStateAction<number[]>>;
    // isLarger: boolean;
    // monthlyAllData: InputData[];
    // setMonthlyAllData: Dispatch<SetStateAction<InputData[]>>;
  }
);

const DataProvider: NextPage<Children> = ({ children }) => {
  // const [monthlyAllData, setMonthlyAllData] = useState<InputData[]>([]);
  // const [yearlyData, setYearlyData] = useState<number[]>([]);
  // const [isLarger] = useMediaQuery("(min-width: 768px)");

  useEffect(() => {}, []);

  const value = {
    // yearlyData,
    // setYearlyData,
    // isLarger,
    // monthlyAllData,
    // setMonthlyAllData,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
