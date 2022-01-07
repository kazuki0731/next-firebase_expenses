import { NextPage } from "next";
import Container from "../components/common/container";
import Head from "next/head";
import { deleteInputData, monthlyInputData } from "../apiCaller/inputDataQuery";
import InputDataButton from "../components/detail/inputDataButton";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/common/hooks/authProvider";
import { divideData } from "../components/common/hooks/functions";
import MonthButtonList from "../components/common/monthButtonList";
import InputDataList from "../components/detail/inputDataList";
import FilterList from "../components/detail/filterList";
import { useForm } from "react-hook-form";
import { SortAndSelectData } from "../components/common/hooks/sortAndSelectData";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import IncomeChart from "../components/common/incomeChart";
import { current } from "../const/date";
import { BalanceChart, Filter } from "../models/interface";
import PieChart from "../components/detail/pieChart";
import { useMediaQuery } from "@chakra-ui/react";



const Detail: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<Filter>();
  const { loginUser } = useContext(AuthContext);
  const [nowMonth, setNowMonth] = useState<number>(current.month);
  const [nowYear, setNowYear] = useState<number>(current.year);
  const [pieChart, setPieChart] = useState<BalanceChart>({
    expense: {
      labels: [],
      datasets: [],
    },
    income: {
      labels: [],
      datasets: [],
    },
  });
  const [isLarger] = useMediaQuery("(min-width: 768px)");
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

  const defaultValue: Filter = {
    category: "すべて",
    number: "5",
  };

  const getDetailData = async (month: number) => {
    const inputData = await monthlyInputData(nowYear, month);
    if (!inputData) return;
    const priceDataByCategory = divideData(inputData);
    const {
      food,
      daily,
      traffic,
      enter,
      fixed,
      otherExpense,
      salary,
      otherIncome,
    } = priceDataByCategory;

    const limitedData = inputData.slice(0, pageLimit);
    let pageLen = Math.ceil(inputData.length / pageLimit);
    if (pageLen === 0) {
      pageLen = 1;
    }
    setMaxPage(pageLen);

    setPieChart({
      expense: {
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
      },
      income: {
        labels: ["給料", "その他"],
        datasets: [
          {
            data: [salary, otherIncome],
            backgroundColor: ["rgba(255, 0, 0, 0.2)", "#ccc"],
            borderWidth: 1,
          },
        ],
      },
    });
    setMonthlyAllData(inputData);
    setDataByCategory(inputData);
    setDetailData(limitedData);
  };

  useEffect(() => {
    if (loginUser) {
      getDetailData(nowMonth);
    }
  }, [nowMonth, loginUser]);

  const clickShowOtherMonth = (otherMonth: number) => {
    if (otherMonth <= 0) {
      otherMonth = 12;
      setNowYear(nowYear - 1);
    } else if (otherMonth > 12) {
      otherMonth = 1;
      setNowYear(nowYear + 1);
    }

    setNowMonth(otherMonth);
    getDetailData(otherMonth);
    setNowPage(1);
    setPageLimit(5);
    reset(defaultValue);
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

  const clickDelete = (id: string | undefined) => {
    if (!id) return;
    deleteInputData(id);
    getDetailData(nowMonth);
  };

  return (
    <>
      <Head>
        <title>detail</title>
      </Head>
      <HeaderAfterLogin />
      <MonthButtonList
        nowMonth={nowMonth}
        nowYear={nowYear}
        clickShowOtherMonth={clickShowOtherMonth}
        clickShowNowMonth={() => setNowMonth(new Date().getMonth() + 1)}
      />
      {loginUser && (
        <>
          <Container>
            {isLarger ? (
              <HStack alignItems="flex-start" h="350px">
                <PieChart pieChart={pieChart.expense} chartTitle="支出" />
                <IncomeChart pieChart={pieChart.income} chartTitle="収入" />
              </HStack>
            ) : (
              <VStack h="540px" spacing={8}>
                <PieChart pieChart={pieChart.expense} chartTitle="支出" />
                <IncomeChart pieChart={pieChart.income} chartTitle="収入" />
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
