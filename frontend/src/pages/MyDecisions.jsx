import { useEffect, useState } from "react";
import axios from "axios";
import CardDecision from "../components/CardDecision";

export default function MyDecisions() {
  const [allDecisions, setAllDecision] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  const [currentStatus, setCurrentStatus] = useState();

  const [showDecisions, setShowDecisions] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions`)
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

  const ShowCurrentStatus = (statut) => {
    if (statut.id === currentStatus) {
      setShowDecisions(!showDecisions);
    } else {
      setCurrentStatus(statut.id);
    }
  };

  return (
    <div className="all-decisions-container">
      <div className="title-container">
        <h1>Mes décisions</h1>
        <button type="button">
          <i className="fa-solid fa-plus" />
          Créer une décision
        </button>
      </div>
      {allStatus.map((statut) => (
        <div className="decisions-container" key={statut.id}>
          <div className="infos-status-container">
            <button type="button" onClick={() => ShowCurrentStatus(statut)}>
              <i className="fa-sharp fa-solid fa-caret-down" />
            </button>
            <h1>{statut.title}</h1>
          </div>
          <hr />
          {showDecisions && statut.id === currentStatus && (
            <div className="cards-decision-container">
              {allDecisions
                .filter((decision) => decision.title_status === statut.title)
                .map((decision) => (
                  <CardDecision key={decision.id} decision={decision} />
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
