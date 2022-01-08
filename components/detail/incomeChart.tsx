import { Box, Text } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Pie } from "react-chartjs-2";

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,

  layout: {
    padding: {
      left: 15,
      right: 15,
      bottom: 15,
    },
  },
};

interface Props {
  pieChart: {
    labels: string[];
    datasets:
      | [
          {
            data: number[];
            backgroundColor: string[];
            borderColor?: string[];
            borderWidth: number;
          }
        ]
      | [];
  };
  chartTitle: string;
}

const IncomeChart: NextPage<Props> = ({ pieChart, chartTitle }) => {
  return (
    <Box
      w={{ base: "350px", md: "50%" }}
      border="1px solid #aaa"
      bg="#fff"
      h={{ base: "280px", md: "350px" }}
    >
      <Box
        w={{ base: "220px", md: "265px" }}
        h={{ base: "250px", md: "300px" }}
        m="0 auto"
      >
        <Text mb={{ base: "0", md: "15px" }}> {chartTitle}</Text>
        <Pie data={pieChart} options={pieOptions} />
      </Box>
    </Box>
  );
};

export default IncomeChart;