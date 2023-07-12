import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import CardDecision from "../components/CardDecision";

export default function Home() {
  const [allDecisions, setAllDecision] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions`, {
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
      <h1>{t("home.title")}</h1>
      {allStatus.map((statut) => (
        <div className="infos-status-container" key={statut.id}>
          <details className="details-container">
            <summary>
              {t(`home.status.${statut.id}`)}
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
