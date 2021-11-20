import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  QuerySnapshot,
  startAfter,
  where,
} from "@firebase/firestore";

import InputData from "../../pages/input";
import { db } from "../../src/firebase";

const pageLimit = 5;

interface InputData {
  id: string;
  category: string;
  date: string;
  price: number;
  text: string;
}

interface FormData {
  price: number;
  category: string;
  text: string;
  date: Date;
}

const getSnap = (snapShot: QuerySnapshot, data: InputData[]) => {
  snapShot.forEach((doc) => {
    data.push({
      id: doc.id,
      category: doc.data().category,
      date: doc.data().date,
      price: doc.data().price,
      text: doc.data().text,
    });
  });
  return data;
};

export const allInputData = async () => {
  const data: InputData[] = [];
  try {
    const q = query(collection(db, "spendings"));
    const snapShot = await getDocs(q);
    getSnap(snapShot, data);
    return {
      data,
    };
  } catch (e) {
    console.log(e);
  }
};

export const monthlyInputData = async (month: string) => {
  const data: InputData[] = [];
  try {
    const q = query(
      collection(db, "spendings"),
      where("date", ">=", `2021-${month}-01`),
      where("date", "<=", `2021-${month}-31`),
      orderBy("date", "asc")
    );

    const snapShot = await getDocs(q);
    getSnap(snapShot, data);
    const nextDoc = snapShot.docs[pageLimit - 1];
    return {
      data,
      nextDoc,
    };
  } catch (e) {
    console.log(e);
  }
};

export const monthlyNextData = async (
  month: string,
  pageLimit: number,
  nextData: {}
) => {
  const data: InputData[] = [];
  try {
    const q = query(
      collection(db, "spendings"),
      where("date", ">=", `2021-${month}-01`),
      where("date", "<=", `2021-${month}-31`),
      orderBy("date", "asc"),
      limit(pageLimit),
      startAfter(nextData)
    );

    const snapShot = await getDocs(q);
    const snapData = getSnap(snapShot, data);

    const nextDoc = snapShot.docs[snapShot.docs.length - 1];
    const prevDoc = snapShot.docs[0];

    return {
      snapData,
      nextDoc,
      prevDoc,
    };
  } catch (e) {
    console.log(e);
  }
};

export const monthlyPrevData = async (
  month: string,
  pageLimit: number,
  prevData: {}
) => {
  const data: InputData[] = [];
  try {
    const q = query(
      collection(db, "spendings"),
      where("date", ">=", `2021-${month}-01`),
      where("date", "<=", `2021-${month}-31`),
      orderBy("date", "asc"),
      limitToLast(pageLimit),
      endBefore(prevData)
    );

    const snapShot = await getDocs(q);
    getSnap(snapShot, data);

    const nextDoc = snapShot.docs[snapShot.docs.length - 1];
    const prevDoc = snapShot.docs[0];

    return {
      data,
      nextDoc,
      prevDoc,
    };
  } catch (e) {
    console.log(e);
  }
};

export const deleteData = async (id: string) => {
  await deleteDoc(doc(db, "spendings", id));
};

export const postData = async (data: FormData) => {
  data.price = Number(data.price);
  const { price, category, text, date } = data;
  try {
    await addDoc(collection(db, "spendings"), {
      price,
      category,
      text,
      date,
      createdAt: new Date(),
    });
    return {
      text: "登録しました",
    };
  } catch (e: any) {
    return {
      text: "登録に失敗しました",
    };
  }
};
