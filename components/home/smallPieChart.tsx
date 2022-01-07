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
}

const SmallPieChart: NextPage<Props> = ({ pieChart }) => {
  return (
    <Box w="325px" m="0 auto">
      <Box w="325px" h="260px">
        <Pie width="260px" data={pieChart} options={pieOptions} />
      </Box>
    </Box>
  );
};

export default SmallPieChart;
