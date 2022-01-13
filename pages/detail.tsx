import { NextPage } from "next";
import Head from "next/head";
import { deleteInputData } from "../apiCaller/inputDataQuery";
import InputDataButton from "../components/detail/inputDataButton";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/provider/authProvider";
import MonthButtonList from "../components/common/monthButtonList";
import InputDataList from "../components/common/inputDataList";
import FilterList from "../components/detail/filterList";
import { useForm } from "react-hook-form";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import IncomeChart from "../components/detail/incomeChart";
import { current } from "../const/date";
import { Filter } from "../models/interface";
import PieChart from "../components/common/expenseChart";
import { useMediaQuery } from "@chakra-ui/react";
import { useGetDetailData } from "../hooks/detail";
import { changeMonthAndYear } from "../util/function";

const defaultValue: Filter = {
  category: "すべて",
  number: "5",
  order: "asc",
};

const Detail: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<Filter>();
  const { loginUser } = useContext(AuthContext);
  const [nowMonth, setNowMonth] = useState<number>(current.month);
  const [nowYear, setNowYear] = useState<number>(current.year);
  const [isLarger] = useMediaQuery("(min-width: 768px)");

  const {
    pageLimit,
    setPageLimit,
    dataByCategory,
    maxPage,
    detailData,
    setDetailData,
    pieChart,
    nowPage,
    setNowPage,
    getInitData,
    filterData,
  } = useGetDetailData();

  useEffect(() => {
    if (loginUser) {
      getInitData(nowYear, nowMonth);
    }
  }, [loginUser]);

  const clickShowOtherMonth = (year: number, otherMonth: number) => {
    const { newMonth, newYear } = changeMonthAndYear(year, otherMonth);
    setNowYear(newYear);
    setNowMonth(newMonth);
    setNowPage(1);
    setPageLimit(5);
    reset(defaultValue);
    getInitData(newYear, newMonth);
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

  const clickShowCurrentMonth = () => {
    getInitData(current.year, current.month);
    setNowMonth(current.month);
    setNowYear(current.year);
  };

  const clickDelete = (id: string | undefined) => {
    if (!id) return;
    deleteInputData(id);
    getInitData(nowYear, nowMonth);
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
        clickShowCurrentMonth={clickShowCurrentMonth}
      />
      {loginUser && (
        <>
          {isLarger ? (
            <HStack
              alignItems="flex-start"
              h="350px"
              spacing="5px"
              w={{ base: "100%", md: "85%", lg: "850px" }}
              m="0 auto"
            >
              <PieChart pieChart={pieChart.expense} chartTitle="支出" />
              <IncomeChart pieChart={pieChart.income} chartTitle="収入" />
            </HStack>
          ) : (
            <VStack spacing={8}>
              <PieChart pieChart={pieChart.expense} chartTitle="支出" />
              <IncomeChart pieChart={pieChart.income} chartTitle="収入" />
            </VStack>
          )}
          <Box
            border="1px solid #aaa"
            p="20px"
            w={{ base: "350px", sm: "85%", md: "85%", lg: "850px" }}
            bg="#fff"
            m="10px auto"
          >
            <FilterList
              handleSubmit={handleSubmit}
              register={register}
              filterData={filterData}
            />
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
          </Box>
        </>
      )}
    </>
  );
};

export default Detail;
