import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function CardDecision({ decision }) {
  return (
    <Link className="card-decision-container" to={`/decisions/${decision.id}`}>
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
    </Link>
  );
}
CardDecision.propTypes = {
  decision: PropTypes.shape().isRequired,
};
