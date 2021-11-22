import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import TitleText from "../../components/common/titleText";
import { Text, VStack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db } from "../../src/firebase";
import { useForm } from "react-hook-form";
import FormList from "../../components/edit/formList";
import FormButton from "../../components/edit/formButton";
import FormSpace from "../../components/common/formSpace";

interface FormData {
  price: number;
  category: string;
  text: string;
  date: Date;
}

const Edit: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const id = router.query.dataId;

  const getData = async () => {
    const res = await getDoc(doc(db, "spendings", `${id}`));
    reset(res.data());
  };
  useEffect(() => {
    getData();
  }, []);

  const changeData = async (data: FormData) => {
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
      getData();

      setMsg("変更しました");
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
      <FormSpace>
        <form onSubmit={handleSubmit(changeData)}>
          <VStack spacing={4} alignItems="flex-start">
            <FormList register={register} />
            <FormButton clickBack={clickBack} />
          </VStack>
        </form>
        {msg && <Text mt={1}>{msg}</Text>}
      </FormSpace>
    </>
  );
};

export default Edit;
