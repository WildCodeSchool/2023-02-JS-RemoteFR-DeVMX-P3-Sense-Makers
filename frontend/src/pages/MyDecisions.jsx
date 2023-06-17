import { useEffect, useState, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CardDecision from "../components/CardDecision";

export default function MyDecisions() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [allDecisions, setAllDecision] = useState([]);
  const [allStatus, setAllStatus] = useState([]);

  const allStatesReducer = (state, action) => {
    switch (action.type) {
      case "allStates":
        return {
          ...state,
          [action.key]: !action.value,
        };
      default:
        return state;
    }
  };

  const initialStates = {
    creation: false,
    firstDecision: false,
    conflict: false,
    finalDecision: false,
    unfinishedDecision: false,
    decisionCompleted: false,
  };
  const [allStates, dispatch] = useReducer(allStatesReducer, initialStates);

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
      {allStatus.map((statut, index) => (
        <div className="decisions-container" key={statut.id}>
          <div className="infos-status-container">
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: "allStates",
                  value: allStates[Object.keys(allStates)[index]],
                  key: Object.keys(initialStates)[index],
                })
              }
            >
              <i className="fa-sharp fa-solid fa-caret-down" />
            </button>
            <h2>{statut.title}</h2>
          </div>
          <hr />
          {allStates[[Object.keys(allStates)[index]]] && (
            <div className="cards-decision-container">
              {allDecisions
                .filter((decision) => decision.title_status === statut.title)
                .map((decision) => (
                  <CardDecision key={decision.d_id} decision={decision} />
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
