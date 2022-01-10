import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import { Button, HStack } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { NextPage } from "next";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { CategoryErrors, SubmitFormData } from "../../models/interface";

const today = new Date();
const year = today.getFullYear();
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const day = ("0" + today.getDate()).slice(-2);
const date = `${year}-${month}-${day}`;

interface Props {
  register: UseFormRegister<SubmitFormData>;
  errors: CategoryErrors;
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
          h={{ base: "30px", md: "35px" }}
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
          h={{ base: "30px", md: "35px" }}
          {...register("title", { maxLength: 12 })}
        />
        {errors.title && (
          <Text mt={2} color="red" fontSize="16px">
            ※12文字以内にしてください
          </Text>
        )}
      </FormControl>
      <FormControl id="category" w="60%">
        <Select
          h={{ base: "30px", md: "35px" }}
          bg="white"
          defaultValue=""
          required
          {...register("category")}
        >
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
      <FormControl id="date">
        <Input
          type="date"
          bg="white"
          variant="outline"
          defaultValue={date}
          required
          h={{ base: "30px", md: "35px" }}
          {...register("date")}
        />
      </FormControl>
      <Input type="hidden" {...register("memo")} />
      <Input type="hidden" {...register("files")} />
      <Button type="submit" h={{ base: "30px", md: "35px" }}>
        送信
      </Button>
    </>
  );
};

export default FormList;
