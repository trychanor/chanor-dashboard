import LineCharts from "@/app/_ui/LineChart";

export default function ProfitOverviewChart() {
  const data = [
    { name: "Monday", pv: 2400, amt: 2400 },
    { name: "Tuesday", pv: 1398, amt: 2210 },
    { name: "Wednesday", pv: 9800, amt: 2290 },
    { name: "Thursday", pv: 3908, amt: 2000 },
    { name: "Friday", pv: 4800, amt: 2181 },
    { name: "Saturday", pv: 3800, amt: 2500 },
    { name: "Sunday", pv: 4300, amt: 2100 },
  ];
  return <LineCharts data={data} />;
}
