import { FormControl } from "@chakra-ui/form-control";
import { HStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { NextPage } from "next";
import { useContext } from "react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { DataContext } from "../../hooks/dataProvider";

interface FormData {
  category: string;
  order: string;
}

interface Props {
  handleSubmit: UseFormHandleSubmit<FormData>;
  register: UseFormRegister<FormData>;
  changeCategory: ({ category, order }: FormData) => void;
}

const FilterList: NextPage<Props> = ({
  handleSubmit,
  register,
  changeCategory,
}) => {
  const { isLarger } = useContext(DataContext);

  return (
    <HStack spacing={2}>
      <FormControl
        w={isLarger ? "140px" : "110px"}
        id="category"
        onChange={handleSubmit(changeCategory)}
      >
        <Select
          bg="white"
          w={isLarger ? "140px" : "110px"}
          h={isLarger ? "40px" : "35px"}
          fontSize={isLarger ? "16px" : "13px"}
          required
          {...register("category")}
        >
          <option value="すべて">カテゴリ</option>
          <option value="日用品">日用品</option>
          <option value="食費">食費</option>
          <option value="家賃">家賃</option>
          <option value="光熱費">光熱費</option>
          <option value="その他">その他</option>
        </Select>
      </FormControl>
      <FormControl
        w={isLarger ? "140px" : "110px"}
        id="category"
        onChange={handleSubmit(changeCategory)}
      >
        <Select
          w={isLarger ? "140px" : "110px"}
          h={isLarger ? "40px" : "35px"}
          fontSize={isLarger ? "16px" : "13px"}
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
