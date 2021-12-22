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
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { nanoid } from "nanoid";
import { auth, db, storage } from "../lib/firebase";

interface InputData {
  id: string;
  category: string;
  date: string;
  price: number;
  text: string;
  filePath: string;
}

interface FormData {
  price: number;
  category: string;
  text: string;
  date: Date;
  files?: File[];
}

const getSnap = (snapShot: QuerySnapshot, data: InputData[]) => {
  snapShot.forEach((doc) => {
    data.push({
      id: doc.id,
      category: doc.data().category,
      date: doc.data().date,
      price: doc.data().price,
      text: doc.data().text,
      filePath: doc.data().filePath,
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
  const { price, category, text, date, files } = data;
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
      category,
      text,
      date,
      filePath,
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
