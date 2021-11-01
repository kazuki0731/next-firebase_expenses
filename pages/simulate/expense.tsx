import Head from "next/head";
import { NextPage } from "next";
import TitleText from "../../components/titleText";
import Container from "../../components/container";
import { Button } from "@chakra-ui/button";
import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { FormControl } from "@chakra-ui/form-control";

import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../src/firebase";
import useTotalBalance from "../../components/useTotalBalance";

interface FormData {
  daily: number;
  food: number;
  rent: number;
  util: number;
  other1: number;
  other2: number;
  [key: string]: number;
}

const Expense: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const {
    expenses,
    setExpenses,
    incomes,
    balance,
    setBalanse,
    getExpensesData,
    getIncomesData,
    clickChangeIsIncome,
  } = useTotalBalance();

  const getBalanceData = async () => {
    const expense = await getExpensesData();
    const income = await getIncomesData();
    if (expense && income) {
      setBalanse(income.total - expense.total);
      reset(expense.data);
    }
  };

  useEffect(() => {
    getBalanceData();
  }, []);

  const submitData = async (data: FormData) => {
    let total = 0;
    for (let key in data) {
      data[key] = Number(data[key]);
      total = total + data[key];
      if (!data[key]) {
        data[key] = 0;
      }
    }
    const { daily, food, rent, util, other1, other2 } = data;
    try {
      await updateDoc(doc(db, "balances", "expenses"), {
        daily,
        food,
        rent,
        util,
        other1,
        other2,
      });
      setExpenses(total);
      getBalanceData();
    } catch (e: any) {
      // 前回はanyだったが急にunknownになった
      if (e.code) {
      }
    }
  };

  return (
    <>
      <Head>
        <title>simulate</title>
      </Head>
      <TitleText>シミュレート</TitleText>
      <Container>
        <HStack spacing={2} justify="center">
          <Button onClick={() => clickChangeIsIncome("income")}>
            支出/収入
          </Button>
        </HStack>
        <form>
          <Box m={2}>
            <Text fontSize="25px">
              総収入: <strong>{incomes}</strong> 円
            </Text>
            <Text fontSize="25px">
              総支出: <strong>-{expenses}</strong> 円
            </Text>
            <Text fontSize="25px">
              収支: <strong>{balance}</strong> 円
            </Text>
          </Box>
          <VStack w={["95%", "80%", "60%", "55%"]} m="0 auto" spacing={3}>
            <FormControl id="daily">
              <InputGroup>
                <InputLeftAddon>日用品</InputLeftAddon>
                <Input
                  type="number"
                  bg="white"
                  placeholder="金額"
                  {...register("daily")}
                />
                <InputRightAddon>円</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl id="food">
              <InputGroup>
                <InputLeftAddon>食費</InputLeftAddon>
                <Input
                  type="number"
                  bg="white"
                  placeholder="金額"
                  {...register("food")}
                />
                <InputRightAddon>円</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl id="rent">
              <InputGroup>
                <InputLeftAddon>家賃</InputLeftAddon>
                <Input
                  type="number"
                  bg="white"
                  placeholder="金額"
                  {...register("rent")}
                />
                <InputRightAddon>円</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl id="util">
              <InputGroup>
                <InputLeftAddon>光熱費</InputLeftAddon>
                <Input
                  type="number"
                  bg="white"
                  placeholder="金額"
                  {...register("util")}
                />
                <InputRightAddon>円</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl id="other1">
              <InputGroup>
                <InputLeftAddon>その他</InputLeftAddon>
                <Input type="text" bg="white" placeholder="カテゴリ名" />
                <Input
                  type="number"
                  bg="white"
                  placeholder="金額"
                  {...register("other1")}
                />
                <InputRightAddon>円</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl id="other2">
              <InputGroup>
                <InputLeftAddon>その他</InputLeftAddon>
                <Input type="text" bg="white" placeholder="カテゴリ名" />
                <Input
                  type="number"
                  bg="white"
                  placeholder="金額"
                  {...register("other2")}
                />
                <InputRightAddon>円</InputRightAddon>
              </InputGroup>
            </FormControl>
            <HStack>
              <Button type="submit" onClick={handleSubmit(submitData)}>
                変更
              </Button>
            </HStack>
          </VStack>
        </form>
      </Container>
    </>
  );
};

export default Expense;
