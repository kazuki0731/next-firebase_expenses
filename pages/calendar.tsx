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

  const handleDateClick = async (e: DateClickArg) => {
    clickGetDate(e);
  };

  const handleEventClick = async (e: EventClickArg) => {
    clickGetEvent(e);
  };

  const clickCreate = () => {
    clickCreateData();
  };

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
