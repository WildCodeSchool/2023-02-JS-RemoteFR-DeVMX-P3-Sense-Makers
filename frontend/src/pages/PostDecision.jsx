export default function PostDecision() {
  return (
    <div className="post-container">
      <h1 className="post-decision">Poster une décision </h1>

      <div className="decision-information">
        <label htmlFor="Title_decision">
          Titre de la décision *
          <input type="text" id="Title_decision" className="title-decision" />
        </label>

        <label htmlFor="Deadline_decision">
          Deadline *
          <input type="date" id="Deadline_decision" />
        </label>

        <label htmlFor="Hub_decision">
          Pôle concerné*
          <input type="text" id="Hub_decision" />
        </label>

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
    </div>
  );
}
