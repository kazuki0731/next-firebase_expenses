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
import { ref, uploadBytes } from "firebase/storage";
import { nanoid } from "nanoid";
import { getSnap } from "../hooks/functions";
import { auth, db, storage } from "../lib/firebase";
import { InputData } from "../models/interface";

interface FormData {
  price: number;
  title: string;
  category: string;
  memo: string;
  date: Date;
  files?: File[];
}

export const allInputData = async (year: number) => {
  const data: InputData[] = [];
  try {
    const q = query(
      collection(db, "users", auth.currentUser.uid, "spendings"),
      where("date", ">=", `${year}-01-01`),
      where("date", "<=", `${year}-12-31`)
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

export const monthlyInputData = async (
  month: string,
  year: number
): Promise<{ data: InputData[] } | undefined> => {
  const data: InputData[] = [];
  try {
    const q = query(
      collection(db, "users", auth.currentUser.uid, "spendings"),
      where("date", ">=", `${year}-${month}-01`),
      where("date", "<=", `${year}-${month}-31`),
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

export const inputDataForCalendar = async () => {
  const data: InputData[] = [];
  try {
    const q = query(collection(db, "users", auth.currentUser.uid, "spendings"));
    const snapShot = await getDocs(q);
    getSnap(snapShot, data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getDataByCalendar = async (date: string) => {
  try {
    const data: InputData[] = [];
    const q = query(
      collection(db, "users", auth.currentUser.uid, "spendings"),
      where("date", "==", `${date}`),
      orderBy("createdAt", "asc")
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
  const { price, title, category, memo, date, files } = data;
  let filePath = "";
  try {
    if (files?.length !== undefined && files?.length > 0) {
      const storageRef = ref(
        storage,
        `${auth.currentUser.displayName}/${nanoid()}_${files[0].name}`
      );
      const fileData = await uploadBytes(storageRef, files[0]);
      filePath = fileData.ref.fullPath;
    }
    await addDoc(collection(db, "users", auth.currentUser?.uid, "spendings"), {
      price,
      title,
      category,
      memo,
      date,
      files: filePath,
      createdAt: new Date(),
    });
    return {
      text: "登録しました",
    };
  } catch (e: any) {
    console.log(e);
    return {
      text: "登録に失敗しました",
    };
  }
};
