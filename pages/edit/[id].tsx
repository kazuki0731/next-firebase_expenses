import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import TitleText from "../../components/common/titleText";
import { Text, VStack, Box } from "@chakra-ui/layout";
import { Image, useDisclosure } from "@chakra-ui/react";
import { nanoid } from "nanoid";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { auth, db, storage } from "../../lib/firebase";
import { useForm } from "react-hook-form";
import FormList from "../../components/edit/formList";
import FormButton from "../../components/edit/formButton";
import FormSpace from "../../components/common/formSpace";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import PreviewModal from "../../components/common/previewModal";

interface FormData {
  price: number;
  title: string;
  category: string;
  memo: string;
  date: Date;
  files?: File[];
}

const Edit: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [msg, setMsg] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const id = router.query.dataId;

  const getData = async () => {
    const res = await getDoc(
      doc(db, "users", auth.currentUser.uid, "spendings", `${id}`)
    );
    reset(res.data());
    if (res.data()?.files) {
      const files = res.data()?.files;
      const storageRef = ref(storage, files);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const changeData = async (data: FormData) => {
    data.price = Number(data.price);
    const { price, title, category, memo, date, files } = data;
    try {
      // if (files) {
      //   const storageRef = ref(
      //     storage,
      //     `${auth.currentUser.displayName}/${nanoid()}_${files[0].name}`
      //   );
      //   const fileData = await uploadBytes(storageRef, files[0]);
      //   files = fileData.ref.fullPath;
      // }
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
            <FormList register={register} errors={errors} />
            {imageUrl && (
              <Box w="100%">
                <Box p="7px" w="90%" m="0 auto">
                  <Image
                    cursor="pointer"
                    src={imageUrl}
                    alt="upLoadImage"
                    w="100%"
                    _hover={{
                      opacity: 0.7,
                    }}
                    onClick={onOpen}
                  />
                </Box>
              </Box>
            )}
            <FormButton clickBack={clickBack} />
          </VStack>
        </form>
        {msg && <Text mt={1}>{msg}</Text>}
      </FormSpace>
      <PreviewModal isOpen={isOpen} onClose={onClose}>
        <Image
          cursor="pointer"
          src={imageUrl}
          m="0 auto"
          alt="preview"
          w="100%"
          h="100%"
          onClick={onOpen}
        />
      </PreviewModal>
    </>
  );
};

export default Edit;
