import { Box, Icon, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import PageLink from "../common/pageLink";
import SimpleSpace from "./simpleSpace";
import SmallPieChart from "./smallPieChart";
import { Chart } from "../../models/interface";

interface Props {
  pieChart: Chart;
}

const CategoryChart: NextPage<Props> = ({ pieChart }) => {
  return (
    <SimpleSpace text="カテゴリ別支出">
      <SmallPieChart pieChart={pieChart} />
      <Box textAlign="right">
        <PageLink href="/list">
          <Text color="blue.500" fontSize={{ base: "16px", md: "21px" }}>
            <Icon verticalAlign="text-top" as={BsFillArrowRightCircleFill} />{" "}
            詳しく見る
          </Text>
        </PageLink>
      </Box>
    </SimpleSpace>
  );
};

export default CategoryChart;
