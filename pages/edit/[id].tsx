import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import TitleText from "../../components/common/titleText";
import { Text, VStack, Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { nanoid } from "nanoid";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { auth, db, storage } from "../../lib/firebase";
import { useForm } from "react-hook-form";
import FormList from "../../components/edit/formList";
import FormButton from "../../components/edit/formButton";
import FormSpace from "../../components/common/formSpace";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface FormData {
  price: number;
  category: string;
  text: string;
  date: Date;
  files?: File[];
}

const Edit: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const id = router.query.dataId;

  const getData = async () => {
    const res = await getDoc(
      doc(db, "users", auth.currentUser.uid, "spendings", `${id}`)
    );
    reset(res.data());
    if (res.data()?.filePath) {
      const filePath = res.data()?.filePath;
      const storageRef = ref(storage, filePath);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const changeData = async (data: FormData) => {
    data.price = Number(data.price);
    const { price, category, text, date, files } = data;
    let filePath = null;
    try {
      if (files) {
        const storageRef = ref(
          storage,
          `${auth.currentUser.displayName}/${nanoid()}_${files[0].name}`
        );
        const fileData = await uploadBytes(storageRef, files[0]);
        filePath = fileData.ref.fullPath;
      }
      await updateDoc(
        doc(db, "users", auth.currentUser.uid, "spendings", `${id}`),
        {
          price,
          category,
          text,
          date,
          filePath,
          createdAt: new Date(),
        }
      );
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
      <TitleText>詳細</TitleText>
      <FormSpace>
        <form onSubmit={handleSubmit(changeData)}>
          <VStack spacing={4} alignItems="flex-start">
            <FormList register={register} />
            {imageUrl && (
              <Box>
                <Image src={imageUrl} alt="upLoadImage" w={400} />
              </Box>
            )}
            <FormButton clickBack={clickBack} />
          </VStack>
        </form>
        {msg && <Text mt={1}>{msg}</Text>}
      </FormSpace>
    </>
  );
};

export default Edit;
