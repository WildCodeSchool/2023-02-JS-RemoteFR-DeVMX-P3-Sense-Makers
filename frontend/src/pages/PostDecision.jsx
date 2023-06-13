import { useReducer } from "react";

const initialState = {
  title: "",
  date: "",
  content: "",
  usefullness: "",
  context: "",
  benefit: "",
  disavantages: "",
  concerned_hub: "--",
};

function reducer(state, action) {
  switch (action.type) {
    case "update_input":
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
}

export default function PostDecision() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="post-container">
      <div className="title-container">
        <h1 className="post-decision">Poster une décision </h1>
      </div>

      <div className="decision-information">
        <label htmlFor="title_decision">
          Titre de la décision *
          <input
            type="text"
            id="title_decision"
            className="title-decision"
            placeholder="Déménager hors de Paris..."
            value={state.title}
            onChange={(e) => {
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "title",
              });
            }}
          />
        </label>

        <label htmlFor="deadline_decision">
          Deadline *
          <input
            type="date"
            id="deadline_decision"
            value={state.date}
            onChange={(e) => {
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "date",
              });
            }}
          />
        </label>

        <div className="hub-container">
          <label htmlFor="hub_decision">
            Pôle concerné *
            <select
              id="hub_decision"
              value={state.concerned_hub}
              onChange={(e) => {
                dispatch({
                  type: "update_input",
                  value: e.target.value,
                  key: "concerned_hub",
                });
              }}
            >
              <option value="--">--</option>
              <option value="Hub France">Hub France</option>
            </select>
          </label>
          <div className="hub-select">{state.concerned_hub}</div>
        </div>

        <div className="impacted-people">
          <label htmlFor="concerned_decision">
            Personnes concernées *
            <input type="text" id="concerned_decision" />
          </label>

          <label htmlFor="expert_decision">
            Personnes expertes *
            <input type="text" id="expert_decision" />
          </label>
        </div>
      </div>

      <div className="decision-write">
        <label htmlFor="description_decision">
          Description de la décision *
          <textarea
            type="text"
            id="description_decision"
            value={state.content}
            onChange={(e) => {
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "content",
              });
            }}
          />
        </label>
        <label htmlFor="usefullness_decision">
          Utilité de cette décision pour l'organisation *
          <textarea
            type="text"
            id="usefullness_decision"
            value={state.usefullness}
            onChange={(e) => {
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "usefullness",
              });
            }}
          />
        </label>
        <label htmlFor="context_decision">
          Contexte autour de la décision *
          <textarea
            type="text"
            id="context_decision"
            value={state.context}
            onChange={(e) => {
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "context",
              });
            }}
          />
        </label>
        <label htmlFor="benefit_decision">
          Bénéfices de la décision *
          <textarea
            type="text"
            id="benefit_decision"
            value={state.benefit}
            onChange={(e) => {
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "benefit",
              });
            }}
          />
        </label>
        <label htmlFor="disavantages_decision">
          Inconvenients de la décision *
          <textarea
            type="text"
            id="disavantages_decision"
            value={state.disavantages}
            onChange={(e) => {
              dispatch({
                type: "update_input",
                value: e.target.value,
                key: "disavantages",
              });
            }}
          />
        </label>
      </div>

      <div className="button-container">
        <button
          type="button"
          onClick={() => {
            console.info(state);
          }}
        >
          Poster cette décision
        </button>
      </div>
    </div>
  );
}
