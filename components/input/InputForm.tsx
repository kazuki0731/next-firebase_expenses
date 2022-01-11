import { NextPage } from "next";
import React from "react";
import { VStack } from "@chakra-ui/layout";
import { Button, Text, Box, Image } from "@chakra-ui/react";
import FormList from "../../components/input/formList";
import FormSpace from "../../components/input/formSpace";
import { CategoryErrors, SubmitFormData } from "../../models/interface";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

interface Props {
  handleSubmit: UseFormHandleSubmit<SubmitFormData>;
  register: UseFormRegister<SubmitFormData>;
  submitForm: (data: SubmitFormData) => Promise<void>;
  errors: CategoryErrors;
  imageUrl: string;
  showPreview: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dateFromCalendar: string | string[] | undefined;
  deletePreview: ({
    price,
    title,
    category,
    memo,
    date,
  }: SubmitFormData) => void;
  msg: string;
  onOpen: () => void;
}

const InputForm: NextPage<Props> = ({
  handleSubmit,
  register,
  submitForm,
  errors,
  imageUrl,
  showPreview,
  deletePreview,
  dateFromCalendar,
  msg,
  onOpen,
}) => {
  return (
    <FormSpace>
      <form onSubmit={handleSubmit(submitForm)}>
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
        <Text mt={2} color={msg === "登録しました" ? "blue" : "red"}>
          {msg}
        </Text>
      )}
    </FormSpace>
  );
};

export default InputForm;
