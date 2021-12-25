import Container from "../components/common/container";
import { NextPage } from "next";
import Head from "next/head";
import { deleteData, monthlyInputData } from "../apiCaller/inputDataQuery";
import InputDataButton from "../components/detail/inputDataButton";

import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../hooks/authProvider";
import BarChart from "../components/common/barChart";
import PieChart from "../components/common/pieChart";
import { DataContext } from "../hooks/dataProvider";
import { divideData } from "../hooks/functions";
import { ExpenseData } from "../models/interface";
import MonthButtonList from "../components/common/monthButtonList";
import InputDataList from "../components/detail/inputDataList";
import FilterList from "../components/detail/filterList";
import { useForm } from "react-hook-form";
import { SortAndSelectData } from "../hooks/sortAndSelectData";
import HeaderAfterLogin from "../components/common/headerAfterLogin";

interface FormData {
  category: string;
  order: string;
  number: string;
}

const Detail: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { currentUser } = useContext(AuthContext);
  const {
    isLarger,
    nowMonth,
    setNowMonth,
    nowYear,
    setNowYear,
    barChart,
    pieChart,
    setPieChart,
    yearlyData,
    monthlyAvg,
    setMonthlyAvg,
    getYearlyData,
  } = useContext(DataContext);
  const {
    dataByCategory,
    setDataByCategory,
    detailData,
    setDetailData,
    maxPage,
    setMaxPage,
    setMonthlyAllData,
    changeDisplay,
    nowPage,
    setNowPage,
    pageLimit,
    setPageLimit,
  } = SortAndSelectData();

  const [expenseData, setExpenseData] = useState<ExpenseData>({
    daily: 0,
    food: 0,
    rent: 0,
    util: 0,
    traffic: 0,
    enter: 0,
    tax: 0,
    otherExpense: 0,
    totalPrice: 0,
  });

  const defaultValues: FormData = {
    category: "すべて",
    order: "date",
    number: "5",
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
      traffic: 0,
      enter: 0,
      tax: 0,
      otherExpense: 0,
      totalPrice: 0,
    };

    const { data }: any = await monthlyInputData(Number(month), nowYear);
    if (data) {
      divideData(data, allexpenseData);
      const { food, daily, rent, util, traffic, enter, tax, otherExpense } =
        allexpenseData;

      const limitedData = data.slice(0, pageLimit);
      let pageLen = Math.ceil(data.length / pageLimit);
      if (pageLen === 0) {
        pageLen = 1;
      }
      setMaxPage(pageLen);

      setPieChart({
        labels: [
          "日用品",
          "食費",
          "家賃",
          "水道、光熱費",
          "交通費",
          "交際費",
          "税、保険等",
          "その他",
        ],
        datasets: [
          {
            data: [daily, food, rent, util, traffic, enter, tax, otherExpense],
            backgroundColor: [
              "rgba(255, 0, 0, 0.2)",
              "rgba(255, 69, 0, 0.2)",
              "rgba(255, 255, 0, 0.2)",
              "rgba(0, 128, 0, 0.2)",
              "rgba(0, 0, 255, 0.2)",
              "rgba(75, 0, 130, 0.2)",
              "rgba(238, 130, 238, 0.2)",
              "#ccc",
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
      getYearlyData(nowYear - 1);
      setNowYear(nowYear - 1);
    } else if (otherMonth > 12) {
      otherMonth = 1;
      getYearlyData(nowYear + 1);
      setNowYear(nowYear + 1);
    }

    setMonthlyAvg(monthlyAvg);
    setNowMonth(otherMonth);
    getDetailData(otherMonth);
    setNowPage(1);
    setPageLimit(5);
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
        <title>detail</title>
      </Head>
      <HeaderAfterLogin />
      <MonthButtonList
        clickShowOtherMonth={clickShowOtherMonth}
        clickShowNowMonth={() => setNowMonth(new Date().getMonth() + 1)}
      />
      {currentUser && (
        <>
          <Container>
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
            <Box w="85%" m="10px auto">
              <FilterList
                handleSubmit={handleSubmit}
                register={register}
                changeDisplay={changeDisplay}
              />
            </Box>

            <InputDataList detailData={detailData} clickDelete={clickDelete} />
            <Text>
              総支出:
              <Text as="span" fontWeight="semibold">
                {" "}
                {expenseData.totalPrice}
              </Text>
              円
            </Text>
            <HStack w="100%" justify="center" spacing={5} mt="10px">
              <InputDataButton
                disabled={nowPage === 1}
                clickHandle={clickGetPrevData}
              >
                &lt;&lt;前の{pageLimit}件
              </InputDataButton>
              <InputDataButton
                disabled={nowPage === maxPage}
                clickHandle={clickGetNextData}
              >
                次の{pageLimit}件&gt;&gt;
              </InputDataButton>
            </HStack>
          </Container>
        </>
      )}
    </>
  );
};

export default Detail;
