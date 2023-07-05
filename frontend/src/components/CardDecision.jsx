import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Timeline from "./graphicElements/Timeline";

export default function CardDecision({ decision }) {
  let statusColors = {
    border: "1px solid #2088a7",
    background: "rgba(32, 136, 167, 0.25)",
    color: "#2088a7",
  };
  if (decision.title_status === "Première décision prise") {
    statusColors = {
      border: "1px solid #70af90",
      background: "rgba(112, 175, 144, 0.25)",
      color: "#70af90",
    };
  }
  if (decision.title_status === "Conflit sur la décision") {
    statusColors = {
      border: "1px solid #c62e43",
      background: "rgba(227, 97, 100, 0.25)",
      color: "#c62e43",
    };
  }
  if (decision.title_status === "Décision définitive") {
    statusColors = {
      border: "1px solid #2088a7",
      background: "rgba(198, 46, 67, 0.25)",
      color: "#70af90",
    };
  }
  if (decision.title_status === "Décision non aboutie") {
    statusColors = {
      border: "1px solid #d93a3a",
      background: "rgba(217, 58, 58, 0.25)",
      color: "#d93a3a",
    };
  }
  if (decision.title_status === "Décision terminée") {
    statusColors = {
      border: "1px solid #8294b0",
      background: "rgba(130, 148, 176, 0.25)",
      color: "#8294b0",
    };
  }
  const [show, setShow] = useState("none");

  return (
    <>
      <div
        className="Timeline-container-decision"
        style={{ display: `${show}`, transition: "ease-in-out 5s " }}
      >
        <Timeline decision={decision} />
      </div>
      <Link
        className="card-decision-container"
        to={`/decisions/${decision.d_id}`}
        onMouseEnter={() => {
          setShow("flex");
        }}
        onMouseLeave={() => {
          setShow("none");
        }}
      >
        {decision.is_validated === 1 ? (
          <div className="decision-validate">
            <img src="./src/assets/icons/verifier.svg" alt="validate-logo" />
          </div>
        ) : (
          <div className="decision-not-validate">
            <img src="./src/assets/icons/traverser.svg" alt="validate-logo" />
          </div>
        )}

        <div className="status-container">
          <p style={statusColors}>{decision.title_status}</p>
          <p>{decision.title}</p>
        </div>
        <h1>{decision.title_decision}</h1>
        <div className="card-creator-container">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
              decision.photo
            }`}
            alt="img profil creator"
          />
          <p>
            par{" "}
            <span>
              {decision.firstname} {decision.lastname}
            </span>
          </p>
        </div>
      </Link>
    </>
  );
}
CardDecision.propTypes = {
  decision: PropTypes.shape().isRequired,
};
