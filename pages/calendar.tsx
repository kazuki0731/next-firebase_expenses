import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/provider/authProvider";
import Head from "next/head";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import { EventClickArg } from "@fullcalendar/react";
import { DateClickArg } from "@fullcalendar/interaction";
import { NextPage } from "next";
import Dailydata from "../components/calendar/dailyData";
import { useGetDailyData, useGetEvents } from "../hooks/calendar";
import MainBody from "../components/calendar/mainBody";

const Calendar: NextPage = () => {
  const { loginUser } = useContext(AuthContext);
  const { event, getEvents } = useGetEvents();
  const {
    detailByDate,
    clickGetDate,
    clickGetEvent,
    clickCreateData,
    clickDeleteData,
  } = useGetDailyData();

  // カレンダーの入力データが無い日付をクリックしたとき
  const handleDateClick = async (e: DateClickArg) => {
    clickGetDate(e);
  };

  // カレンダーの入力データがある日付をクリックしたとき
  const handleEventClick = async (e: EventClickArg) => {
    clickGetEvent(e);
  };

  // 新規作成
  const clickCreate = () => {
    clickCreateData();
  };

  // 投稿削除
  const clickDelete = (id: string) => {
    clickDeleteData(id);
    getEvents();
  };

  useEffect(() => {
    if (loginUser) {
      getEvents();
    }
  }, [loginUser]);

  return (
    <>
      <Head>
        <title>calendar</title>
      </Head>
      <HeaderAfterLogin />
      <MainBody
        handleDateClick={handleDateClick}
        handleEventClick={handleEventClick}
        event={event}
      />
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
