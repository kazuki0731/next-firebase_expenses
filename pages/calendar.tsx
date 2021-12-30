import { Box, Text, ListItem, HStack } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../hooks/dataProvider";

import { AuthContext } from "../hooks/authProvider";
import Head from "next/head";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { InputData } from "../models/interface";
import { NextPage } from "next";
import InputDataList from "../components/detail/inputDataList";
import Container from "../components/common/container";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { Button } from "@chakra-ui/react";
import {
  deleteData,
  getDataByCalendar,
  inputDataForCalendar,
} from "../apiCaller/inputDataQuery";

interface Events {
  title: string;
  start: string;
}

const Calendar: NextPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [event, setEvent] = useState<Events[]>([]);
  const router = useRouter();
  const [detailByDate, setDetailByDate] = useState<InputData[]>([]);
  const getAlldata = async () => {
    const data = await inputDataForCalendar();
    if (data) {
      let detailData: Events[] = [];
      data.forEach((doc, index) => {
        detailData[index] = {
          title: `${String(doc.price)}(${doc.category})`,
          start: doc.date,
        };
      });
      setEvent(detailData);
    }
  };

  const handleDateClick = async (e: DateClickArg) => {
    const detailByDate = await getDataByCalendar(e.dateStr);
    if (detailByDate) {
      setDetailByDate(detailByDate.data);
    }
    if (detailByDate?.data.length === 0) {
      const dateFormat = dayjs(e.dateStr).format("MM月D日");
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
    deleteData(id);
    const newdetailDate = detailByDate.filter((date) => {
      return date.id !== id;
    });
    setDetailByDate(newdetailDate);
    console.log(newdetailDate);
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

      <Box w="1000px" m="20px auto" bg="#fff" fontSize="17px">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          locale="ja"
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          events={event}
          headerToolbar={{
            start: "prev",
            center: "title",
            end: "next",
          }}
        />
      </Box>
      {loginUser && detailByDate.length !== 0 && (
        <Container>
          <HStack
            justify="center"
            m="0 auto 10px auto"
            w="85%"
            position="relative"
          >
            <Text as="h1" fontWeight="semibold">
              詳細
            </Text>
            <Button position="absolute" top="0" right="0" onClick={clickCreate}>
              新規登録
            </Button>
          </HStack>
          <InputDataList detailData={detailByDate} clickDelete={clickDelete} />
        </Container>
      )}
    </>
  );
};

export default Calendar;
