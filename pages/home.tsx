import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/authProvider";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import HeaderBeforeLogin from "../components/common/headerBeforeLogin";
import Head from "next/head";
import { NextPage } from "next";
import { VStack } from "@chakra-ui/layout";
import { Divider, Icon } from "@chakra-ui/react";

import { Text, Box, HStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  postData,
  recentlyInputData,
  recentlyMonthlyInputData,
} from "../apiCaller/inputDataQuery";
import SimpleFormList from "../components/home/simpleFormList";
import SimpleFormSpace from "../components/home/simpleFormSpace";
import {
  AllCategoryData,
  Chart,
  InputData,
  SubmitFormData,
} from "../models/interface";
import dayjs from "dayjs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import PageLink from "../components/common/pageLink";
import { divideData } from "../util/functions";
import SmallPieChart from "../components/home/smallPieChart";

const initCategoryData = {
  daily: 0,
  food: 0,
  traffic: 0,
  enter: 0,
  fixed: 0,
  salary: 0,
  otherExpense: 0,
  otherIncome: 0,
  totalExpensePrice: 0,
  totalIncomePrice: 0,
  totalBalancePrice: 0,
};

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmitFormData>();
  const { loginUser } = useContext(AuthContext);
  const [pieChart, setPieChart] = useState<Chart>({ labels: [], datasets: [] });
  const [msg, setMsg] = useState("");
  const [recentInputData, setRecentInputData] = useState<InputData[]>([]);
  const [recentExpenseData, setRecentExpenseData] =
    useState<AllCategoryData>(initCategoryData);

  const getRecentlyInputData = async () => {
    const result = await recentlyInputData();
    if (!result) return;
    setRecentInputData(result);
  };

  const getInitTotalData = async () => {
    const inputData = await recentlyMonthlyInputData();
    if (!inputData) return;
    const priceDataByCategory = divideData(inputData);
    setRecentExpenseData(priceDataByCategory);
    const { food, daily, traffic, enter, fixed, otherExpense } =
      priceDataByCategory;
    setPieChart({
      labels: ["日用品", "食費", "交通費", "交際費", "固定費", "その他"],
      datasets: [
        {
          data: [daily, food, traffic, enter, fixed, otherExpense],
          backgroundColor: [
            "rgba(255, 0, 0, 0.2)",
            "rgba(255, 69, 0, 0.2)",
            "rgba(255, 255, 0, 0.2)",
            "rgba(0, 128, 0, 0.2)",
            "rgba(0, 0, 255, 0.2)",
            "#ccc",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  useEffect(() => {
    if (!loginUser) return;
    getRecentlyInputData();
    getInitTotalData();
  }, [loginUser]);

  const submitData = async (data: SubmitFormData) => {
    const { text } = await postData(data);
    setMsg(text);
    reset();
    getRecentlyInputData();
    getInitTotalData();
  };

  return (
    <>
      <Head>
        <title>home</title>
      </Head>
      {loginUser ? (
        <>
          <HeaderAfterLogin />
          <HStack w="100%" justify="center" spacing="30px" m="30px auto">
            <SimpleFormSpace text="かんたん入力">
              <form onSubmit={handleSubmit(submitData)}>
                <VStack spacing="10px" alignItems="left">
                  <SimpleFormList register={register} errors={errors} />
                </VStack>
              </form>
              {msg && (
                <Text mt={2} color={msg === "登録しました" ? "black" : "red"}>
                  {msg}
                </Text>
              )}
            </SimpleFormSpace>
            <SimpleFormSpace text="最近の入出">
              <Box mt="30px">
                {recentInputData.map((inputData) => (
                  <Box key={inputData.id} mb="10px">
                    <HStack justify="space-between">
                      <Box>
                        <Text fontSize="22px" as="span">
                          {dayjs(inputData.date).format("YYYY/M/D")}
                        </Text>
                        <Text fontSize="22px" as="span">
                          {" "}
                          ({inputData.category})
                        </Text>
                      </Box>
                      <Text
                        fontSize="22px"
                        color={inputData.isExpense ? "#000" : "blue"}
                        as="span"
                      >
                        {" "}
                        {inputData.price}円
                      </Text>
                    </HStack>
                    <Divider />
                  </Box>
                ))}
              </Box>
              <Box mt="50px" textAlign="right">
                <PageLink href="/calendar">
                  <Text color="blue.500" fontSize="21px">
                    <Icon
                      verticalAlign="text-top"
                      as={BsFillArrowRightCircleFill}
                    />{" "}
                    カレンダーで見る
                  </Text>
                </PageLink>
              </Box>
            </SimpleFormSpace>
          </HStack>
          <HStack w="100%" justify="center" spacing="30px" m="30px auto">
            <SimpleFormSpace text={`${new Date().getMonth() + 1}月の収支`}>
              <Box mt="60px">
                <HStack justify="space-between">
                  <Text as="span">当月収入:</Text>
                  <Text as="span">{recentExpenseData.totalIncomePrice}円</Text>
                </HStack>
                <Divider my="5px" />
                <HStack justify="space-between">
                  <Text as="span">当月支出:</Text>
                  <Text as="span">{recentExpenseData.totalExpensePrice}円</Text>
                </HStack>
                <Divider my="5px" />
                <HStack justify="space-between">
                  <Text as="span">当月収支:</Text>
                  <Text as="span">{recentExpenseData.totalBalancePrice}円</Text>
                </HStack>
                <Divider my="5px" />
              </Box>

              <Box mt="65px" textAlign="right">
                <PageLink href="/total">
                  <Text color="blue.500" fontSize="21px">
                    <Icon
                      verticalAlign="text-top"
                      as={BsFillArrowRightCircleFill}
                    />{" "}
                    詳しく見る
                  </Text>
                </PageLink>
              </Box>
            </SimpleFormSpace>
            <SimpleFormSpace text="カテゴリ別支出">
              <SmallPieChart pieChart={pieChart} />
              <Box textAlign="right">
                <PageLink href="/detail">
                  <Text color="blue.500" fontSize="21px">
                    <Icon
                      verticalAlign="text-top"
                      as={BsFillArrowRightCircleFill}
                    />{" "}
                    詳しく見る
                  </Text>
                </PageLink>
              </Box>
            </SimpleFormSpace>
          </HStack>
        </>
      ) : (
        <>
          <HeaderBeforeLogin />
          <Text mt={5}>会員専用ページです</Text>
        </>
      )}
    </>
  );
};

export default Home;
