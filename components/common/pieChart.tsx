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
    <Box w={{ base: "250px", md: "50%" }}>
      <Box
        w={{ base: "250px", lg: "300px" }}
        h={{ base: "250px", lg: "300px" }}
        m="0 auto"
      >
        <Pie data={pieChart} options={pieOptions} />
      </Box>
    </Box>
  );
};

export default PieChart;
