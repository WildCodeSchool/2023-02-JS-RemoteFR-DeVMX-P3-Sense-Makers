import { useState, useEffect } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import axios from "axios";
import DecisionsList from "../components/Profiles/AdminComponents/DecisionsList";
import UsersList from "../components/Profiles/AdminComponents/UsersList";
import StatsAnual from "../components/Profiles/AdminComponents/StatsAnual";

export default function Administration() {
  const [decisionsData, setDecisionsData] = useState([]);
  const [statsData, setStatsData] = useState([]);

  const getStatsData = (data) => {
    const monthArray = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];

    const decisionsByMonth = [];

    for (let i = 0; i < monthArray.length; i += 1) {
      const resultByMonth = [];

      const statsResult = {
        created: 0,
        firstMadeDecision: 0,
        waitingFor: 0,
        waitingForExpert: 0,
        notFinished: 0,
        finishedValid: 0,
        finishedNotValid: 0,
        totalFinished: 0,
      };

      for (const decision of data) {
        const date = new Date(decision.initial_date);
        const month = date.toLocaleString("default", {
          month: "long",
        });
        if (month === monthArray[i]) {
          const decisionStatus = decision.status_id;
          const isValidatedDecision = decision.is_validated;

          if (decisionStatus === 2) statsResult.waitingFor += 1;
          if (decisionStatus === 3) statsResult.firstMadeDecision += 1;
          if (decisionStatus === 4) statsResult.waitingForExpert += 1;
          if (isValidatedDecision === 0) statsResult.finishedNotValid += 1;
          if (isValidatedDecision === 1) statsResult.finishedValid += 1;
          if (decisionStatus === 6) statsResult.totalFinished += 1;
          if (decisionStatus === 7) statsResult.notFinished += 1;

          statsResult.created += 1;
        }
      }
      resultByMonth.push(statsResult);

      decisionsByMonth.push(resultByMonth[0]);
    }
    setStatsData(decisionsByMonth);
  };

  useEffect(() => {
    getStatsData(decisionsData);
  }, [decisionsData]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions`, {
        withCredentials: true,
      })
      .then((response) => setDecisionsData(response.data))
      .catch((err) => console.error(err));
  }, []);
  const { t } = useTranslation();

  return (
    <div className="admin-global-container">
      <details className="details-container">
        <summary>
          {t("admin.stats")}
          <hr />
        </summary>
        <StatsAnual statsData={statsData} />
      </details>
      <details className="details-container">
        <summary>
          {t("admin.userManagement")}
          <hr />
        </summary>
        <UsersList />
      </details>
      <details className="details-container">
        <summary>
          {t("admin.decisionsManagement")}
          <hr />
        </summary>
        <DecisionsList />
      </details>
      <ToastContainer autoClose={1500} transition={Slide} />
    </div>
  );
}
