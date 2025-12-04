import LineCharts from "@/app/_ui/LineChart";

export default function SupportChart() {
  const data = [
    { name: "Mon", pv: 2400, amt: 2400 },
    { name: "Tue", pv: 1398, amt: 2210 },
    { name: "Wed", pv: 9800, amt: 2290 },
    { name: "Thur", pv: 3908, amt: 2000 },
    { name: "Fri", pv: 4800, amt: 2181 },
    { name: "Sat", pv: 3800, amt: 2500 },
  ];
  return <LineCharts data={data} />;
}
