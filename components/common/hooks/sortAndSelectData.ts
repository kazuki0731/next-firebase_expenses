import { useContext, useState } from "react";
import { Filter, InputData } from "../../../models/interface";
import { DataContext } from "./dataProvider";

export const SortAndSelectData = () => {
  const [pageLimit, setPageLimit] = useState<number>(5);
  const [dataByCategory, setDataByCategory] = useState<InputData[]>([]);
  const [maxPage, setMaxPage] = useState(1);
  const [monthlyAllData, setMonthlyAllData] = useState<InputData[]>([]);
  const [nowPage, setNowPage] = useState(1);
  const [detailData, setDetailData] = useState<InputData[]>([]);

  const changeDisplay = ({ category, number }: Filter) => {
    const displayNumber = Number(number);
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
    dataByCategory,
    setDataByCategory,
    detailData,
    setDetailData,
    maxPage,
    setMaxPage,
    nowPage,
    setNowPage,
    monthlyAllData,
    setMonthlyAllData,
    changeDisplay,
    pageLimit,
    setPageLimit,
  };
};
