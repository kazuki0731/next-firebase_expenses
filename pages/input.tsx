import Head from "next/head";
import { NextPage } from "next";
import Container from "../components/common/container";
import { VStack } from "@chakra-ui/layout";
import { Button, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import TitleText from "../components/common/titleText";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../src/firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/provider/authProvider";
import { useRouter } from "next/router";
import FormList from "../components/input/formList";

interface FormData {
  price: number;
  category: string;
  text: string;
  date: Date;
}

const InputData: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const { currentUser } = useContext<any>(AuthContext);
  const router = useRouter();
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
      if (e.code) {
        setMsg("登録に失敗しました");
      }
    }
  };

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Input</title>
      </Head>
      {currentUser && (
        <>
          <TitleText>Input</TitleText>
          <Container>
            <form onSubmit={handleSubmit(submitData)}>
              <VStack w="70%" m="0 auto" spacing={6}>
                <FormList register={register} errors={errors} />
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
