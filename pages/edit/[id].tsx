import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/layout";
import { Image, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PreviewModal from "../../components/common/previewModal";
import { InputData } from "../../models/interface";
import HeaderAfterLogin from "../../components/common/headerAfterLogin";
import EditForm from "../../components/edit/editForm";
import { useChangeData, useGetDataById } from "../../hooks/edit";

const Edit: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputData>();
  const { imageUrl, createdAt, getDataById } = useGetDataById();
  const { msg, saveData } = useChangeData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const id = router.query.dataId;

  const getInputData = async () => {
    if (!id) return;
    const inputData = await getDataById(id);
    reset(inputData);
  };

  useEffect(() => {
    getInputData();
  }, []);

  const changeData = async (data: InputData) => {
    if (!id) return;
    saveData(data, id);
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
