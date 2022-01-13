import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { InputData } from "../../models/interface";
import InputDataList from "../common/inputDataList";

interface Props {
  detailByDate: InputData[];
  clickDelete: (id: string) => void;
  clickCreate: () => void;
}

const Dailydata: NextPage<Props> = ({
  detailByDate,
  clickDelete,
  clickCreate,
}) => {
  return (
    <Box
      w={{ base: "95%", sm: "95%", md: "85%", lg: "80%", xl: "65%" }}
      m="0 auto"
      bg="#fff"
      p="25px"
      border="1px solid #aaa"
    >
      <HStack mb="10px" justify="center">
        <Text as="h1" fontWeight="normal">
          詳細
        </Text>
      </HStack>
      <InputDataList detailData={detailByDate} clickDelete={clickDelete} />
      <HStack m="10px auto" justify="flex-end">
        <Button
          w={{ base: "60px", md: "70px" }}
          h={{ base: "35px", md: "40px" }}
          fontSize={{ base: "12px", md: "16px" }}
          onClick={clickCreate}
        >
          新規登録
        </Button>
      </HStack>
    </Box>
  );
};

export default Dailydata;
