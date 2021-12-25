import { FormControl } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { NextPage } from "next";
import { FieldError, UseFormRegister } from "react-hook-form";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/input";
import { Text } from "@chakra-ui/react";

interface FormData {
  price: number;
  title: string;
  category: string;
  memo: string;
  date: Date;
  files?: File[];
}

interface Props {
  register: UseFormRegister<FormData>;
  errors: {
    price?: FieldError | undefined;
    title?: FieldError | undefined;
    category?: FieldError | undefined;
    memo?: FieldError | undefined;
    date?: FieldError | undefined;
  };
}

const FormList: NextPage<Props> = ({ register, errors }) => {
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
          <option value="">カテゴリを選択</option>
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
      {/* <FormControl id="date">
        <Input
          type="file"
          accept="image/*"
          bg="white"
          variant="outline"
          {...register("files")}
          multiple
        />
      </FormControl> */}
    </>
  );
};

export default FormList;
