import { FormControl } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { NextPage } from "next";
import { UseFormRegister } from "react-hook-form";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/input";
import { HStack, Text } from "@chakra-ui/react";
import { Errors, InputData } from "../../models/interface";

interface Props {
  register: UseFormRegister<InputData>;
  errors: Errors;
  createdAt: string;
}

const FormList: NextPage<Props> = ({ register, errors, createdAt }) => {
  return (
    <>
      <FormControl id="price">
        <InputGroup>
          <InputLeftAddon
            w={{ base: "90px", md: "110px" }}
            fontSize={{ base: "16px", md: "20px" }}
          >
            金額
          </InputLeftAddon>
          <Input
            fontSize={{ base: "16px", md: "20px" }}
            type="number"
            bg="white"
            {...register("price")}
          />
          <InputRightAddon>円</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="title">
        <InputGroup>
          <InputLeftAddon
            w={{ base: "90px", md: "110px" }}
            fontSize={{ base: "16px", md: "20px" }}
          >
            タイトル
          </InputLeftAddon>
          <Input
            fontSize={{ base: "16px", md: "20px" }}
            type="text"
            bg="white"
            {...register("title", { maxLength: 10 })}
          />
        </InputGroup>
      </FormControl>
      {errors.title && (
        <Text mt={2} color="red" fontSize="16px">
          ※10文字以内にしてください
        </Text>
      )}
      <FormControl id="category" w="60%">
        <Select bg="white" required {...register("category")}>
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
      <FormControl id="memo">
        <InputGroup>
          <InputLeftAddon
            w={{ base: "90px", md: "110px" }}
            fontSize={{ base: "16px", md: "20px" }}
          >
            メモ
          </InputLeftAddon>
          <Input
            fontSize={{ base: "16px", md: "20px" }}
            type="text"
            bg="white"
            {...register("memo")}
          />
        </InputGroup>
      </FormControl>
      <FormControl id="date">
        <InputGroup>
          <InputLeftAddon
            w={{ base: "90px", md: "110px" }}
            fontSize={{ base: "16px", md: "20px" }}
          >
            日付
          </InputLeftAddon>
          <Input
            fontSize={{ base: "16px", md: "20px" }}
            type="date"
            bg="white"
            {...register("date")}
          />
        </InputGroup>
      </FormControl>
      <HStack w="100%" justify="flex-end" spacing="20px">
        <Text>作成日時:</Text>
        <Text>{createdAt}</Text>
      </HStack>
    </>
  );
};

export default FormList;
