"use client";

import { PieChart, Pie, Cell, Legend } from "recharts";
import type { PieLabelRenderProps } from "recharts";

const RADIAN = Math.PI / 180;

interface PieChartWithCustomizedLabelProps {
  data: { name: string; value: number }[];
  colors?: string[];
  width?: number;
  height?: number;
  isAnimationActive?: boolean;
}

/**
 * Reusable Pie Chart component
 * - Pass your own data, colors, width, height
 * - Supports labels and legend
 */

// Sample data
// const channelData = [
//   { name: "Voice", value: 58 },
//   { name: "WhatsApp", value: 30 },
//   { name: "Web", value: 10 },
// ];

export default function PieCharts({
  data,
  colors = ["#4845FF", "#FCCA00", "#FF7E0C"],
  width = 370,
  height = 370,
  isAnimationActive = true,
}: PieChartWithCustomizedLabelProps) {
  // Custom label renderer
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: PieLabelRenderProps & { index?: number }) => {
    if (
      cx == null ||
      cy == null ||
      innerRadius == null ||
      outerRadius == null
    ) {
      return null;
    }

    const radius =
      Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 1.3;
    const x = Number(cx) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = Number(cy) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    const name = data[index ?? 0].name;
    const percentage = `${((percent ?? 0) * 100).toFixed(0)}%`;
    const color = colors[index ?? 0];

    return (
      <text
        x={x}
        y={y}
        fill={color}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "14px", fontWeight: 600 }}
      >
        {`${name} ${percentage}`}
      </text>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={isAnimationActive}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          align="center"
          formatter={(value) => {
            const item = data.find((d) => d.name === value);
            return `${item?.value}% ${value}`;
          }}
        />
      </PieChart>
    </div>
  );
}
