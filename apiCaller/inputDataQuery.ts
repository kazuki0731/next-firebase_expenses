import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "@firebase/firestore";

import { auth, db } from "../lib/firebase";

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
    const q = query(collection(db, "users", auth.currentUser.uid, "spendings"));
    const snapShot = await getDocs(q);
    getSnap(snapShot, data);
    return {
      data,
    };
  } catch (e) {
    console.log(e);
  }
};

export const monthlyInputData = async (
  month: string
): Promise<{ data: InputData[] } | undefined> => {
  const data: InputData[] = [];
  try {
    const q = query(
      collection(db, "users", auth.currentUser.uid, "spendings"),
      where("date", ">=", `2021-${month}-01`),
      where("date", "<=", `2021-${month}-31`),
      orderBy("date", "asc")
    );

    const snapShot = await getDocs(q);
    getSnap(snapShot, data);
    return {
      data,
    };
  } catch (e) {
    console.log(e);
  }
};

export const deleteData = async (id: string) => {
  await deleteDoc(doc(db, "users", auth.currentUser.uid, "spendings", id));
};

export const postData = async (data: FormData) => {
  data.price = Number(data.price);
  const { price, category, text, date } = data;
  try {
    await addDoc(collection(db, "users", auth.currentUser?.uid, "spendings"), {
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
