import { Box, Text } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Pie } from "react-chartjs-2";
import { pieOptions } from "../../const/optins";
import { Chart } from "../../models/interface";

interface Props {
  pieChart: Chart;
  chartTitle: string;
}

const ExpenseChart: NextPage<Props> = ({ pieChart, chartTitle }) => {
  return (
    <Box
      w={{ base: "350px", md: "50%" }}
      border="1px solid #aaa"
      bg="#fff"
      h={{ base: "280px", md: "350px" }}
      m="0 auto"
    >
      <Box
        w={{ base: "350px", md: "350px" }}
        h={{ base: "250px", md: "300px" }}
        m="0 auto"
      >
        <Text>{chartTitle}</Text>
        <Pie data={pieChart} options={pieOptions} />
      </Box>
    </Box>
  );
};

export default ExpenseChart;
