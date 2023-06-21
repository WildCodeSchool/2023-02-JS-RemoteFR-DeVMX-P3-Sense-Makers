import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CardDecision from "../components/CardDecision";

export default function MyDecisions() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [allDecisions, setAllDecision] = useState([]);
  const [allStatus, setAllStatus] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}/decisions`)
      .then((res) => setAllDecision(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/status`)
      .then((res) => setAllStatus(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="all-decisions-container">
      <div className="title-container">
        <h1>Mes décisions</h1>
        <button type="button" onClick={() => navigate("/postdecision")}>
          <i className="fa-solid fa-plus" />
          Créer une décision
        </button>
      </div>
      {allStatus.map((statut) => (
        <div className="infos-status-container" key={statut.id}>
          <details className="details-container">
            <summary>
              {statut.title}
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
