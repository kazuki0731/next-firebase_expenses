import { Box, Text, ListItem, HStack } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
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
  deleteInputData,
  getDataByCalendar,
  inputDataForCalendar,
} from "../apiCaller/inputDataQuery";
import { current } from "../const/date";

interface Events {
  title: string;
  start: string;
}

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

      <Box w="1000px" m="20px auto" bg="#fff" fontSize="17px">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          locale="ja"
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          events={event}
          headerToolbar={{
            left: "prev next",
            center: "title",
            right: "today",
          }}
          contentHeight="auto"
          dayCellClassNames={"cell"}
          dayHeaderClassNames={"event"}
          initialDate={`${current.year}-${("0" + current.month).slice(-2)}`}
        />
      </Box>
      {loginUser && detailByDate.length !== 0 && (
        <Container>
          <Box w="85%" m="0 auto">
            <HStack mb="10px" justify="center">
              <Text as="h1" fontWeight="normal">
                詳細
              </Text>
            </HStack>
            <InputDataList
              detailData={detailByDate}
              clickDelete={clickDelete}
            />
            <HStack mb="10px" justify="flex-end">
              <Button onClick={clickCreate}>新規登録</Button>
            </HStack>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Calendar;
