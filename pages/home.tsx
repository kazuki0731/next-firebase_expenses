import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/provider/authProvider";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import HeaderBeforeLogin from "../components/common/headerBeforeLogin";
import Head from "next/head";
import { NextPage } from "next";
import { Text, HStack, useMediaQuery, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { postData } from "../apiCaller/inputDataQuery";
import { SubmitFormData } from "../models/interface";
import RecentlyInput from "../components/home/recentlyInput";
import SimpleInput from "../components/home/simpleInput";
import TotalBalance from "../components/home/totalBalance";
import CategoryChart from "../components/home/categoryChart";
import { useGetInputData, useGetTotalData } from "../hooks/home";

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmitFormData>();
  const { loginUser } = useContext(AuthContext);
  const { recentInputData, getRecentlyInputData } = useGetInputData();
  const { pieChart, recentExpenseData, getInitTotalData } = useGetTotalData();
  const [isLarger] = useMediaQuery("(min-width: 768px)");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!loginUser) return;
    getRecentlyInputData();
    getInitTotalData();
  }, [loginUser]);

  // かんたん入力でのデータ送信時
  const submitInputData = async (data: SubmitFormData) => {
    const resultData = await postData(data);
    if (!resultData) return;
    setMsg(resultData.text);
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
              <HStack
                w="100%"
                p="5px"
                justify="center"
                spacing="30px"
                m="30px auto"
              >
                <SimpleInput
                  handleSubmit={handleSubmit}
                  register={register}
                  submitInputData={submitInputData}
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
                  submitInputData={submitInputData}
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
