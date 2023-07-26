import { useTranslation } from "react-i18next";

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
import statsDecisionsGeneratorByCategory from "../../services/statsDecisionsGenerator";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

export default function AnualStats() {
  const [statsByCategoryData, setStatsByCategoryData] = useState([]);
  const [createdData, setCreatedData] = useState([]);
  const [finishedValidData, setFinishedValidData] = useState([]);
  const [finishedNotValidData, setFinishedNotValidData] = useState([]);
  const [notFinishedData, setNotFinishedData] = useState([]);

  const { t } = useTranslation();

  const labels = [
    t("anualStats.january"),
    t("anualStats.february"),
    t("anualStats.march"),
    t("anualStats.april"),
    t("anualStats.may"),
    t("anualStats.june"),
    t("anualStats.july"),
    t("anualStats.august"),
    t("anualStats.september"),
    t("anualStats.october"),
    t("anualStats.november"),
    t("anualStats.december"),
  ];

  useEffect(() => {
    setStatsByCategoryData(statsDecisionsGeneratorByCategory());
  }, []);

  const generateDataByMonthLabels = (category) => {
    const categoryArray = [];
    statsByCategoryData.forEach((dataPerMonth) => {
      if (dataPerMonth[category] > 0) {
        categoryArray.push(dataPerMonth[category]);
      } else {
        categoryArray.push("");
      }
    });
    return categoryArray;
  };

  useEffect(() => {
    if (statsByCategoryData) {
      setTimeout(() => {
        setCreatedData(() => generateDataByMonthLabels("created"));
        setFinishedValidData(() => generateDataByMonthLabels("finishedValid"));
        setFinishedNotValidData(() =>
          generateDataByMonthLabels("finishedNotValid")
        );
        setNotFinishedData(() => generateDataByMonthLabels("notFinished"));
      }, 200);
    }
  }, [statsByCategoryData, setStatsByCategoryData]);

  const data = {
    labels,
    datasets: [
      {
        label: t("anualStats.created"),
        data: createdData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: t("anualStats.notValidated"),
        data: finishedNotValidData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: t("anualStats.validated"),
        data: finishedValidData,
        backgroundColor: "rgba(0, 128, 0, 0.5)",
      },
      {
        label: t("anualStats.notFinished"),
        data: notFinishedData,
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
