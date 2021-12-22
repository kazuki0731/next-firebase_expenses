import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { NextPage } from "next";
import React, { Dispatch, SetStateAction } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

const today = new Date();
const year = today.getFullYear();
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const day = ("0" + today.getDate()).slice(-2);
const date = `${year}-${month}-${day}`;

interface FormData {
  price: number;
  category: string;
  text: string;
  date: Date;
  files?: File[];
}

interface Props {
  files: File[] | null;
  setFiles: Dispatch<SetStateAction<File[] | null>>;
  register: UseFormRegister<FormData>;
  showPreview: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    price?: FieldError | undefined;
    category?: FieldError | undefined;
    text?: FieldError | undefined;
    date?: FieldError | undefined;
  };
}

const FormList: NextPage<Props> = ({
  register,
  errors,
  files,
  setFiles,
  showPreview,
}) => {
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
          <option value="水道、光熱費">水道、光熱費</option>
          <option value="交通費">交通費</option>
          <option value="交際費">交際費</option>
          <option value="税、保険等">税、保険等</option>
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
          defaultValue={date}
          required
          {...register("date")}
        />
      </FormControl>
      <FormControl id="files">
        <Input
          type="file"
          accept="image/*"
          bg="white"
          variant="outline"
          {...register("files")}
          onChange={showPreview}
        />
      </FormControl>
    </>
  );
};

export default FormList;
