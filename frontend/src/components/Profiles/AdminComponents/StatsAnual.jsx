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

const faker = [2, 2, 4, 35, 7, 1, 2, 2, 4, 5, 7, 1];

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

export const data = {
  labels,
  datasets: [
    {
      label: "Crées",
      data: faker,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Abouties",
      data: faker,
      backgroundColor: "rgba(0, 128, 0, 0.5)",
    },
    {
      label: "Non abouties",
      data: faker,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Non abouties",
      data: faker,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default function Stats() {
  return <Bar options={options} data={data} />;
}
