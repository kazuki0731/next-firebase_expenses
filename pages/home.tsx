import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/authProvider";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import HeaderBeforeLogin from "../components/common/headerBeforeLogin";
import Head from "next/head";
import { NextPage } from "next";

import {
  Text,
  Box,
  HStack,
  useMediaQuery,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  postData,
  recentlyInputData,
  recentlyMonthlyInputData,
} from "../apiCaller/inputDataQuery";

import {
  AllCategoryData,
  Chart,
  InputData,
  SubmitFormData,
} from "../models/interface";
import { divideData } from "../util/functions";
import RecentlyInput from "../components/home/recentlyInput";
import SimpleInput from "../components/home/simpleInput";
import TotalBalance from "../components/home/totalBalance";
import CategoryChart from "../components/home/categoryChart";

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
  const [isLarger] = useMediaQuery("(min-width: 768px)");

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
          {isLarger ? (
            <>
              <HStack w="100%" p="5px" justify="center" spacing="30px" m="30px auto">
                <SimpleInput
                  handleSubmit={handleSubmit}
                  register={register}
                  submitData={submitData}
                  errors={errors}
                  msg={msg}
                />
                <RecentlyInput recentInputData={recentInputData} />
              </HStack>
              <HStack w="100%" justify="center" spacing="30px" m="30px auto">
                <TotalBalance recentExpenseData={recentExpenseData} />
                <CategoryChart pieChart={pieChart} />
              </HStack>
            </>
          ) : (
            <>
              <VStack justify="center" spacing="30px" m="30px auto">
                <SimpleInput
                  handleSubmit={handleSubmit}
                  register={register}
                  submitData={submitData}
                  errors={errors}
                  msg={msg}
                />
                <RecentlyInput recentInputData={recentInputData} />
                <TotalBalance recentExpenseData={recentExpenseData} />
                <CategoryChart pieChart={pieChart} />
              </VStack>
            </>
          )}
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
