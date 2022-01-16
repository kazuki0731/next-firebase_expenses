import { EventClickArg } from "@fullcalendar/common";
import { DateClickArg } from "@fullcalendar/interaction";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  deleteInputData,
  getDataByCalendar,
  inputDataForCalendar,
} from "../apiCaller/inputDataQuery";
import { Events, InputData } from "../models/interface";

export const useGetEvents = () => {
  const [event, setEvent] = useState<Events[]>([]);

  // 入力した全データを取得しカレンダーの日付ごとにに振り分け
  const getEvents = async () => {
    const data = await inputDataForCalendar();
    if (!data) return;
    let detailData: Events[] = [];
    data.forEach((doc, index) => {
      detailData[index] = {
        title: `${String(doc.price.toLocaleString())}(${doc.category})`,
        start: doc.date,
      };
    });
    setEvent(detailData);
  };

  return { event, getEvents };
};

export const useGetDailyData = () => {
  const [detailByDate, setDetailByDate] = useState<InputData[]>([]);
  const router = useRouter();

  // 入力データが無い日付をクリックした時
  const clickGetDate = async (e: DateClickArg) => {
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

  // 入力データがある日付をクリックした時
  const clickGetEvent = async (e: EventClickArg) => {
    const detailByDate = await getDataByCalendar(e.event.startStr);
    if (detailByDate) {
      setDetailByDate(detailByDate.data);
    }
  };

  // 選択した日付で新規作成
  const clickCreateData = () => {
    router.push({ pathname: "/input", query: { date: detailByDate[0].date } });
  };

  // 削除
  const clickDeleteData = (id: string) => {
    deleteInputData(id);
    const newDetailDate = detailByDate.filter((date) => {
      return date.id !== id;
    });
    setDetailByDate(newDetailDate);
  };

  return {
    detailByDate,
    clickGetDate,
    clickGetEvent,
    clickCreateData,
    clickDeleteData,
  };
};
