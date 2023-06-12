import { useState } from "react";

export default function PostDecision() {
  const [hub, setHub] = useState("--");
  const handleChangeSelect = (e) => {
    setHub(e.target.value);
  };

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
          />
        </label>

        <label htmlFor="deadline_decision">
          Deadline *
          <input type="date" id="deadline_decision" />
        </label>

        <div className="hub-container">
          <label htmlFor="hub_decision">
            Pôle concerné *
            <select id="hub_decision" onChange={handleChangeSelect}>
              <option value="--">--</option>
              <option value="Hub France">Hub France</option>
            </select>
          </label>
          <div className="hub-select">{hub}</div>
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
          <textarea type="text" id="description_decision" />
        </label>
        <label htmlFor="usefullness_decision">
          Utilité de cette décision pour l'organisation *
          <textarea type="text" id="usefullness_decision" />
        </label>
        <label htmlFor="context_decision">
          Contexte autour de la décision *
          <textarea type="text" id="context_decision" />
        </label>
        <label htmlFor="benefit_decision">
          Bénéfices de la décision *
          <textarea type="text" id="benefit_decision" />
        </label>
        <label htmlFor="disavantages_decision">
          Inconvenients de la décision *
          <textarea type="text" id="disavantages_decision" />
        </label>
      </div>

      <div className="button-container">
        <button type="button">Poster cette décision</button>
      </div>
    </div>
  );
}
