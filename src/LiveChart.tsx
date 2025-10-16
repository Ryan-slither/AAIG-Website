import React, { useEffect, useState } from "react";
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

interface Point {
  x: number;
  y: number;
}

const CHOICES = [-0.1 - 0.05, -0.01, 0.01, 0.05, 0.1];

var start = 0.5;
const dataset: Point[] = Array.from({ length: 240 }, (_, i) => {
  start += CHOICES[Math.floor(Math.random() * CHOICES.length)];
  start = start < 0 ? 0 : start > 1 ? 1 : start;
  return { x: i, y: start };
});

interface LiveChartProps {
  height: number;
  width: number;
}

const LiveChart: React.FC<LiveChartProps> = ({ height, width }) => {
  const [data, setData] = useState<{ index: number; points: Point[] }>({
    index: 0,
    points: [],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newIndex = prev.index + 1;
        console.log(newIndex);
        if (newIndex > dataset.length - 60) {
          console.log("ENDED");
          return prev;
        }
        return {
          index: newIndex,
          points: dataset.slice(newIndex, 60 + newIndex),
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="live-chart-container">
        <LineChart
          width={width}
          height={height}
          data={data.points}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line
            type="monotone"
            dataKey="y"
            stroke="purple"
            strokeWidth={2}
            name="My data series name"
            animationEasing="linear"
            animationDuration={200}
            dot={false}
          />
          <XAxis dataKey="x" />
          <YAxis
            width="auto"
            label={{ value: "y", position: "insideLeft", angle: -90 }}
          />
          <Legend align="right" />
          <Tooltip />
        </LineChart>
      </div>
    </>
  );
};

export default LiveChart;
