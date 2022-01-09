import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  limit,
  updateDoc,
} from "@firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { nanoid } from "nanoid";
import { getInputDataSnap } from "../util/functions";
import { auth, db, storage } from "../lib/firebase";
import { SubmitFormData, InputData } from "../models/interface";

export const allExpenseInputData = async (year: number) => {
  if (!auth.currentUser) return;
  const data: InputData[] = [];
  try {
    const q = query(
      collection(db, "users", auth.currentUser.uid, "spendings"),
      where("date", ">=", `${year}-01-01`),
      where("date", "<=", `${year}-12-31`),
      where("isExpense", "==", true)
    );
    const snapShot = await getDocs(q);
    getInputDataSnap(snapShot, data);
    return {
      data,
    };
  } catch (e) {
    console.log(e);
  }
};

export const allIncomeInputData = async (year: number) => {
  if (!auth.currentUser) return;
  const data: InputData[] = [];
  try {
    const q = query(
      collection(db, "users", auth.currentUser.uid, "spendings"),
      where("date", ">=", `${year}-01-01`),
      where("date", "<=", `${year}-12-31`),
      where("isExpense", "==", false)
    );
    const snapShot = await getDocs(q);
    getInputDataSnap(snapShot, data);
    return {
      data,
    };
  } catch (e) {
    console.log(e);
  }
};

export const selectedInputData = async (id: string | string[]) => {
  if (!auth.currentUser) return;
  const inputData = await getDoc(
    doc(db, "users", auth.currentUser.uid, "spendings", `${id}`)
  );
  return inputData;
};

export const recentlyInputData = async () => {
  if (!auth.currentUser) return;
  const data: InputData[] = [];
  const today = ("0" + new Date().getDate()).slice(-2);
  const month = ("0" + (new Date().getMonth() + 1)).slice(-2);
  const year = new Date().getFullYear();
  try {
    const q = query(
      collection(db, "users", auth.currentUser.uid, "spendings"),
      where("date", "<=", `${year}-${month}-${today}`),
      where("date", "<=", `${year}-${month}-${today}`),
      orderBy("date", "desc"),
      limit(4)
    );
    const snapShot = await getDocs(q);
    getInputDataSnap(snapShot, data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const monthlyInputData = async (
  year: number,
  month: number | string
) => {
  if (!auth.currentUser) return;
  const data: InputData[] = [];
  month = ("0" + month).slice(-2);
  try {
    const q = query(
      collection(db, "users", auth.currentUser.uid, "spendings"),
      where("date", ">=", `${year}-${month}-01`),
      where("date", "<=", `${year}-${month}-31`),
      orderBy("date", "asc")
    );

    const snapShot = await getDocs(q);
    getInputDataSnap(snapShot, data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const recentlyMonthlyInputData = async () => {
  if (!auth.currentUser) return;
  const data: InputData[] = [];
  const month = ("0" + (new Date().getMonth() + 1)).slice(-2);
  const year = new Date().getFullYear();
  try {
    const q = query(
      collection(db, "users", auth.currentUser.uid, "spendings"),
      where("date", ">=", `${year}-${month}-01`),
      where("date", "<=", `${year}-${month}-31`),
      orderBy("date", "asc")
    );

    const snapShot = await getDocs(q);
    getInputDataSnap(snapShot, data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const inputDataForCalendar = async () => {
  if (!auth.currentUser) return;
  const data: InputData[] = [];
  try {
    const q = query(collection(db, "users", auth.currentUser.uid, "spendings"));
    const snapShot = await getDocs(q);
    getInputDataSnap(snapShot, data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getDataByCalendar = async (date: string) => {
  if (!auth.currentUser) return;
  try {
    const data: InputData[] = [];
    const q = query(
      collection(db, "users", auth.currentUser.uid, "spendings"),
      where("date", "==", `${date}`),
      orderBy("createdAt", "asc")
    );
    const snapShot = await getDocs(q);
    getInputDataSnap(snapShot, data);
    return {
      data,
    };
  } catch (e) {
    console.log(e);
  }
};

export const updateInputData = async (
  { price, title, category, memo, date, files, isExpense }: InputData,
  id: string | string[]
) => {
  if (!auth.currentUser) return;
  if (category === "給料" || category === "その他収入") {
    isExpense = false;
  }
  price = Number(price);

  await updateDoc(
    doc(db, "users", auth.currentUser.uid, "spendings", `${id}`),
    {
      price,
      title,
      category,
      memo,
      date,
      files,
      createdAt: new Date(),
      isExpense,
    }
  );
};

export const deleteInputData = async (id: string) => {
  if (!auth.currentUser) return;
  await deleteDoc(doc(db, "users", auth.currentUser.uid, "spendings", id));
};

export const postData = async (data: SubmitFormData)=> {
  if (!auth.currentUser) return;
  data.price = Number(data.price);
  const { price, title, category, memo, date, files } = data;
  let isExpense = true;
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
    if (category === "給料" || category === "その他収入") {
      isExpense = false;
    }
    await addDoc(collection(db, "users", auth.currentUser.uid, "spendings"), {
      price,
      title,
      category,
      memo,
      date,
      files: filePath,
      createdAt: new Date(),
      isExpense,
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
