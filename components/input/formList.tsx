import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { NextPage } from "next";
import { FieldError, UseFormRegister } from "react-hook-form";

interface FormData {
  price: number;
  category: string;
  text: string;
  date: Date;
}

interface Props {
  register: UseFormRegister<FormData>;
  errors: {
    price?: FieldError | undefined;
    category?: FieldError | undefined;
    text?: FieldError | undefined;
    date?: FieldError | undefined;
  };
}

const FormList: NextPage<Props> = ({ register, errors }) => {
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
          <option value="">カテゴリ</option>
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
          {...register("text", { maxLength: 10 })}
        />

        {errors.text && (
          <Text mt={2} color="red" fontSize="16px">
            ※10文字以内にしてください
          </Text>
        )}
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
