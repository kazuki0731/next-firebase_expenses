import { VStack, Text, Icon, Box } from "@chakra-ui/react";
import React from "react";
import SimpleSpace from "./simpleSpace";
import SimpleFormList from "../../components/home/simpleFormList";
import { NextPage } from "next";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Errors, SubmitFormData } from "../../models/interface";
import PageLink from "../common/pageLink";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

interface Props {
  handleSubmit: UseFormHandleSubmit<SubmitFormData>;
  register: UseFormRegister<SubmitFormData>;
  submitData: (data: SubmitFormData) => Promise<void>;
  errors: Errors;
  msg: string | null;
}

const SimpleInput: NextPage<Props> = ({
  handleSubmit,
  register,
  submitData,
  errors,
  msg,
}) => {
  return (
    <SimpleSpace text="かんたん入力">
      <form onSubmit={handleSubmit(submitData)}>
        <VStack
          mt={{ base: "10px", md: "0" }}
          spacing={{ base: "15px", md: "10px" }}
          alignItems="left"
        >
          <SimpleFormList register={register} errors={errors} />
        </VStack>
      </form>
      {msg && (
        <Text
          mt="5px"
          fontSize={{ base: "18px", md: "22px" }}
          color={msg === "登録しました" ? "blue" : "red"}
        >
          {msg}
        </Text>
      )}
      <Box mt={msg ? "-4px" : "30px"} textAlign="right">
        <PageLink href="/detail">
          <Text color="blue.500" fontSize={{ base: "16px", md: "21px" }}>
            <Icon verticalAlign="text-top" as={BsFillArrowRightCircleFill} />{" "}
            詳しく見る
          </Text>
        </PageLink>
      </Box>
    </SimpleSpace>
  );
};

export default SimpleInput;
