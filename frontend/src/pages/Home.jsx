import { useEffect, useReducer } from "react";
import axios from "axios";
import CardDecision from "../components/CardDecision";

export default function Home() {
  const allStatesReducer = (state, action) => {
    switch (action.type) {
      case "allStates":
        return {
          ...state,
          [action.key]: !action.value,
        };
      case "allStatus":
        return {
          ...state,
          allStatus: action.value,
        };
      case "allDecisions":
        return {
          ...state,
          allDecisions: action.value,
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
    allStatus: [],
    allDecisions: [],
  };
  const [allStates, dispatch] = useReducer(allStatesReducer, initialStates);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions`)
      .then((res) => dispatch({ type: "allDecisions", value: res.data }))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/status`)
      .then((res) => dispatch({ type: "allStatus", value: res.data }))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="all-decisions-container">
      <h1>Toutes les décisions</h1>
      {allStates.allStatus.map((statut, index) => (
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
              {allStates.allDecisions
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
