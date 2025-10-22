import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type data = { x: number; y1: number; y2: number }[];

interface LiveChartProps {
  height: number;
  width: number;
  data: data; // Object with an x and two possible y's
  xName: string;
  y1Name: string;
  y1Color: string;
  y1range: [number, number];
  y2Name: string;
  y2Color: string;
  y2range: [number, number];
  chartName: string;
  xValuesPerFrame?: number;
  started: boolean;
}

const LiveChart: React.FC<LiveChartProps> = ({
  height,
  width,
  data,
  xName,
  y1Name,
  y1Color,
  y1range,
  y2Name,
  y2Color,
  y2range,
  chartName,
  xValuesPerFrame = 100,
  started,
}) => {
  const [shownData, setShownData] = useState<{ index: number; data: data }>({
    index: 0,
    data: data,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setShownData((prev) => {
        const newIndex = prev.index + 1;
        console.log(newIndex);
        if (newIndex > data.length - xValuesPerFrame) {
          console.log("ENDED");
          return prev;
        }
        return {
          index: newIndex,
          data: data.slice(newIndex, xValuesPerFrame + newIndex),
        };
      });
    }, 500);

    if (!started) {
      setTimeout(() => {
        clearInterval(interval);
      }, 600);
      return;
    }

    return () => clearInterval(interval);
  }, [started]);

  return (
    <>
      <div className="live-chart-container">
        <h4 style={{ textAlign: "center", fontWeight: "normal", opacity: 0.6 }}>
          {chartName}
        </h4>
        <LineChart
          width={width}
          height={height}
          data={shownData.data}
          margin={{ top: 5, right: 25, left: 25 }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <Line
            type="monotone"
            yAxisId="left"
            dataKey="y1"
            stroke={y1Color}
            strokeWidth={1}
            name={y1Name}
            animationEasing="linear"
            animationDuration={200}
            dot={false}
          />
          <Line
            type="monotone"
            yAxisId="right"
            dataKey="y2"
            stroke={y2Color}
            strokeWidth={1}
            name={y2Name}
            animationEasing="linear"
            animationDuration={200}
            dot={false}
          />
          <XAxis dataKey="x" name={xName} />
          <YAxis
            yAxisId="left"
            domain={y1range}
            orientation="left"
            tickFormatter={(val: number, _) => val.toExponential(2)}
          >
            <Label value={y1Name} position="center" angle={-90} dx={-45} />
          </YAxis>
          <YAxis
            yAxisId="right"
            domain={y2range}
            orientation="right"
            tickFormatter={(val: number, _) => val.toExponential(2)}
          >
            <Label value={y2Name} position="center" angle={-90} dx={45} />
          </YAxis>
          <Legend align="center" />
          <Tooltip />
        </LineChart>
      </div>
    </>
  );
};

export default LiveChart;
