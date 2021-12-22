import { useContext, useState } from "react";
import { InputData } from "../models/interface";
import { DataContext } from "./dataProvider";

interface FormData {
  category: string;
  order: string;
  number: string;
}

export const SortAndSelectData = () => {
  const [pageLimit, setPageLimit] = useState<number>(5);
  const [dataByCategory, setDataByCategory] = useState<InputData[]>([]);
  const [maxPage, setMaxPage] = useState(1);
  const [monthlyAllData, setMonthlyAllData] = useState<InputData[]>([]);
  const [nowPage, setNowPage] = useState(1);
  const [detailData, setDetailData] = useState<InputData[]>([]);

  const changeDisplay = ({ category, order, number }: FormData) => {
    const displayNumber = Number(number);
    if (category === "すべて") {
      if (order === "asc") {
        const newData = [...monthlyAllData];
        newData.sort((a, b) => {
          if (a.price > b.price) {
            return 1;
          } else {
            return -1;
          }
        });
        const limitedData = newData.slice(0, displayNumber);
        setDataByCategory(newData);
        setDetailData(limitedData);
      } else if (order === "desc") {
        const newData = [...monthlyAllData];
        newData.sort((a, b) => {
          if (a.price < b.price) {
            return 1;
          } else {
            return -1;
          }
        });
        const limitedData = newData.slice(0, displayNumber);
        setDataByCategory(newData);
        setDetailData(limitedData);
      } else {
        const limitedData = monthlyAllData.slice(0, displayNumber);
        setDetailData(limitedData);
        setDataByCategory(monthlyAllData);
      }
      const pageLen = Math.ceil(monthlyAllData.length / displayNumber);
      setMaxPage(pageLen);
      setNowPage(1);
    } else {
      const categorizedData = monthlyAllData.filter((data) => {
        return data.category === category;
      });
      if (order === "asc") {
        const newData = [...categorizedData];
        newData.sort((a, b) => {
          if (a.price > b.price) {
            return 1;
          } else {
            return -1;
          }
        });
        const limitedData = newData.slice(0, displayNumber);
        setDataByCategory(newData);
        setDetailData(limitedData);
      } else if (order === "desc") {
        const newData = [...categorizedData];
        newData.sort((a, b) => {
          if (a.price < b.price) {
            return 1;
          } else {
            return -1;
          }
        });
        const limitedData = newData.slice(0, displayNumber);
        setDataByCategory(newData);
        setDetailData(limitedData);
      } else {
        const limitedData = categorizedData.slice(0, displayNumber);
        setDataByCategory(categorizedData);
        setDetailData(limitedData);
      }
      const pageLen = Math.ceil(categorizedData.length / displayNumber);
      setMaxPage(pageLen);
      setNowPage(1);
    }
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
