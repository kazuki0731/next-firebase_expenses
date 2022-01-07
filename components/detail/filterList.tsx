import { FormControl } from "@chakra-ui/form-control";
import { HStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { NextPage } from "next";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Filter } from "../../models/interface";

interface Props {
  handleSubmit: UseFormHandleSubmit<Filter>;
  register: UseFormRegister<Filter>;
  changeDisplay: ({ category, number, order }: Filter) => void;
}

const FilterList: NextPage<Props> = ({
  handleSubmit,
  register,
  changeDisplay,
}) => {
  return (
    <HStack spacing={2}>
      <FormControl
        w={{ base: "110px", md: "160px" }}
        id="category"
        onChange={handleSubmit(changeDisplay)}
      >
        <Select
          bg="white"
          w={{ base: "110px", md: "160px" }}
          h={{ base: "35px", md: "40px" }}
          fontSize={{ base: "13px", md: "16px" }}
          required
          {...register("category")}
        >
          <option value="すべて">すべて</option>
          <option value="日用品">日用品</option>
          <option value="食費">食費</option>
          <option value="交通費">交通費</option>
          <option value="交際費">交際費</option>
          <option value="固定費">固定費</option>
          <option value="その他支出">その他（支出）</option>
          <option value="給料">給料</option>
          <option value="その他収入">その他（収入）</option>
        </Select>
      </FormControl>
      <FormControl
        w={{ base: "110px", md: "160px" }}
        id="category"
        onChange={handleSubmit(changeDisplay)}
      >
        <Select
          w={{ base: "110px", md: "160px" }}
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
      <FormControl
        w={{ base: "110px", md: "160px" }}
        id="category"
        onChange={handleSubmit(changeDisplay)}
      >
        <Select
          w={{ base: "110px", md: "160px" }}
          h={{ base: "35px", md: "40px" }}
          fontSize={{ base: "13px", md: "16px" }}
          bg="white"
          required
          {...register("order")}
        >
          <option value="asc">古い順</option>
          <option value="desc">新しい順</option>
        </Select>
      </FormControl>
    </HStack>
  );
};

export default FilterList;
