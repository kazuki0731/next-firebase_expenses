import { getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";
import {
  selectedInputData,
  updateInputData,
} from "../apiCaller/inputDataQuery";
import { storage } from "../lib/firebase";
import { InputData } from "../models/interface";

export const useGetDataById = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [createdAt, setCreatedAt] = useState("");

  // 選択した入力データの詳細を取得
  const getDataById = async (id: string | string[]) => {
    try {
      const inputData = await selectedInputData(id);
      if (!inputData) return;
      const createdTime = new Date(inputData.data()?.createdAt.seconds * 1000);
      setCreatedAt(
        `${
          createdTime.getMonth() + 1
        }月${createdTime.getDate()}日${createdTime.getHours()}時${createdTime.getMinutes()}分`
      );

      if (inputData.data()?.files) {
        const files = inputData.data()?.files;
        const storageRef = ref(storage, files);
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);
      }

      return inputData.data();
    } catch (e) {
      console.log(e);
    }
  };

  return {
    imageUrl,
    createdAt,
    getDataById,
  };
};

export const useChangeData = () => {
  const [msg, setMsg] = useState("");

  // 変更したデータを保存
  const saveData = (data: InputData, id: string | string[]) => {
    data.price = Number(data.price);
    try {
      updateInputData(data, id);
      setMsg("変更しました");
    } catch (e: any) {
      setMsg("変更に失敗しました");
      return;
    }
  };
  return {
    msg,
    saveData,
  };
};
