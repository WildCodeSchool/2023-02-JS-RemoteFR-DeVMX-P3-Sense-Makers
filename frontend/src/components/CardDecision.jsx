import React from "react";
import PropTypes from "prop-types";

export default function CardDecision({ decision }) {
  return (
    <div className="card-decision-container">
      <div className="status-container">
        <p>{decision.title_status}</p>
        <p>{decision.concerned_hub}</p>
      </div>
      <h1>{decision.title_decision}</h1>
      <div className="card-creator-container">
        <img src={decision.photo} alt="img profil creator" />
        <p>
          par{" "}
          <span>
            {decision.firstname} {decision.lastname}
          </span>
        </p>
      </div>
    </div>
  );
}
CardDecision.propTypes = {
  decision: PropTypes.shape().isRequired,
};
