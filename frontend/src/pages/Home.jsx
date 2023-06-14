import { useEffect, useState } from "react";
import axios from "axios";
import CardDecision from "../components/CardDecision";

export default function Home() {
  const [allDecisions, setAllDecision] = useState([]);
  const [showDecisionsCreated, setShowDecisionsCreated] = useState(false);
  const [showDecisionsOpinionDeadline, setShowDecisionsOpinionDeadline] =
    useState(false);
  const [showDecisionsDecisionTaken, setShowDecisionsDecisionTaken] =
    useState(false);
  const [showDecisionsConflict, setShowDecisionsConflict] = useState(false);
  const [showDecisionsFinalDecision, setShowDecisionsFinalDecision] =
    useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions`)
      .then((res) => setAllDecision(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="all-decisions-container">
      <h1>Toutes les décisions</h1>
      <div className="decisions-container">
        <div className="infos-status-container">
          <button
            type="button"
            onClick={() => setShowDecisionsCreated(!showDecisionsCreated)}
          >
            <i className="fa-sharp fa-solid fa-caret-down" />
          </button>
          <h1>Statut created</h1>
        </div>
        <hr />
        {showDecisionsCreated && (
          <div className="cards-decision-container">
            {allDecisions
              .filter((decision) => decision.title_status === "created")
              .map((decision) => (
                <CardDecision key={decision.id} decision={decision} />
              ))}
          </div>
        )}
      </div>
      <div className="decisions-container">
        <div className="infos-status-container">
          <button
            type="button"
            onClick={() =>
              setShowDecisionsOpinionDeadline(!showDecisionsOpinionDeadline)
            }
          >
            <i className="fa-sharp fa-solid fa-caret-down" />
          </button>
          <h1>Statut deadline</h1>
        </div>
        <hr />
        {showDecisionsOpinionDeadline && (
          <div className="cards-decision-container">
            {allDecisions
              .filter(
                (decision) => decision.title_status === "opinion deadline"
              )
              .map((decision) => (
                <CardDecision key={decision.id} decision={decision} />
              ))}
          </div>
        )}
      </div>
      <div className="decisions-container">
        <div className="infos-status-container">
          <button
            type="button"
            onClick={() =>
              setShowDecisionsDecisionTaken(!showDecisionsDecisionTaken)
            }
          >
            <i className="fa-sharp fa-solid fa-caret-down" />
          </button>
          <h1>Statut decision prise</h1>
        </div>
        <hr />
        {showDecisionsDecisionTaken && (
          <div className="cards-decision-container">
            {allDecisions
              .filter((decision) => decision.title_status === "decision taken")
              .map((decision) => (
                <CardDecision key={decision.id} decision={decision} />
              ))}
          </div>
        )}
      </div>
      <div className="decisions-container">
        <div className="infos-status-container">
          <button
            type="button"
            onClick={() => setShowDecisionsConflict(!showDecisionsConflict)}
          >
            <i className="fa-sharp fa-solid fa-caret-down" />
          </button>
          <h1>Statut fin de conflit</h1>
        </div>
        <hr />
        {showDecisionsConflict && (
          <div className="cards-decision-container">
            {allDecisions
              .filter(
                (decision) => decision.title_status === "conflict deadline"
              )
              .map((decision) => (
                <CardDecision key={decision.id} decision={decision} />
              ))}
          </div>
        )}
      </div>
      <div className="decisions-container">
        <div className="infos-status-container">
          <button
            type="button"
            onClick={() =>
              setShowDecisionsFinalDecision(!showDecisionsFinalDecision)
            }
          >
            <i className="fa-sharp fa-solid fa-caret-down" />
          </button>
          <h1>Statut decision finale</h1>
        </div>
        <hr />
        {showDecisionsFinalDecision && (
          <div className="cards-decision-container">
            {allDecisions
              .filter((decision) => decision.title_status === "final decision")
              .map((decision) => (
                <CardDecision key={decision.id} decision={decision} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
