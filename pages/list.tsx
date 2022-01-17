import { NextPage } from "next";
import Head from "next/head";
import { deleteInputData } from "../apiCaller/inputDataQuery";
import InputDataButton from "../components/list/inputDataButton";
import { Box, HStack, VStack } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/provider/authProvider";
import MonthButtonList from "../components/common/monthButtonList";
import InputDataList from "../components/common/inputDataList";
import FilterList from "../components/list/filter";
import { useForm } from "react-hook-form";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import IncomeChart from "../components/list/incomeChart";
import { current } from "../const/date";
import { Filter } from "../models/interface";
import PieChart from "../components/common/expenseChart";
import {
  UnorderedList,
  useMediaQuery,
  ListItem,
  Button,
  Text,
} from "@chakra-ui/react";
import { useGetDetailData } from "../hooks/list";
import { changeMonthAndYear } from "../util/function";
import PageNation from "../components/list/pageNation";

const defaultValue: Filter = {
  category: "すべて",
  number: "5",
  order: "asc",
};

const List: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<Filter>();
  const { loginUser } = useContext(AuthContext);
  const [nowMonth, setNowMonth] = useState<number>(current.month);
  const [nowYear, setNowYear] = useState<number>(current.year);
  const [isLarger] = useMediaQuery("(min-width: 768px)");

  const {
    pageLimit,
    setPageLimit,
    dataByCategory,
    pageLen,
    monthlyAllData,
    detailData,
    setDetailData,
    pieChart,
    currentPage,
    setCurrentPage,
    displayPage,
    setDisplayPage,
    getInitData,
    filterData,
  } = useGetDetailData();

  useEffect(() => {
    if (loginUser) {
      getInitData(nowYear, nowMonth);
    }
  }, [loginUser]);

  const clickChangeCurrentPage = (page: number) => {
    if (currentPage <= 3) {
      page += 1;
    } else {
      page = page + (currentPage - 2);
    }
    const limitedData = dataByCategory.slice(
      (page - 1) * pageLimit,
      page * pageLimit
    );
    const displayPage = [];
    const displayInputData = dataByCategory.slice(
      pageLimit * (page <= 2 ? 0 : page - 3),
      pageLimit * (page === 1 ? page + 3 : page + 2)
    );
    for (let i = 0; i < displayInputData.length / pageLimit; i++) {
      displayPage.push(
        displayInputData.slice(pageLimit * i, pageLimit * (i + 1))
      );
    }

    setDisplayPage(displayPage);
    setDetailData(limitedData);
    setCurrentPage(page);
  };

  // １つ先のデータを取得
  const clickGetNextPage = async () => {
    const nextPage = currentPage + 1;
    const limitedData = dataByCategory.slice(
      currentPage * pageLimit,
      nextPage * pageLimit
    );
    const displayPage = [];
    const displayInputData = dataByCategory.slice(
      pageLimit * (nextPage <= 2 ? 0 : nextPage - 3),
      pageLimit * (nextPage === 1 ? nextPage + 3 : nextPage + 2)
    );
    for (let i = 0; i < displayInputData.length / pageLimit; i++) {
      displayPage.push(
        displayInputData.slice(pageLimit * i, pageLimit * (i + 1))
      );
    }

    setDisplayPage(displayPage);
    setDetailData(limitedData);
    setCurrentPage(nextPage);
  };

  // １つ前のデータを取得
  const clickGetPrevPage = async () => {
    const prevPage = currentPage - 1;
    const limitedData = dataByCategory.slice(
      (currentPage - 2) * pageLimit,
      prevPage * pageLimit
    );

    const displayPage = [];
    const displayInputData = dataByCategory.slice(
      pageLimit * (prevPage <= 2 ? 0 : prevPage - 3),
      pageLimit * (prevPage === 1 ? prevPage + 3 : prevPage + 2)
    );
    for (let i = 0; i < displayInputData.length / pageLimit; i++) {
      displayPage.push(
        displayInputData.slice(pageLimit * i, pageLimit * (i + 1))
      );
    }

    setDisplayPage(displayPage);
    setDetailData(limitedData);
    setCurrentPage(prevPage);
  };

  // 削除
  const clickDelete = (id: string | undefined) => {
    if (!id) return;
    deleteInputData(id);
    getInitData(nowYear, nowMonth);
  };

  // 表示月を変更させる時
  const clickShowOtherMonth = (year: number, otherMonth: number) => {
    const { newMonth, newYear } = changeMonthAndYear(year, otherMonth);
    setNowYear(newYear);
    setNowMonth(newMonth);
    setCurrentPage(1);
    setPageLimit(5);
    reset(defaultValue);
    getInitData(newYear, newMonth);
  };

  // 表示月を今月に戻す時
  const clickShowCurrentMonth = () => {
    getInitData(current.year, current.month);
    setNowMonth(current.month);
    setNowYear(current.year);
  };

  return (
    <>
      <Head>
        <title>list</title>
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
                disabled={currentPage === 1}
                clickHandle={clickGetPrevPage}
              >
                &lt;&lt;
              </InputDataButton>
              {/* <PageNation /> */}
              <UnorderedList listStyleType="none">
                <HStack>
                  {displayPage.length !== 0 &&
                    displayPage.map((page, index) => (
                      <ListItem key={index}>
                        <Button
                          disabled={
                            (currentPage > 2 && index === 2) ||
                            (currentPage <= 2 && currentPage === index + 1)
                          }
                          onClick={() => clickChangeCurrentPage(index)}
                        >
                          {(currentPage === 1 && currentPage + index) ||
                            (currentPage === 2 && index + 1) ||
                            (currentPage >= 3 && index + currentPage - 2)}
                        </Button>
                      </ListItem>
                    ))}
                </HStack>
              </UnorderedList>
              <InputDataButton
                disabled={currentPage === pageLen}
                clickHandle={clickGetNextPage}
              >
                &gt;&gt;
              </InputDataButton>
            </HStack>
          </Box>
        </>
      )}
    </>
  );
};

export default List;
