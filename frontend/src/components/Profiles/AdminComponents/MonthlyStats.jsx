import { useEffect, useState } from "react";
import statsDecisionsGeneratorByCategory from "../../../services/statsDecisionsGenerator";

export default function MonthlyStats() {
  const [statsByCategoryData, setStatsByCategoryData] = useState([]);

  useEffect(() => {
    const stats = statsDecisionsGeneratorByCategory();
    setTimeout(() => {
      setStatsByCategoryData(stats);
    }, 500);
  }, []);

  const currentMonth = new Date().getMonth();

  return (
    <div className="global-monthly-stats-container">
      <div className="round-container">
        <p className="total-decisions text">
          {statsByCategoryData[currentMonth]?.totalFinished}
        </p>
        <p className="round-text text">décisions au total, dont</p>
        <p className="decisions-created text">
          {statsByCategoryData[currentMonth]?.created}
        </p>
        <p className="round-text text">débutées ce mois</p>
      </div>
      <div className="first-square-container card">
        <div className="top-div-in-square-containers">
          <div className="icon-and-number-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="clock"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <p className="total-numbers text">
              {statsByCategoryData[currentMonth]?.waitingFor}
            </p>
          </div>
          <p className="title text">prises de décisions en attente</p>
        </div>
        <div className="icon-and-number-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="check"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <p className="total-numbers text">
            {statsByCategoryData[currentMonth]?.firstMadeDecision}
          </p>
        </div>
        <p className="title text">premières décisions prises</p>
      </div>
      <div className="second-square-container card">
        <div className="top-div-in-square-containers">
          <div className="icon-and-number-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="clock"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <p className="total-numbers text">
              {statsByCategoryData[currentMonth]?.waitingForExpert}
            </p>
          </div>
          <p className="title text">
            décisions définitives en attente d'experts
          </p>
        </div>
        <div className="icon-and-number-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cross"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <p className="total-numbers text">
            {statsByCategoryData[currentMonth]?.notFinished}
          </p>
        </div>
        <p className="title text">décisions non abouties</p>
      </div>
      <div className="third-square-container card">
        <div className="top-div-in-square-containers">
          <div className="icon-and-number-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="check"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <p className="total-numbers text">
              {statsByCategoryData[currentMonth]?.finishedValid}
            </p>
          </div>
          <p className="title text">décisions définitives validées</p>
        </div>
        <div className="icon-and-number-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cross"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <p className="total-numbers text">
            {statsByCategoryData[currentMonth]?.finishedNotValid}
          </p>
        </div>
        <p className="title text">décisions définitives non validées</p>
      </div>
    </div>
  );
}
