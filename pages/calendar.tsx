import { Box } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/provider/authProvider";
import Head from "next/head";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { Events, InputData } from "../models/interface";
import { NextPage } from "next";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import {
  deleteInputData,
  getDataByCalendar,
  inputDataForCalendar,
} from "../apiCaller/inputDataQuery";
import { current } from "../const/date";
import Dailydata from "../components/calendar/dailyData";

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
        w={{ base: "95%", sm: "95%", md: "85%", lg: "80%" }}
        p="10px"
        bg="#fff"
        m="20px auto"
        border="1px solid #aaa"
        fontSize={{
          sm: "4px",
          md: "12px",
          lg: "16px",
          xl: "18px",
        }}
        lineHeight={{
          sm: "6px",
          md: "10px",
          lg: "12px",
          xl: "14px",
        }}
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
        <Dailydata
          detailByDate={detailByDate}
          clickCreate={clickCreate}
          clickDelete={clickDelete}
        />
      )}
    </>
  );
};

export default Calendar;
