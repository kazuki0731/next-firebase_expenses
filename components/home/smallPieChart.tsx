import { Box } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Pie } from "react-chartjs-2";
import { pieOptions } from "../../const/optins";

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
