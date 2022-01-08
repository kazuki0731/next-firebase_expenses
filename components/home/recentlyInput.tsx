import { Box, Divider, HStack, Icon, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { NextPage } from "next";
import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { InputData } from "../../models/interface";
import PageLink from "../common/pageLink";
import SimpleSpace from "./simpleSpace";

interface Props {
  recentInputData: InputData[];
}
const RecentlyInput: NextPage<Props> = ({ recentInputData }) => {
  return (
    <SimpleSpace text="最近の入出">
      <Box mt="60px">
        {recentInputData.map((inputData) => (
          <Box key={inputData.id} m="15px auto">
            <HStack
              justify="space-between"
              fontSize={{ base: "16px", md: "22px" }}
            >
              <Box>
                <Text as="span">
                  {dayjs(inputData.date).format("YYYY/M/D")}
                </Text>
                <Text as="span"> ({inputData.category})</Text>
              </Box>
              <Text color={inputData.isExpense ? "#000" : "blue"} as="span">
                {" "}
                {inputData.price}円
              </Text>
            </HStack>
            <Divider />
          </Box>
        ))}
      </Box>
      <Box mt={{ base: "55px", md: "25px" }} textAlign="right">
        <PageLink href="/calendar">
          <Text color="blue.500" fontSize={{ base: "16px", md: "21px" }}>
            <Icon verticalAlign="text-top" as={BsFillArrowRightCircleFill} />{" "}
            カレンダーで見る
          </Text>
        </PageLink>
      </Box>
    </SimpleSpace>
  );
};

export default RecentlyInput;
