import Head from "next/head";
import { NextPage } from "next";
import { VStack } from "@chakra-ui/layout";
import { Button, Text, Box, Image } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import TitleText from "../components/common/titleText";
import { useContext, useState } from "react";
import { AuthContext } from "../hooks/authProvider";
import FormList from "../components/input/formList";
import { postData } from "../apiCaller/inputDataQuery";
import FormSpace from "../components/common/formSpace";
import HeaderAfterLogin from "../components/common/headerAfterLogin";
import { DataContext } from "../hooks/dataProvider";
interface FormData {
  price: number;
  category: string;
  text: string;
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
  const [files, setFiles] = useState<File[] | null>([]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const { currentUser } = useContext(AuthContext);
  const { getYearlyData } = useContext(DataContext);
  const [msg, setMsg] = useState("");

  const showPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const Url = window.URL.createObjectURL(e.target.files[0]);
      setImageUrl(Url);
    }
  };

  const deletePreview = ({ price, category, text, date }: FormData) => {
    reset({ price, category, text, date, files: undefined });
    setImageUrl("");
  };

  const submitData = async (data: FormData) => {
    const { text } = await postData(data);
    getYearlyData();
    setImageUrl("");
    setMsg(text);
    reset();
  };

  const showModal = () => {};

  return (
    <>
      <Head>
        <title>Input</title>
      </Head>
      <HeaderAfterLogin />
      {currentUser && (
        <>
          <TitleText>input</TitleText>
          <FormSpace>
            <form onSubmit={handleSubmit(submitData)}>
              <VStack spacing={4} alignItems="left">
                <FormList
                  register={register}
                  errors={errors}
                  files={files}
                  setFiles={setFiles}
                  showPreview={showPreview}
                />
                {imageUrl && (
                  <Box w="100%">
                    <Box m="0 auto" w={200} position="relative">
                      <Image
                        cursor="pointer"
                        border="1px solid #444"
                        src={imageUrl}
                        m="0 auto"
                        alt="preview"
                        w={200}
                        _hover={{
                          opacity: 0.8,
                        }}
                        onClick={showModal}
                      />
                      <Box
                        cursor="pointer"
                        position="absolute"
                        fontSize="14px"
                        bg="#ccc"
                        top="-10%"
                        left="95%"
                        w="20px"
                        borderRadius="50%"
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
        </>
      )}
    </>
  );
};

export default InputData;
