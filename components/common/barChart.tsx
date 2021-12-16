import { Box } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Bar } from "react-chartjs-2";

const options = {
  maintainAspectRatio: false,
  responsive: true,
  layout: {
    padding: {
      top: 5,
      left: 15,
      right: 15,
      bottom: 10,
    },
  },
  plugins: {
    title: {
      display: true,
      text: "支出/月",
      font: {
        size: 20,
      },
    },
    legend: {
      display: false,
    },
  },
};

interface Props {
  barChart: {
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

const BarChart: NextPage<Props> = ({ barChart }) => {
  return (
    <Box w={{ base: "260px", md: "50%" }}>
      <Box
        w={{ base: "260px", lg: "420px" }}
        h={{ base: "200px", lg: "300px" }}
        m="0 auto"
        bg={"white"}
        boxShadow="dark-lg"
        rounded="xl"
      >
        <Bar data={barChart} options={options} />
      </Box>
    </Box>
  );
};

export default BarChart;
