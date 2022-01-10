import React from "react";
import { Text, VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import FormSpace from "../input/formSpace";
import PageLink from "../common/pageLink";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Login } from "../../models/interface";
import { NextPage } from "next";

interface Props {
  handleSubmit: UseFormHandleSubmit<Login>;
  register: UseFormRegister<Login>;
  submitData: (data: Login) => Promise<void>;
  msg: string;
}
const LoginForm: NextPage<Props> = ({
  handleSubmit,
  register,
  msg,
  submitData,
}) => {
  return (
    <FormSpace>
      <Text>ログイン</Text>
      <form onSubmit={handleSubmit(submitData)}>
        <VStack w="80%" m="10px auto" spacing={6}>
          <FormControl id="email">
            <FormLabel>メールアドレス:</FormLabel>
            <Input
              type="email"
              {...register("email")}
              bg="white"
              placeholder="メールアドレスを入力"
              required
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>パスワード:</FormLabel>
            <Input
              type="password"
              {...register("password")}
              bg="white"
              placeholder="パスワードを入力"
              required
            />
          </FormControl>
          <Button type="submit">ログイン</Button>
          {msg && <Text color="red">{msg}</Text>}
          <Text fontSize={{ base: "14px", md: "18px" }} w="100%">
            新規登録は
            <PageLink href="/signup" color={"blue.400"} underline={"underLine"}>
              こちら
            </PageLink>
          </Text>
        </VStack>
      </form>
    </FormSpace>
  );
};

export default LoginForm;
