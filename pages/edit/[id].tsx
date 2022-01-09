import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import TitleText from "../../components/common/titleText";
import { Text, VStack, Box } from "@chakra-ui/layout";
import { Image, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { storage } from "../../lib/firebase";
import { useForm } from "react-hook-form";
import FormList from "../../components/edit/formList";
import FormButton from "../../components/edit/formButton";
import FormSpace from "../../components/input/formSpace";
import { getDownloadURL, ref } from "firebase/storage";
import PreviewModal from "../../components/common/previewModal";
import {
  selectedInputData,
  updateInputData,
} from "../../apiCaller/inputDataQuery";
import { InputData } from "../../models/interface";
import HeaderAfterLogin from "../../components/common/headerAfterLogin";

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

  const getData = async () => {
    if (!id) return;
    try {
      const inputData = await selectedInputData(id);
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
    getData();
  }, []);

  const changeData = async (data: InputData) => {
    if (!id) return;
    data.price = Number(data.price);
    try {
      updateInputData(data, id);
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
      <HeaderAfterLogin />
      <Text fontSize="26px" fontWeight="semibold">
        詳細
      </Text>
      <FormSpace>
        <form onSubmit={handleSubmit(changeData)}>
          <VStack spacing={4} alignItems="flex-start">
            <FormList
              register={register}
              errors={errors}
              createdAt={createdAt}
            />
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
