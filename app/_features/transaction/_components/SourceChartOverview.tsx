import PieCharts from "@/app/_ui/PieChart";

export default function SourceChartOverview() {
  const channelData = [
    { name: "Voice", value: 58 },
    { name: "WhatsApp", value: 30 },
    { name: "Web", value: 10 },
  ];
  return <PieCharts data={channelData} />;
}
