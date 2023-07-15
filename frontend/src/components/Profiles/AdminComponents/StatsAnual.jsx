/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useEffect, useState } from "react";
import { statsDecisionsGeneratorByMonth } from "../../../services/statsDecisionsGenerator";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Decisions Count",
    },
  },
};

const labels = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export default function Stats() {
  const [statsData, setStatsData] = useState();
  const [createdData, setCreatedData] = useState();
  const [finishedValidData, setFinishedValidData] = useState();
  const [finishedNotValidData, setFinishedNotValidData] = useState();
  const [notFinishedData, setNotFinishedData] = useState();

  useEffect(() => {
    setStatsData(statsDecisionsGeneratorByMonth());
  }, []);

  const generateDataByMonth = (category) => {
    const categoryArray = [];
    statsData.forEach((dataPerMonth) => {
      if (dataPerMonth[category] > 0) {
        categoryArray.push(dataPerMonth[category]);
      } else {
        categoryArray.push("");
      }
    });
    return categoryArray;
  };

  useEffect(() => {
    if (statsData) {
      setTimeout(() => {
        setCreatedData(() => generateDataByMonth("created"));
        setFinishedValidData(() => generateDataByMonth("finishedValid"));
        setFinishedNotValidData(() => generateDataByMonth("finishedNotValid"));
        setNotFinishedData(() => generateDataByMonth("notFinished"));
      }, 200);
    }
  }, [statsData, setStatsData]);

  const data = {
    labels,
    datasets: [
      {
        label: "Crées",
        data: createdData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Validées",
        data: finishedValidData,
        backgroundColor: "rgba(0, 128, 0, 0.5)",
      },
      {
        label: "Non validées",
        data: finishedNotValidData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Non abouties",
        data: notFinishedData,
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
