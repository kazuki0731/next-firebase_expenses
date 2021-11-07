import Head from "next/head";
import { NextPage } from "next";
import Container from "../components/container";
import { FormControl } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button, Text } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";

import { useForm } from "react-hook-form";
import TitleText from "../components/titleText";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../src/firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/authProvider";
import router from "next/router";

interface FormData {
  price: number;
  category: string;
  text: string;
  date: Date;
}

const InputData: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { isGetAuth } = useContext<any>(AuthContext);
  const [msg, setMsg] = useState("");

  const submitData = async (data: FormData) => {
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
      setMsg("登録しました");
      reset();
    } catch (e: any) {
      // 前回はanyだったが急にunknowになった
      if (e.code) {
        setMsg("登録に失敗しました");
      }
    }
  };

  useEffect(() => {
    if (!isGetAuth) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Input</title>
      </Head>
      {isGetAuth && (
        <>
          <TitleText>Input</TitleText>
          <Container>
            <form onSubmit={handleSubmit(submitData)}>
              <VStack w="70%" m="0 auto" spacing={8}>
                <FormControl id="price">
                  <Input
                    type="number"
                    bg="white"
                    variant="outline"
                    placeholder="金額"
                    required
                    {...register("price")}
                  />
                </FormControl>
                <FormControl id="category" w="60%">
                  <Select bg="white" required {...register("category")}>
                    <option value="">カテゴリを選択</option>
                    <option value="日用品">日用品</option>
                    <option value="食費">食費</option>
                    <option value="家賃">家賃</option>
                    <option value="光熱費">光熱費</option>
                    <option value="その他">その他</option>
                  </Select>
                </FormControl>
                <FormControl id="text">
                  <Input
                    type="text"
                    bg="white"
                    variant="outline"
                    placeholder="メモ"
                    required
                    {...register("text")}
                  />
                </FormControl>
                <FormControl id="date">
                  <Input
                    type="date"
                    bg="white"
                    variant="outline"
                    placeholder="メモ"
                    required
                    {...register("date")}
                  />
                </FormControl>

                <Button type="submit">保存</Button>
              </VStack>
            </form>
            {msg && (
              <Text mt={2} color={msg === "登録しました" ? "black" : "red"}>
                {msg}
              </Text>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default InputData;
