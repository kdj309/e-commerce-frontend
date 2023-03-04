import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import Highcharts3D from "highcharts/highcharts-3d";
HighchartsExporting(Highcharts);
Highcharts3D(Highcharts);

export default function PieChart({ data }) {
  const getOptions = (type) => ({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Orders Overview",
      align: "center",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Order status",
        colorByPoint: true,
        data: data,
      },
    ],
  });
  return (
    <div className="border border-light-subtle mt-2">
      <HighchartsReact
        highcharts={Highcharts}
        options={getOptions("pie")}
        allowChartUpdate={true}
      />
    </div>
  );
}
