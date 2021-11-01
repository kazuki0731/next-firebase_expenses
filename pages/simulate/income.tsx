import Head from "next/head";
import { NextPage } from "next";
import router from "next/router";
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
  salary: number;
  other1: number;
  other2: number;
  [key: string]: number;
}

const Income: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const {
    expenses,
    setIncomes,
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
      reset(income.data);
    }
  };

  useEffect(() => {
    getBalanceData();
  }, []);

  const submitData1 = async (data: FormData) => {
    console.log(data);
    let total = 0;
    for (let key in data) {
      data[key] = Number(data[key]);
      total = total + data[key];
      if (!data[key]) {
        data[key] = 0;
      }
    }
    const { salary, other1, other2 } = data;
    try {
      await updateDoc(doc(db, "balances", "incomes"), {
        salary,
        other1,
        other2,
      });
      setIncomes(total);
      getBalanceData();
    } catch (e: any) {
      // 前回はanyだったが急にunknowになった
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
          <Button onClick={() => clickChangeIsIncome("expense")}>
            支出/収入
          </Button>
        </HStack>
        <form onSubmit={handleSubmit(submitData1)}>
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
            <FormControl id="salary">
              <InputGroup>
                <InputLeftAddon>給料</InputLeftAddon>
                <Input type="number" bg="white" {...register("salary")} />
                <InputRightAddon>円</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl id="other1">
              <InputGroup>
                <InputLeftAddon>その他</InputLeftAddon>
                <Input type="text" bg="white" placeholder="カテゴリ名" />
                <Input type="number" bg="white" {...register("other1")} />
                <InputRightAddon>円</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl id="other2">
              <InputGroup>
                <InputLeftAddon>その他</InputLeftAddon>
                <Input type="text" bg="white" placeholder="カテゴリ名" />
                <Input type="number" bg="white" {...register("other2")} />
                <InputRightAddon>円</InputRightAddon>
              </InputGroup>
            </FormControl>
            <HStack>
              <Button type="submit">変更</Button>
            </HStack>
          </VStack>
        </form>
      </Container>
    </>
  );
};

export default Income;
