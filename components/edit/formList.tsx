import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { NextPage } from "next";
import { UseFormRegister } from "react-hook-form";

interface FormData {
  price: number;
  category: string;
  text: string;
  date: Date;
}                 

interface Props {
  register: UseFormRegister<FormData>;
}

const FormList: NextPage<Props> = ({ register }) => {
  return (
    <>
      <FormControl id="price">
        <Input
          type="number"
          bg="white"
          variant="outline"
          placeholder="金額"
          required
          {...register("price")}
        />
      </FormControl>
      <FormControl id="category" w="60%">
        <Select bg="white" required {...register("category")}>
          <option value="">カテゴリを選択</option>
          <option value="日用品">日用品</option>
          <option value="食費">食費</option>
          <option value="家賃">家賃</option>
          <option value="光熱費">光熱費</option>
          <option value="その他">その他</option>
        </Select>
      </FormControl>
      <FormControl id="text">
        <Input
          type="text"
          bg="white"
          variant="outline"
          placeholder="メモ"
          required
          {...register("text")}
        />
      </FormControl>
      <FormControl id="date">
        <Input
          type="date"
          bg="white"
          variant="outline"
          placeholder="メモ"
          required
          {...register("date")}
        />
      </FormControl>
    </>
  );
};

export default FormList;
