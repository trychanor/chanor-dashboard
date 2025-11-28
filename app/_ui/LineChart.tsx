import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type ChartDataPoint = {
  [key: string]: string | number;
};

type ChartsProps = {
  data: ChartDataPoint[];
  additionalStyles?: string;
};

export default function LineCharts({ data, additionalStyles }: ChartsProps) {
  return (
    <LineChart
      className={`w-full h-full ${additionalStyles}`}
      style={{
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8979FF"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
