import { useContext, useState } from "react";
import { InputData } from "../models/interface";
import { DataContext } from "./dataProvider";

interface FormData {
  category: string;
  order: string;
}

const SortAndSelecData = () => {
  const { pageLimit } = useContext(DataContext);
  const [dataByCategory, setDataByCategory] = useState<InputData[]>([]);
  const [maxPage, setMaxPage] = useState(1);
  const [monthlyAllData, setMonthlyAllData] = useState<InputData[]>([]);
  const [nowPage, setNowPage] = useState(1);
  const [detailData, setDetailData] = useState<InputData[]>([]);

  const changeCategory = ({ category, order }: FormData) => {
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
        const limitedData = newData.slice(0, pageLimit);
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
        const limitedData = newData.slice(0, pageLimit);
        setDataByCategory(newData);
        setDetailData(limitedData);
      } else {
        const limitedData = monthlyAllData.slice(0, pageLimit);
        setDetailData(limitedData);
        setDataByCategory(monthlyAllData);
      }
      const pageLen = Math.ceil(monthlyAllData.length / pageLimit);
      setMaxPage(pageLen);
      setNowPage(1);
    } else {
      console.log(monthlyAllData);
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
        const limitedData = newData.slice(0, pageLimit);
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
        const limitedData = newData.slice(0, pageLimit);
        setDataByCategory(newData);
        setDetailData(limitedData);
      } else {
        const limitedData = categorizedData.slice(0, pageLimit);
        setDataByCategory(categorizedData);
        setDetailData(limitedData);
      }
      const pageLen = Math.ceil(categorizedData.length / pageLimit);
      setMaxPage(pageLen);
      setNowPage(1);
    }
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
    changeCategory,
  };
};

export default SortAndSelecData;
