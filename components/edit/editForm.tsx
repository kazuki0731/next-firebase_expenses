import React from "react";
import { Text, VStack, Box } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import FormList from "../../components/edit/formList";
import FormButton from "../../components/edit/formButton";
import FormSpace from "../../components/input/formSpace";
import { NextPage } from "next";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import {
  CategoryErrors,
  InputData,
} from "../../models/interface";

interface Props {
  handleSubmit: UseFormHandleSubmit<InputData>;
  register: UseFormRegister<InputData>;
  changeData: (data: InputData) => Promise<void>;
  imageUrl: string;
  errors: CategoryErrors;
  msg: string;
  onOpen: () => void;
  createdAt: string;
  clickBack: () => void;
}

const EditForm: NextPage<Props> = ({
  handleSubmit,
  register,
  changeData,
  imageUrl,
  errors,
  msg,
  onOpen,
  createdAt,
  clickBack,
}) => {
  return (
    <FormSpace>
      <form onSubmit={handleSubmit(changeData)}>
        <VStack spacing={4} alignItems="flex-start">
          <FormList register={register} errors={errors} createdAt={createdAt} />
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
  );
};

export default EditForm;
