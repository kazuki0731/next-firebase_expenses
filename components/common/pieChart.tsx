import { Box } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Pie } from "react-chartjs-2";

const pieOptions = {
  maintainAspectRatio: false,
  responsive: true,

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

const PieChart: NextPage<Props> = ({ pieChart }) => {
  return (
    <Box w={300} h={300} m="0 auto">
      <Pie data={pieChart} options={pieOptions} />
    </Box>
  );
};

export default PieChart;
