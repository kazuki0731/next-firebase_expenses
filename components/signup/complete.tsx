import { Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import PageLink from "../common/pageLink";

interface Props {
  memberData: {
    name: string;
    email: string;
  };
  msg: string;
}

const Complete: NextPage<Props> = ({ memberData, msg }) => {
  return (
    <VStack spacing={4}>
      <Text fontWeight="semibold">{msg}</Text>
      <Text>ニックネーム: {memberData.name} さん</Text>
      <Text>email: {memberData.email}</Text>
      <PageLink href="/home" color={"blue.300"} underline={"underLine"}>
        会員ページへ
      </PageLink>
    </VStack>
  );
};

export default Complete;
