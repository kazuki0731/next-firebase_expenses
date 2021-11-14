import Container from "../components/container";
import { NextPage } from "next";
import Head from "next/head";
import TitleText from "../components/titleText";
import {
  deleteData,
  monthlyInputData,
  monthlyNextData,
  monthlyPrevData,
} from "../hooks/api/getData";

import { Box, HStack, ListItem, Text, UnorderedList } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";

import { Button, Divider } from "@chakra-ui/react";
import dayjs from "dayjs";
import { AuthContext } from "../hooks/authProvider";
import PageLink from "../components/pageLink";
import MonthButton from "../components/monthButton";
import BarChart from "../components/barChart";
import PieChart from "../components/pieChart";
import { DataContext } from "../hooks/dataProvider";

const pageLimit = 5;

interface InputData {
  id: string;
  category: string;
  date: string;
  price: number;
  text: string;
}

interface expenseData {
  daily: number;
  food: number;
  rent: number;
  util: number;
  otherExpense: number;
  totalPrice?: number;
}

const Total: NextPage = () => {
  const { currentUser } = useContext<any>(AuthContext);
  const { nowMonth, setNowMonth, barChart, pieChart, setPieChart } =
    useContext<any>(DataContext);

  const [prevData, setPrevData] = useState({});
  const [nextData, setNextData] = useState({});
  const [nowPage, setNowPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [detailData, setDetailData] = useState<InputData[]>([]);
  const [expenseData, setExpenseData] = useState<expenseData>({
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
      result.data.forEach((item) => {
        switch (item.category) {
          case "食費":
            allexpenseData.food += item.price;
            break;
          case "日用品":
            allexpenseData.daily += item.price;
            break;
          case "家賃":
            allexpenseData.rent += item.price;
            break;
          case "光熱費":
            allexpenseData.util += item.price;
            break;
          case "その他":
            allexpenseData.otherExpense += item.price;
            break;
        }
        allexpenseData.totalPrice += item.price;
      });

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

  const clickDelete = async (id: string) => {
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
            {" "}
            総計: {expenseData.totalPrice}円
          </Text>
          <HStack mb={5} justify="center" spacing={10}>
            <BarChart barChart={barChart} />
            <PieChart pieChart={pieChart} />
          </HStack>
          <UnorderedList
            w="90%"
            m="0 auto 10px auto"
            listStyleType="none"
            fontSize="20px"
          >
            {detailData.map((data) => (
              <Box key={data.id}>
                <ListItem>
                  <HStack justify="space-between">
                    <Box>
                      <span> {dayjs(data.date).format("MM/DD(ddd)")} </span>
                      <span> {data.text} </span>
                      <span> ({data.category})</span>
                    </Box>
                    <Box>
                      <span> {data.price}円 </span>
                      <PageLink
                        href={{
                          pathname: "/edit",
                          query: { id: data.id },
                        }}
                        url={`/edit`}
                      >
                        <Button m={1.5} fontSize="14px" h="32px" w="50px">
                          編集
                        </Button>
                      </PageLink>
                      <Button
                        m={1.5}
                        fontSize="14px"
                        h="32px"
                        w="50px"
                        onClick={() => clickDelete(data.id)}
                      >
                        削除
                      </Button>
                    </Box>
                  </HStack>
                </ListItem>
                <Divider borderColor="black" />
              </Box>
            ))}
          </UnorderedList>
          <HStack w="100%" justify="center" spacing={5}>
            <Button
              disabled={nowPage === 1}
              onClick={() => clickGetPrevData(nowMonth)}
            >
              &lt;&lt;前の5件
            </Button>
            <Button
              disabled={nowPage === maxPage}
              onClick={() => clickGetNextData(nowMonth)}
            >
              次の5件&gt;&gt;
            </Button>
          </HStack>
        </Container>
      )}
      <MonthButton
        clickShowOtherMonth={clickShowOtherMonth}
        clickShowNowMonth={() => setNowMonth(new Date().getMonth() + 1)}
        nowMonth={nowMonth}
      />
    </>
  );
};

export default Total;
