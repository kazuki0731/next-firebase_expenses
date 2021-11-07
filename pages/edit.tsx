import Head from "next/head";
import { NextPage } from "next";
import router from "next/router";
import TitleText from "../components/titleText";
import Container from "../components/container";
import { HStack, Text, VStack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "../src/firebase";
import { useForm } from "react-hook-form";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";

interface FormData {
  price: number;
  category: string;
  text: string;
  date: Date;
}

const Edit: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [msg, setMsg] = useState("");
  const id = router.query.id;

  useEffect(() => {
    const getData = async () => {
      const res = await getDoc(doc(db, "spendings", `${id}`));
      reset(res.data());
    };
    getData();
  }, []);

  const changeData = async (data: FormData) => {
    console.log("push");
    data.price = Number(data.price);
    const { price, category, text, date } = data;
    try {
      await updateDoc(doc(db, "spendings", `${id}`), {
        price,
        category,
        text,
        date,
        createdAt: new Date(),
      });
      setMsg("変更しました");
      reset();
    } catch (e: any) {
      setMsg("変更に失敗しました");
    }
  };

  const clickBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>total</title>
      </Head>
      <TitleText>編集</TitleText>
      <Container>
        <form onSubmit={handleSubmit(changeData)}>
          <VStack w="70%" m="0 auto" justifyContent="center">
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
            <HStack>
              <Button type="submit">変更する</Button>
              <Button onClick={clickBack}>戻る</Button>
            </HStack>
          </VStack>
        </form>
        {msg && <Text mt={1}>{msg}</Text>}
      </Container>
    </>
  );
};

export default Edit;
