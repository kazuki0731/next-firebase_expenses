import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import { NextPage } from "next";
import { AuthContext } from "../hooks/provider/authProvider";
import TotalDataByCategory from "../components/total/totalDataByCategory";
import MonthButtonList from "../components/common/monthButtonList";
import BarChart from "../components/common/barChart";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import { current } from "../const/date";
import { useGetCategoryData, useGetYearlyData } from "../hooks/total";
import { changeMonthAndYear } from "../util/function";

const Total: NextPage = () => {
  const { loginUser } = useContext(AuthContext);
  const { allDataBycategory, getCategoryData } = useGetCategoryData();
  const { barChart, monthlyAvg, getYearlyData, selectedBalance } =
    useGetYearlyData();
  const [isLarger] = useMediaQuery("(min-width: 768px)");
  const [nowMonth, setNowMonth] = useState<number>(current.month);
  const [nowYear, setNowYear] = useState<number>(current.year);

  useEffect(() => {
    if (!loginUser) return;
    getCategoryData(nowYear, nowMonth);
    getYearlyData(nowYear);
  }, [loginUser]);

  // グラフの表示項目を変更する
  const changeBalance = (text: string) => {
    getYearlyData(nowYear, text);
  };

  // 表示月を変更させる
  const clickShowOtherMonth = (year: number, otherMonth: number) => {
    const { newMonth, newYear } = changeMonthAndYear(year, otherMonth);
    setNowMonth(newMonth);
    setNowYear(newYear);
    getYearlyData(newYear, selectedBalance);
    getCategoryData(newYear, newMonth);
  };

  // 表示月を今月に戻す
  const clickShowCurrentMonth = () => {
    setNowMonth(current.month);
    setNowYear(current.year);
    getCategoryData(current.year, current.month);
    getYearlyData(current.year);
  };


  return (
    <>
      <Head>
        <title>total</title>
      </Head>
      <HeaderAfterLogin />
      <MonthButtonList
        nowMonth={nowMonth}
        nowYear={nowYear}
        clickShowOtherMonth={clickShowOtherMonth}
        clickShowCurrentMonth={clickShowCurrentMonth}
      />
      {loginUser && (
        <>
          <BarChart
            monthlyAvg={monthlyAvg}
            nowYear={nowYear}
            barChart={barChart}
            selectedBalance={selectedBalance}
            changeBalance={changeBalance}
          />
          {isLarger ? (
            <Box w={{ base: "350px", md: "85%", lg: "850px" }} m="0 auto 30px">
              <HStack>
                <TotalDataByCategory allDataByCategory={allDataBycategory} />
              </HStack>
            </Box>
          ) : (
            <VStack>
              <TotalDataByCategory allDataByCategory={allDataBycategory} />
            </VStack>
          )}
        </>
      )}
    </>
  );
};

export default Total;
