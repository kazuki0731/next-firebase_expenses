import { Box, Text, HStack } from "@chakra-ui/layout";
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
      <Box
        w={{ base: "100%", sm: "95%", md: "90%", lg: "85%" }}
        p="10px"
        bg="#fff"
        m="20px auto"
        border="1px solid #aaa"
        fontSize={{ base: "6px", sm: "10px", md: "12px", lg: "18px" }}
        lineHeight={{ base: "6px", sm: "8px", md: "10px", lg: "14px" }}
      >
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
        <Box
          w={{ base: "350px", sm: "500px", md: "800px", lg: "1000px" }}
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
            <Button onClick={clickCreate}>新規登録</Button>
          </HStack>
        </Box>
      )}
    </>
  );
};

export default Calendar;
