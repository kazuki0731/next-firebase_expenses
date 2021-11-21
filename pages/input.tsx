import Head from "next/head";
import { NextPage } from "next";
import Container from "../components/common/container";
import { VStack } from "@chakra-ui/layout";
import { Button, Text, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import TitleText from "../components/common/titleText";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../src/firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/authProvider";
import { useRouter } from "next/router";
import FormList from "../components/input/formList";
import { postData } from "../apiCaller/inputDataQuery";
import FormSpace from "../components/common/formSpace";

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
    const messge = await postData(data);
    setMsg(messge.text);
    reset();
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
          <FormSpace>
            <form onSubmit={handleSubmit(submitData)}>
              <VStack spacing={6}>
                <FormList register={register} errors={errors} />
                <Button type="submit">送信する</Button>
              </VStack>
            </form>
            {msg && (
              <Text mt={2} color={msg === "登録しました" ? "black" : "red"}>
                {msg}
              </Text>
            )}
          </FormSpace>
        </>
      )}
    </>
  );
};

export default InputData;
