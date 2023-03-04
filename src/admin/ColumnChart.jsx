import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const ColumnChart = ({ title, data, xaxistitle, yaxistitle }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "column",
      style: {
        fontFamily: "Overpass",
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        allowPointSelect: true,
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        cursor: "pointer",
        states: {
          hover: {
            enabled: false,
          },
          inactive: {
            opacity: 1,
          },
        },
      },
    },
    legend: {
      symbolRadius: 0,
    },
    xAxis: {
      title: {
        text: xaxistitle,
      },
      labels: {
        enabled: false,
      },
      tickLength: 0,
    },
    yAxis: {
      title: {
        text: yaxistitle,
      },
    },
    title: {
      align: "center",
      style: {
        fontSize: "16px",
      },
      text: title,
    },
    tooltip: {
      enabled: false,
    },
  });

  useEffect(() => {
    // set options from props
    const columnData = data.map((point) => ({
      name: point.name,
      data: [point.y],
    }));
    // overwrite the options - the new ones will be passed to chart.update()
    // see https://github.com/highcharts/highcharts-react#optimal-way-to-update
    setChartOptions({
      // @ts-ignore
      series: columnData,
    });
  }, [data]);

  return (
    <HighchartsReact
      allowChartUpdate={true}
      highcharts={Highcharts}
      containerProps={{ style: { width: "100%", height: "100%" } }}
      options={chartOptions}
    />
  );
};
