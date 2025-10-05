import type { ApexOptions } from "apexcharts";
import ApexChart from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

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

const options: ApexOptions = {
  chart: {
    id: "realtime",
    height: 350,
    type: "line",
    animations: {
      enabled: true,
      animateGradually: {
        enabled: true,
        delay: 500,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 500,
      },
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  colors: ["#fe6d0dff"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  title: {
    text: "Error Rate by Time (seconds)",
    align: "left",
  },
  xaxis: {
    type: "numeric",
    tickAmount: "dataPoints",
    tickPlacement: "on",
    decimalsInFloat: 0,
  },
  yaxis: {
    min: 0,
    max: 1,
    decimalsInFloat: 2,
  },
};

const LiveChart: React.FC = () => {
  const [data, setData] = useState<{ index: number; points: Point[] }>({
    index: 0,
    points: [],
  });
  const [series, _] = useState<ApexNonAxisChartSeries>([
    {
      name: "error",
      data: data.points,
    },
  ]);

  useEffect(() => {
    ApexChart.exec("realtime", "updateSeries", [
      {
        data: data.points,
      },
    ]);
    console.log(data);
  }, [data]);

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
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={400}
          width={1000}
        />
      </div>
    </>
  );
};

export default LiveChart;
