/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  // Colors,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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

export default function Stats({ statsData }) {
  // console.log("🚀 - statsData:", statsData);

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

  const data = {
    labels,
    datasets: [
      {
        label: "Crées",
        data: generateDataByMonth("created"),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Validées",
        data: generateDataByMonth("finishedValid"),
        backgroundColor: "rgba(0, 128, 0, 0.5)",
      },
      {
        label: "Non validées",
        data: generateDataByMonth("finishedNotValid"),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Non abouties",
        data: generateDataByMonth("notFinished"),
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
    ],
  };

  // console.log(data.datasets[3].data);
  return <Bar options={options} data={data} />;
}
