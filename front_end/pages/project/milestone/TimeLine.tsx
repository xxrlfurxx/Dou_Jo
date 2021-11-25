import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { ApexOptions } from "apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../../provider";

const project = useSelector((state: RootState) => state.project);
const milestoneList = projectItem?.milestone;
const TimeLine = () => {
  series: [
    {
      data: [
        {
          x: "Analysis",
          y: [
            new Date("2019-02-27").getTime(),
            new Date("2019-03-04").getTime(),
          ],
          fillColor: "#008FFB",
        },
      ],
      chart: {
        height: 350,
        type: "rangeBar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false,
          },
        },
      },

      xaxis: {
        type: "datetime",
      },
      yaxis: {
        show: false,
      },
      grid: {
        row: {
          colors: ["#f3f4f5", "#fff"],
          opacity: 1,
        },
      },
    },
  ];

  return <div></div>;
};

export default TimeLine;
