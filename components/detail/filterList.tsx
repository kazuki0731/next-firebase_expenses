import { FormControl } from "@chakra-ui/form-control";
import { HStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { NextPage } from "next";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

interface FormData {
  category: string;
  order: string;
  number: string;
}

interface Props {
  handleSubmit: UseFormHandleSubmit<FormData>;
  register: UseFormRegister<FormData>;
  changeDisplay: ({ category, order, number }: FormData) => void;
}

const FilterList: NextPage<Props> = ({
  handleSubmit,
  register,
  changeDisplay,
}) => {
  return (
    <HStack spacing={2}>
      <FormControl
        w={{ base: "110px", md: "140px" }}
        id="category"
        onChange={handleSubmit(changeDisplay)}
      >
        <Select
          bg="white"
          w={{ base: "110px", md: "140px" }}
          h={{ base: "35px", md: "40px" }}
          fontSize={{ base: "13px", md: "16px" }}
          required
          {...register("category")}
        >
          <option value="すべて">カテゴリ</option>
          <option value="日用品">日用品</option>
          <option value="食費">食費</option>
          <option value="家賃">家賃</option>
          <option value="光熱費">光熱費</option>
          <option value="交通費">交通費</option>
          <option value="交際費">交際費</option>
          <option value="税、保険等">税、保険等</option>
          <option value="その他">その他</option>
        </Select>
      </FormControl>
      <FormControl
        w={{ base: "110px", md: "140px" }}
        id="category"
        onChange={handleSubmit(changeDisplay)}
      >
        <Select
          w={{ base: "110px", md: "140px" }}
          h={{ base: "35px", md: "40px" }}
          fontSize={{ base: "13px", md: "16px" }}
          bg="white"
          required
          {...register("order")}
        >
          <option value="date">日付順</option>
          <option value="desc">高い順</option>
          <option value="asc">安い順</option>
        </Select>
      </FormControl>
      <FormControl
        w={{ base: "110px", md: "140px" }}
        id="category"
        onChange={handleSubmit(changeDisplay)}
      >
        <Select
          w={{ base: "110px", md: "140px" }}
          h={{ base: "35px", md: "40px" }}
          fontSize={{ base: "13px", md: "16px" }}
          bg="white"
          required
          {...register("number")}
        >
          <option value="5">5件表示</option>
          <option value="10">10件表示</option>
          <option value="20">20件表示</option>
        </Select>
      </FormControl>
    </HStack>
  );
};

export default FilterList;
