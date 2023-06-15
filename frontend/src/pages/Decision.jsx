import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Decision() {
  const [decision, setDecison] = useState([]);
  const [comments, setComments] = useState([]);
  const [impactedUsers, setimpactedUsers] = useState([]);
  const [experts, setExperts] = useState([]);
  const { id } = useParams();

  const showCategoriesReducer = (state, action) => {
    switch (action.type) {
      case "details":
        return {
          ...state,
          details: !state.details,
        };
      case "impact":
        return {
          ...state,
          impact: !state.impact,
        };
      case "benefits":
        return {
          ...state,
          benefits: !state.benefits,
        };
      case "disadvantages":
        return {
          ...state,
          disadvantages: !state.disadvantages,
        };
      case "comments":
        return {
          ...state,
          comments: !state.comments,
        };

      default:
        return state;
    }
  };

  const initialStates = {
    details: false,
    impact: false,
    benefits: false,
    disadvantages: false,
    comments: false,
  };

  const [showCategories, dispatch] = useReducer(
    showCategoriesReducer,
    initialStates
  );

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`)
      .then((res) => setDecison(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions/${id}/comments`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions/${id}/impacted`)
      .then((res) => setimpactedUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions/${id}/expert`)
      .then((res) => setExperts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="decision">
      <div className="status-hub">
        <div className="status">{decision.title_status}</div>
        <div className="hub">{decision.concerned_hub}</div>
      </div>
      <h1>{decision.title_decision}</h1>
      <div className="author">
        <img
          src={decision.photo}
          alt={`${decision.firstname} ${decision.lastname}`}
        />
        <p>
          par{" "}
          <span className="bold-text">
            {decision.firstname} {decision.lastname}
          </span>
        </p>
      </div>
      <div className="sections">
        <button type="button" onClick={() => dispatch({ type: "details" })}>
          <i className="fa-sharp fa-solid fa-caret-down" />
        </button>
        <h2>Les details de la décison</h2>
      </div>
      <hr />
      {showCategories.details && (
        <div>
          {decision.context}
          {decision.content}{" "}
        </div>
      )}
      <div className="sections">
        <button type="button" onClick={() => dispatch({ type: "impact" })}>
          <i className="fa-sharp fa-solid fa-caret-down" />
        </button>
        <h2>Impact sur l'organisation</h2>
      </div>
      <hr />
      {showCategories.impact && <div>{decision.usefulness}</div>}
      <div className="sections">
        <button type="button" onClick={() => dispatch({ type: "benefits" })}>
          <i className="fa-sharp fa-solid fa-caret-down" />
        </button>
        <h2>Bénéfices</h2>
      </div>
      <hr />
      {showCategories.benefits && <div>{decision.benefit}</div>}
      <div className="sections">
        <button
          type="button"
          onClick={() => dispatch({ type: "disadvantages" })}
        >
          <i className="fa-sharp fa-solid fa-caret-down" />
        </button>
        <h2>Risques potentiels</h2>
      </div>
      <hr />
      {showCategories.disadvantages && <div>{decision.disavantages}</div>}
      <div className="sections">
        <button type="button" onClick={() => dispatch({ type: "comments" })}>
          <i className="fa-sharp fa-solid fa-caret-down" />
        </button>
        <h2>Avis</h2>
      </div>
      <hr />
      {showCategories.comments && (
        <div className="comments">
          {comments.map((comment) => (
            <div key={comment.id}>
              <div>
                {" "}
                <img
                  src={comment.photo}
                  alt={`${comment.firstname} ${comment.lastname}`}
                />{" "}
                <div className="bold-text">
                  {comment.firstname} {comment.lastname}{" "}
                  {experts.some((expert) => expert.id === comment.user_id) ? (
                    <p>expert</p>
                  ) : (
                    impactedUsers.some(
                      (impactedUser) => impactedUser.id === comment.user_id
                    ) && <p>impacté par la décision</p>
                  )}{" "}
                </div>
              </div>
              {comment.comment}
            </div>
          ))}
        </div>
      )}
      <button type="button" className="comment-button">
        Donner mon avis
      </button>
      <h2>Dates à retenir</h2>
      <div> timeline</div>
      <h2>Personnes impactées</h2>
      {impactedUsers.map((impactedUser) => (
        <div key={impactedUser.id}>
          <img
            src={impactedUser.photo}
            alt={`${impactedUser.firstname} ${impactedUser.lastname}`}
          />{" "}
          {impactedUser.firstname} {impactedUser.lastname}{" "}
        </div>
      ))}
      <h2>Personnes expertes</h2>
      {experts.map((expert) => (
        <div key={expert.id}>
          <img src={expert.photo} alt={`${expert.photo} ${expert.firstname}`} />{" "}
          {expert.photo} {expert.firstname} {expert.lastname}{" "}
        </div>
      ))}
      <button type="button" className="comment-button">
        Donner mon avis
      </button>
    </div>
  );
}
