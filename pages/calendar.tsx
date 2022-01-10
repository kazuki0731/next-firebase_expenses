import { Box, Text, HStack } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/authProvider";
import Head from "next/head";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import { EventClickArg } from "@fullcalendar/react";
import { DateClickArg } from "@fullcalendar/interaction";
import { Events, InputData } from "../models/interface";
import { NextPage } from "next";
import InputDataList from "../components/detail/inputDataList";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { Button } from "@chakra-ui/react";
import {
  deleteInputData,
  getDataByCalendar,
  inputDataForCalendar,
} from "../apiCaller/inputDataQuery";
import Container from "../components/calendar/container";

const Calendar: NextPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [event, setEvent] = useState<Events[]>([]);
  const [detailByDate, setDetailByDate] = useState<InputData[]>([]);
  const router = useRouter();

  const getAlldata = async () => {
    const data = await inputDataForCalendar();
    if (!data) return;
    let detailData: Events[] = [];
    data.forEach((doc, index) => {
      detailData[index] = {
        title: `${String(doc.price)}(${doc.category})`,
        start: doc.date,
      };
    });
    setEvent(detailData);
  };

  const handleDateClick = async (e: DateClickArg) => {
    const detailByDate = await getDataByCalendar(e.dateStr);
    if (detailByDate) {
      setDetailByDate(detailByDate.data);
    }
    if (detailByDate?.data.length === 0) {
      const dateFormat = dayjs(e.dateStr).format("M月D日");
      if (confirm(`${dateFormat} \r\n 新規登録しますか？`)) {
        router.push({ pathname: "/input", query: { date: e.dateStr } });
      }
    }
  };

  const handleEventClick = async (e: EventClickArg) => {
    const detailByDate = await getDataByCalendar(e.event.startStr);
    if (detailByDate) {
      setDetailByDate(detailByDate.data);
    }
  };

  const clickCreate = () => {
    router.push({ pathname: "/input", query: { date: detailByDate[0].date } });
  };

  const clickDelete = (id: string) => {
    deleteInputData(id);
    const newDetailDate = detailByDate.filter((date) => {
      return date.id !== id;
    });
    setDetailByDate(newDetailDate);
    getAlldata();
  };

  useEffect(() => {
    if (loginUser) {
      getAlldata();
    }
  }, [loginUser]);
  return (
    <>
      <Head>
        <title>calendar</title>
      </Head>
      <HeaderAfterLogin />
      <Container
        handleDateClick={handleDateClick}
        handleEventClick={handleEventClick}
        event={event}
      />
      {loginUser && detailByDate.length !== 0 && (
        <Box
          w={{ base: "95%", sm: "95%", md: "85%", lg: "80%" }}
          m="0 auto"
          bg="#fff"
          p="25px"
          border="1px solid #aaa"
        >
          <HStack mb="10px" justify="center">
            <Text as="h1" fontWeight="normal">
              詳細
            </Text>
          </HStack>
          <InputDataList detailData={detailByDate} clickDelete={clickDelete} />
          <HStack m="10px auto" justify="flex-end">
            <Button
              w={{ base: "60px", md: "70px" }}
              h={{ base: "35px", md: "40px" }}
              fontSize={{ base: "12px", md: "16px" }}
              onClick={clickCreate}
            >
              新規登録
            </Button>
          </HStack>
        </Box>
      )}
    </>
  );
};

export default Calendar;
