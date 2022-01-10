import React from "react";

import { Input, FormControl, FormLabel, Button } from "@chakra-ui/react";
import { VStack, Text, Box } from "@chakra-ui/layout";
import { NextPage } from "next";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Signup, SignupErrors } from "../../models/interface";
import PageLink from "../common/pageLink";

interface Props {
  handleSubmit: UseFormHandleSubmit<Signup>;
  register: UseFormRegister<Signup>;
  submitData: (data: Signup) => Promise<void>;
  errors: SignupErrors;
  msg: string;
}

const SignupForm: NextPage<Props> = ({
  handleSubmit,
  register,
  submitData,
  errors,
  msg
}) => {
  return (
    <>
      <Text>新規登録</Text>
      <form onSubmit={handleSubmit(submitData)}>
        <VStack w="80%" m="10px auto" spacing={6}>
          <FormControl id="name">
            <FormLabel>ユーザー名:</FormLabel>
            <Input
              type="name"
              {...register("name")}
              bg="white"
              placeholder="ユーザー名を入力"
              required
            />
          </FormControl>
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
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "6文字以上にしてください",
                },
              })}
              bg="white"
              placeholder="パスワードを入力"
              required
            />
          </FormControl>
          {errors.password && <Text>{errors.password.message}</Text>}
          <Button type="submit">登録</Button>
        </VStack>
      </form>
      <Text color="red.400">{msg}</Text>
      <Text mt={5} fontSize={{base: "14px", md: "18px"}} w="100%">
        ログインは
        <PageLink href="/login" color={"blue.400"} underline={"underLine"}>
          こちら
        </PageLink>
      </Text>
    </>
  );
};

export default SignupForm;
