import Head from "next/head";
import { NextPage } from "next";
import { VStack } from "@chakra-ui/layout";
import { Button, Text, Box, Image, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import TitleText from "../components/common/titleText";
import { useContext, useState } from "react";
import { AuthContext } from "../hooks/authProvider";
import FormList from "../components/input/formList";
import { postData } from "../apiCaller/inputDataQuery";
import FormSpace from "../components/common/formSpace";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import { DataContext } from "../hooks/dataProvider";
import PreviewModal from "../components/common/previewModal";
import { useRouter } from "next/router";

interface FormData {
  price: number;
  title: string;
  category: string;
  memo: string;
  date: Date;
  files?: File[];
}

const InputData: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const { loginUser } = useContext(AuthContext);
  const { getYearlyData, nowYear } = useContext(DataContext);
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const dateFromCalendar = router.query.date;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const showPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const url = window.URL.createObjectURL(e.target.files[0]);
      setImageUrl(url);
    }
  };

  const deletePreview = ({ price, title, category, memo, date }: FormData) => {
    reset({ price, title, category, memo, date, files: undefined });
    setImageUrl("");
  };

  const submitData = async (data: FormData) => {
    const { text } = await postData(data);
    getYearlyData(nowYear);
    setImageUrl("");
    setMsg(text);
    reset();
  };

  return (
    <>
      <Head>
        <title>Input</title>
      </Head>
      <HeaderAfterLogin />
      {loginUser && (
        <Box>
          <TitleText>input</TitleText>
          <FormSpace>
            <form onSubmit={handleSubmit(submitData)}>
              <VStack spacing={4} alignItems="left">
                <FormList
                  register={register}
                  errors={errors}
                  showPreview={showPreview}
                  dateFromCalendar={dateFromCalendar}
                />
                {imageUrl && (
                  <Box w="100%">
                    <Box m="0 auto" p="7px" w="90%" position="relative">
                      <Image
                        cursor="pointer"
                        src={imageUrl}
                        m="0 auto"
                        alt="preview"
                        w="100%"
                        _hover={{
                          opacity: 0.7,
                        }}
                        onClick={onOpen}
                      />
                      <Box
                        cursor="pointer"
                        position="absolute"
                        fontSize="18px"
                        bg="#ccc"
                        top="-5%"
                        right="-5%"
                        w="28px"
                        h="28px"
                        borderRadius="50%"
                        _hover={{
                          opacity: 0.7,
                        }}
                        onClick={handleSubmit(deletePreview)}
                      >
                        ✕
                      </Box>
                    </Box>
                  </Box>
                )}
                <Button type="submit" h="40px">
                  送信
                </Button>
              </VStack>
            </form>
            {msg && (
              <Text mt={2} color={msg === "登録しました" ? "black" : "red"}>
                {msg}
              </Text>
            )}
          </FormSpace>
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
