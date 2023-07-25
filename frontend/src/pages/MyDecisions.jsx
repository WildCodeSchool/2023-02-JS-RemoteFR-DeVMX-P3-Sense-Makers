import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import CardDecision from "../components/CardDecision";
import userContext from "../contexts/userContext";

export default function MyDecisions() {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const [allDecisions, setAllDecision] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}/decisions`, {
        withCredentials: true,
      })
      .then((res) => setAllDecision(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/status`, {
        withCredentials: true,
      })
      .then((res) => setAllStatus(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="all-decisions-container">
      <div className="timeline-zone" />
      <div className="title-container">
        <h1>{t("decisions.myTitle")}</h1>
        <button type="button" onClick={() => navigate("/logged/postdecision")}>
          <i className="fa-solid fa-plus" />
          {t("decisions.create")}
        </button>
      </div>
      {allStatus.map((statut) => (
        <div className="infos-status-container" key={statut.id}>
          <details className="details-container">
            <summary>
              {t(`decisions.status.${statut.id}`)}
              <hr />
            </summary>
            <div className="cards-decision-container">
              {allDecisions
                .filter((decision) => decision.title_status === statut.title)
                .map((decision) => (
                  <CardDecision key={decision.d_id} decision={decision} />
                ))}
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}
