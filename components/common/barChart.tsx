import { Box } from "@chakra-ui/layout";
import { NextPage } from "next";
import { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { DataContext } from "./hooks/dataProvider";

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
  nowYear: number;
  monthlyAvg: number;
}

const BarChart: NextPage<Props> = ({ barChart, nowYear, monthlyAvg }) => {
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
        text: `平均: ${monthlyAvg}円／月（${nowYear}年）`,
        font: {
          size: 18,
        },
      },
      legend: {
        display: false,
      },
    },
  };
  return (
    <Box m="10px auto 20px" w={{ base: "320px", md: "100%" }}>
      <Box
        w={{ base: "300px", md: "550px" }}
        h={{ base: "200px", md: "350px" }}
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
