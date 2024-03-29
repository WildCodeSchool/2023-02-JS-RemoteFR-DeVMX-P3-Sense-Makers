import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Timeline from "./graphicElements/Timeline";
import validated from "../assets/icons/verifier.svg";
import notValidated from "../assets/icons/traverser.svg";

export default function CardDecision({ decision }) {
  const [show, setShow] = useState("none");
  const { t } = useTranslation();

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

  return (
    <Link
      className="card-decision-container"
      to={`/logged/decisions/${decision.d_id}`}
      onMouseEnter={() => {
        setShow("flex");
      }}
      onMouseLeave={() => {
        setShow("none");
      }}
    >
      <div className="Timeline-wrapper-decision" style={{ display: `${show}` }}>
        <div className="Timeline-container-decision">
          <Timeline decision={decision} />
        </div>
      </div>
      {decision.title_status === "Décision définitive" &&
        (decision.is_validated === 1 ? (
          <div className="decision-validate">
            <img src={validated} alt="validate-logo" />
          </div>
        ) : (
          <div className="decision-not-validate">
            <img src={notValidated} alt="validate-logo" />
          </div>
        ))}
      {decision.title_status === "Décision terminée" &&
        (decision.is_validated === 1 ? (
          <div className="decision-validate">
            <img src={validated} alt="validate-logo" />
          </div>
        ) : (
          <div className="decision-not-validate">
            <img src={notValidated} alt="validate-logo" />
          </div>
        ))}

      <div className="status-container">
        <p style={statusColors}>
          {t(`decisions.status.${decision.status_id}`)}
        </p>
        <p>{decision.title}</p>
      </div>
      <h1>{decision.title_decision}</h1>
      <div className="card-creator-container">
        <img
          src={
            decision.photo === "default_avatar.png"
              ? `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                  decision.photo
                }`
              : `${import.meta.env.VITE_BACKEND_URL}/uploads/${decision.photo}`
          }
          alt="img profil creator"
        />
        <p>
          {t("decision.by")}{" "}
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
