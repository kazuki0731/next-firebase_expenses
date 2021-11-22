import Container from "../components/common/container";
import { NextPage } from "next";
import Head from "next/head";
import TitleText from "../components/common/titleText";
import { deleteData, monthlyInputData } from "../apiCaller/inputDataQuery";
import InputDataButton from "../components/detail/inputDataButton";

import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../hooks/authProvider";
import BarChart from "../components/common/barChart";
import PieChart from "../components/common/pieChart";
import { DataContext } from "../hooks/dataProvider";
import { divideData } from "../hooks/functions";
import { ExpenseData, InputData } from "../models/interface";
import MonthButtonList from "../components/common/monthButtonList";
import InputDataList from "../components/detail/inputDataList";
import FilterList from "../components/detail/filterList";
import { useForm } from "react-hook-form";

const pageLimit = 5;

interface FormData {
  category: string;
  order: string;
}

const Total: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { currentUser } = useContext(AuthContext);
  const { nowMonth, setNowMonth, barChart, pieChart, setPieChart } =
    useContext(DataContext);
  const { isLarger } = useContext(DataContext);

  const [dataByCategory, setDataByCategory] = useState<InputData[]>([]);
  const [nowPage, setNowPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [monthlyAllData, setMonthlyAllData] = useState<InputData[]>([]);
  const [detailData, setDetailData] = useState<InputData[]>([]);
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    daily: 0,
    food: 0,
    rent: 0,
    util: 0,
    otherExpense: 0,
    totalPrice: 0,
  });

  const defaultValues: FormData = {
    category: "すべて",
    order: "date",
  };

  const getDetailData = async (
    month: string | string[] | number | undefined
  ) => {
    month = ("0" + month).slice(-2);
    let allexpenseData = {
      daily: 0,
      food: 0,
      rent: 0,
      util: 0,
      otherExpense: 0,
      totalPrice: 0,
    };

    const { data }: any = await monthlyInputData(month);
    if (data) {
      divideData(data, allexpenseData);
      const { food, daily, rent, util, otherExpense } = allexpenseData;

      const limitedData = data.slice(0, pageLimit);
      const pageLen = Math.ceil(data.length / pageLimit);
      setMaxPage(pageLen);

      setPieChart({
        labels: ["日用品", "食費", "家賃", "光熱費", "その他"],
        datasets: [
          {
            data: [daily, food, rent, util, otherExpense],
            backgroundColor: [
              "rgba(255, 99, 132, 0.4)",
              "rgba(255, 159, 64, 0.4)",
              "rgba(255, 205, 86, 0.4)",
              "rgba(75, 192, 192, 0.4)",
              "rgba(54, 162, 235, 0.4)",
            ],
            borderWidth: 1,
          },
        ],
      });
      setMonthlyAllData(data);
      setDataByCategory(data);
      setDetailData(limitedData);
      setExpenseData(allexpenseData);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getDetailData(nowMonth);
    }
  }, [nowMonth, currentUser]);

  const clickShowOtherMonth = (otherMonth: number) => {
    if (otherMonth <= 0) {
      otherMonth = 12;
    } else if (otherMonth > 12) {
      otherMonth = 1;
    }
    setNowMonth(otherMonth);
    getDetailData(otherMonth);
    setNowPage(1);
    reset(defaultValues);
  };

  const clickGetNextData = async () => {
    const limitedData = dataByCategory.slice(
      nowPage * pageLimit,
      (nowPage + 1) * pageLimit
    );
    setDetailData(limitedData);
    setNowPage(nowPage + 1);
  };

  const clickGetPrevData = async () => {
    const limitedData = dataByCategory.slice(
      (nowPage - 2) * pageLimit,
      (nowPage - 1) * pageLimit
    );
    setDetailData(limitedData);
    setNowPage(nowPage - 1);
  };

  const clickDelete = (id: string) => {
    deleteData(id);
    getDetailData(nowMonth);
  };

  return (
    <>
      <Head>
        <title>total</title>
      </Head>
      <TitleText>{nowMonth}月</TitleText>
      {currentUser && (
        <>
          <Container>
            <Text mb={5} fontWeight="semibold">
              総計: {expenseData.totalPrice}円
            </Text>
            {isLarger ? (
              <HStack mb={5} justify="center" spacing={10}>
                <BarChart barChart={barChart} />
                <PieChart pieChart={pieChart} />
              </HStack>
            ) : (
              <VStack mb={5} justify="center" spacing={10}>
                <BarChart barChart={barChart} />
                <PieChart pieChart={pieChart} />
              </VStack>
            )}
            <Box w="82%" m="10px auto">
              <FilterList
                handleSubmit={handleSubmit}
                register={register}
                setMaxPage={setMaxPage}
                setDetailData={setDetailData}
                setDataByCategory={setDataByCategory}
                setNowPage={setNowPage}
                monthlyAllData={monthlyAllData}
                pageLimit={pageLimit}
              />
            </Box>
            <InputDataList detailData={detailData} clickDelete={clickDelete} />
            <HStack w="100%" justify="center" spacing={5}>
              <InputDataButton
                disabled={nowPage === 1}
                clickHandle={clickGetPrevData}
              >
                &lt;&lt;前の5件
              </InputDataButton>
              <InputDataButton
                disabled={nowPage === maxPage}
                clickHandle={clickGetNextData}
              >
                次の5件&gt;&gt;
              </InputDataButton>
            </HStack>
          </Container>
          <MonthButtonList
            clickShowOtherMonth={clickShowOtherMonth}
            clickShowNowMonth={() => setNowMonth(new Date().getMonth() + 1)}
          />
        </>
      )}
    </>
  );
};

export default Total;
