import { FormControl } from "@chakra-ui/form-control";
import { HStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { NextPage } from "next";
import { Dispatch, SetStateAction, useContext } from "react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { DataContext } from "../../hooks/dataProvider";
import { InputData } from "../../models/interface";

interface FormData {
  category: string;
  order: string;
}

interface Props {
  handleSubmit: UseFormHandleSubmit<FormData>;
  register: UseFormRegister<FormData>;
  setMaxPage: Dispatch<SetStateAction<number>>;
  setDetailData: Dispatch<SetStateAction<InputData[]>>;
  setDataByCategory: Dispatch<SetStateAction<InputData[]>>;
  setNowPage: Dispatch<SetStateAction<number>>;
  monthlyAllData: InputData[];
  pageLimit: number;
}

const FilterList: NextPage<Props> = ({
  handleSubmit,
  register,
  setMaxPage,
  setDetailData,
  setDataByCategory,
  setNowPage,
  monthlyAllData,
  pageLimit,
}) => {
  const { isLarger } = useContext(DataContext);

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

  return (
    <HStack spacing={2}>
      <FormControl
        w={isLarger ? "140px" : "120px"}
        id="category"
        onChange={handleSubmit(changeCategory)}
      >
        <Select
          bg="white"
          w={isLarger ? "140px" : "120px"}
          h={isLarger ? "40px" : "35px"}
          fontSize={isLarger ? "16px" : "13px"}
          required
          {...register("category")}
        >
          <option value="すべて">全カテゴリ</option>
          <option value="日用品">日用品</option>
          <option value="食費">食費</option>
          <option value="家賃">家賃</option>
          <option value="光熱費">光熱費</option>
          <option value="その他">その他</option>
        </Select>
      </FormControl>
      <FormControl
        w={isLarger ? "140px" : "120px"}
        id="category"
        onChange={handleSubmit(changeCategory)}
      >
        <Select
          w={isLarger ? "140px" : "120px"}
          h={isLarger ? "40px" : "35px"}
          bg="white"
          required
          {...register("order")}
        >
          <option value="date">日付順</option>
          <option value="desc">高い順</option>
          <option value="asc">安い順</option>
        </Select>
      </FormControl>
    </HStack>
  );
};

export default FilterList;
