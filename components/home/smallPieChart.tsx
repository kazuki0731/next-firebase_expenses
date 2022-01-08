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
    <Box w={{ base: "260px", md: "325px" }} h="260px">
      <Pie data={pieChart} options={pieOptions} />
    </Box>
    // </Box>
  );
};

export default SmallPieChart;
