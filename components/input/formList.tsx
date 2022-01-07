import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { NextPage } from "next";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { Errors, SubmitFormData } from "../../models/interface";

const today = new Date();
const year = today.getFullYear();
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const day = ("0" + today.getDate()).slice(-2);
const date = `${year}-${month}-${day}`;

interface Props {
  register: UseFormRegister<SubmitFormData>;
  showPreview: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Errors;
  dateFromCalendar?: string | string[];
}

const FormList: NextPage<Props> = ({
  register,
  showPreview,
  errors,
  dateFromCalendar,
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
      <FormControl id="title">
        <Input
          type="text"
          bg="white"
          variant="outline"
          placeholder="タイトル"
          required
          {...register("title", { maxLength: 12 })}
        />
        {errors.title && (
          <Text mt={2} color="red" fontSize="16px">
            ※12文字以内にしてください
          </Text>
        )}
      </FormControl>
      <HStack justify="space-between">
        <FormControl id="category" w="60%">
          <Select bg="white" defaultValue="" required {...register("category")}>
            <option value="">カテゴリ</option>
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
      </HStack>
      <FormControl id="text">
        <Input
          type="text"
          bg="white"
          variant="outline"
          placeholder="メモ"
          {...register("memo")}
        />
      </FormControl>
      <FormControl id="date">
        <Input
          type="date"
          bg="white"
          variant="outline"
          defaultValue={dateFromCalendar ? dateFromCalendar : date}
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
