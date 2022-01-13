import Head from "next/head";
import { NextPage } from "next";
import { Text, Box, Image, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../hooks/provider/authProvider";
import { postData } from "../apiCaller/inputDataQuery";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import PreviewModal from "../components/common/previewModal";
import { useRouter } from "next/router";
import { SubmitFormData } from "../models/interface";
import InputForm from "../components/input/InputForm";

const InputData: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmitFormData>();
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState("");
  const [msg, setMsg] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dateFromCalendar = router.query.date;

  // 選択した画像をプレビュー表示する
  const showPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const url = window.URL.createObjectURL(e.target.files[0]);
    setImageUrl(url);
  };

  // 画像と画像プレビューの削除
  const deletePreview = ({
    price,
    title,
    category,
    memo,
    date,
  }: SubmitFormData) => {
    reset({ price, title, category, memo, date, files: undefined });
    setImageUrl("");
  };

  // 入力データ送信時
  const submitForm = async (data: SubmitFormData) => {
    const resultdata = await postData(data);
    if (!resultdata) return;
    setImageUrl("");
    setMsg(resultdata.text);
    reset({ date: data.date });
  };

  return (
    <>
      <Head>
        <title>input</title>
      </Head>
      <HeaderAfterLogin />

      {loginUser && (
        <Box mb="20px">
          <Text fontSize="26px" fontWeight="semibold">
            入力
          </Text>
          <InputForm
            handleSubmit={handleSubmit}
            register={register}
            submitForm={submitForm}
            errors={errors}
            imageUrl={imageUrl}
            showPreview={showPreview}
            deletePreview={deletePreview}
            dateFromCalendar={dateFromCalendar}
            msg={msg}
            onOpen={onOpen}
          />
          <PreviewModal isOpen={isOpen} onClose={onClose}>
            <Image
              cursor="pointer"
              border="1px solid #aaa"
              src={imageUrl}
              m="0 auto"
              alt="preview"
              w="100%"
              h="100%"
              onClick={onClose}
            />
          </PreviewModal>
        </Box>
      )}
    </>
  );
};

export default InputData;
