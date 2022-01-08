import { Box, Divider, HStack, Icon, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { AllCategoryData } from "../../models/interface";
import PageLink from "../common/pageLink";
import SimpleSpace from "./simpleSpace";

interface Props {
  recentExpenseData: AllCategoryData;
}
const TotalBalance: NextPage<Props> = ({ recentExpenseData }) => {
  return (
    <SimpleSpace text={`${new Date().getMonth() + 1}月の収支`}>
      <Box mt="60px">
        <HStack justify="space-between">
          <Text as="span">当月収入:</Text>
          <Text as="span">{recentExpenseData.totalIncomePrice}円</Text>
        </HStack>
        <Divider my="5px" />
        <HStack justify="space-between">
          <Text as="span">当月支出:</Text>
          <Text as="span">{recentExpenseData.totalExpensePrice}円</Text>
        </HStack>
        <Divider my="5px" />
        <HStack justify="space-between">
          <Text as="span">当月収支:</Text>
          <Text as="span">{recentExpenseData.totalBalancePrice}円</Text>
        </HStack>
        <Divider my="5px" />
      </Box>

      <Box mt="65px" textAlign="right">
        <PageLink href="/total">
          <Text color="blue.500" fontSize="21px">
            <Icon verticalAlign="text-top" as={BsFillArrowRightCircleFill} />{" "}
            詳しく見る
          </Text>
        </PageLink>
      </Box>
    </SimpleSpace>
  );
};

export default TotalBalance;
