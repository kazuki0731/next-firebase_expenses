import Container from "../components/common/container";
import { NextPage } from "next";
import Head from "next/head";
import TitleText from "../components/common/titleText";
import {
  deleteData,
  monthlyInputData,
  monthlyNextData,
  monthlyPrevData,
} from "../hooks/api/getInputData";
import InputDataButton from "../components/detail/inputDataButton";

import { HStack, Text, VStack } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../hooks/provider/authProvider";
import BarChart from "../components/common/barChart";
import PieChart from "../components/common/pieChart";
import { DataContext } from "../hooks/provider/dataProvider";
import { divideData } from "../util/functions";
import { ExpenseData, InputData } from "../models/interface";
import MonthButtonList from "../components/common/monthButtonList";
import InputDataList from "../components/detail/inputDataList";

const pageLimit = 5;

const Total: NextPage = () => {
  const { currentUser } = useContext<any>(AuthContext);
  const { nowMonth, setNowMonth, barChart, pieChart, setPieChart } =
    useContext(DataContext);
  const { isLarger } = useContext(DataContext);

  const [prevData, setPrevData] = useState({});
  const [nextData, setNextData] = useState({});
  const [nowPage, setNowPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [detailData, setDetailData] = useState<InputData[]>([]);
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    daily: 0,
    food: 0,
    rent: 0,
    util: 0,
    otherExpense: 0,
    totalPrice: 0,
  });

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
    const result = await monthlyInputData(month);

    if (result) {
      divideData(result.data, allexpenseData);
      const limitedData = result.data.slice(0, pageLimit);
      const { food, daily, rent, util, otherExpense } = allexpenseData;
      const pageLen = Math.ceil(result.data.length / pageLimit);
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
      setDetailData(limitedData);
      setNextData(result.nextDoc);
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
    setNextData({});
    setNowPage(1);
  };

  const clickGetNextData = async (
    month: string | string[] | number | undefined
  ) => {
    month = ("0" + month).slice(-2);
    const result = await monthlyNextData(month, pageLimit, nextData);

    if (result) {
      setNextData(result.nextDoc);
      setPrevData(result.prevDoc);
      setDetailData(result.snapData);
      setNowPage(nowPage + 1);
    }
  };

  const clickGetPrevData = async (
    month: string | string[] | number | undefined
  ) => {
    month = ("0" + month).slice(-2);
    const result = await monthlyPrevData(month, pageLimit, prevData);

    if (result) {
      setDetailData(result.data);
      setNextData(result.nextDoc);
      setPrevData(result.prevDoc);
    }
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
          <InputDataList detailData={detailData} clickDelete={clickDelete} />
          <HStack w="100%" justify="center" spacing={5}>
            <InputDataButton
              disabled={nowPage === 1}
              clickHandle={() => clickGetPrevData(nowMonth)}
            >
              &lt;&lt;前の5件
            </InputDataButton>
            <InputDataButton
              disabled={nowPage === maxPage}
              clickHandle={() => clickGetNextData(nowMonth)}
            >
              次の5件&gt;&gt;
            </InputDataButton>
          </HStack>
        </Container>
      )}
      <MonthButtonList
        clickShowOtherMonth={clickShowOtherMonth}
        clickShowNowMonth={() => setNowMonth(new Date().getMonth() + 1)}
      />
    </>
  );
};

export default Total;
