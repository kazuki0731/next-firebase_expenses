import Head from "next/head";
import { NextPage } from "next";
import { VStack } from "@chakra-ui/layout";
import { Button, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import TitleText from "../components/common/titleText";
import { useContext, useState } from "react";
import { AuthContext } from "../hooks/authProvider";
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
  const { currentUser } = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  const submitData = async (data: FormData) => {
    const { text } = await postData(data);
    setMsg(text);
    reset();
  };

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
              <VStack spacing={4} alignItems="left">
                <FormList register={register} errors={errors} />
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
