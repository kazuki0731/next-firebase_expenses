import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/layout";
import { Image, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { storage } from "../../lib/firebase";
import { useForm } from "react-hook-form";
import { getDownloadURL, ref } from "firebase/storage";
import PreviewModal from "../../components/common/previewModal";
import {
  selectedInputData,
  updateInputData,
} from "../../apiCaller/inputDataQuery";
import { InputData } from "../../models/interface";
import HeaderAfterLogin from "../../components/common/headerAfterLogin";
import EditForm from "../../components/edit/editForm";

const Edit: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputData>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [createdAt, setCreatedAt] = useState("");
  const [msg, setMsg] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const id = router.query.dataId;

  const getInputData = async () => {
    if (!id) return;
    try {
      const inputData = await selectedInputData(id);
      if (!inputData) return;
      const createdTime = new Date(inputData.data()?.createdAt.seconds * 1000);
      setCreatedAt(
        `${
          createdTime.getMonth() + 1
        }月${createdTime.getDate()}日${createdTime.getHours()}時${createdTime.getMinutes()}分`
      );

      reset(inputData.data());
      if (!inputData.data()?.files) return;
      const files = inputData.data()?.files;
      const storageRef = ref(storage, files);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getInputData();
  }, []);

  const changeData = async (data: InputData) => {
    if (!id) return;
    data.price = Number(data.price);
    try {
      updateInputData(data, id);
      getInputData();
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
      <HeaderAfterLogin />
      <Text fontSize="26px" fontWeight="semibold">
        詳細
      </Text>
      <EditForm
        handleSubmit={handleSubmit}
        register={register}
        changeData={changeData}
        imageUrl={imageUrl}
        errors={errors}
        msg={msg}
        onOpen={onOpen}
        createdAt={createdAt}
        clickBack={clickBack}
      />
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
