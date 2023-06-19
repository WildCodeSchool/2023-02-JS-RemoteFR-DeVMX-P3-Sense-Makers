import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import placeHolderPhoto from "../assets/Alaric.jpg";

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
      <div className="main-content">
        <div className="status-hub">
          <div className="status">{decision.title_status}</div>
          <div className="hub">{decision.concerned_hub}</div>
        </div>
        <h1>{decision.title_decision}</h1>
        <div className="author">
          <img
            src={placeHolderPhoto}
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
          <button
            type="button"
            onClick={() => dispatch({ type: "details" })}
            className={showCategories.details && "section-arrow"}
          >
            <i className="fa-sharp fa-solid fa-caret-down" />
          </button>
          <h2 className={showCategories.details && "opened-section"}>
            Les details de la décison
          </h2>
        </div>
        <hr />

        <div
          className={`sections-content ${showCategories.details && "visible"}`}
        >
          <p>
            <span className="bold-text">Context:</span> {decision.context}
          </p>
          <p>{decision.content}</p>
        </div>

        <div className="sections">
          <button
            type="button"
            onClick={() => dispatch({ type: "impact" })}
            className={showCategories.impact && "section-arrow"}
          >
            <i className="fa-sharp fa-solid fa-caret-down" />
          </button>
          <h2 className={showCategories.impact && "opened-section"}>
            Impact sur l'organisation
          </h2>
        </div>
        <hr />

        <div
          className={`sections-content ${showCategories.impact && "visible"}`}
        >
          {decision.usefulness}
        </div>

        <div className="sections">
          <button
            type="button"
            onClick={() => dispatch({ type: "benefits" })}
            className={showCategories.benefits && "section-arrow"}
          >
            <i className="fa-sharp fa-solid fa-caret-down" />
          </button>
          <h2 className={showCategories.benefits && "opened-section"}>
            Bénéfices
          </h2>
        </div>
        <hr />

        <div
          className={`sections-content ${showCategories.benefits && "visible"}`}
        >
          {decision.benefit}
        </div>

        <div className="sections">
          <button
            type="button"
            onClick={() => dispatch({ type: "disadvantages" })}
            className={showCategories.disadvantages && "section-arrow"}
          >
            <i className="fa-sharp fa-solid fa-caret-down" />
          </button>
          <h2 className={showCategories.disadvantages && "opened-section"}>
            Risques potentiels
          </h2>
        </div>
        <hr />

        <div
          className={`sections-content ${
            showCategories.disadvantages && "visible"
          }`}
        >
          {decision.disavantages}
        </div>

        <div className="sections">
          <button
            type="button"
            onClick={() => dispatch({ type: "comments" })}
            className={showCategories.comments && "section-arrow"}
          >
            <i className="fa-sharp fa-solid fa-caret-down" />
          </button>
          <h2 className={showCategories.comments && "opened-section"}>Avis</h2>
        </div>
        <hr />

        <div
          className={`sections-content ${showCategories.comments && "visible"}`}
        >
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
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
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>

        <button type="button" className="comment-button">
          Donner mon avis
        </button>
      </div>
      <div className="side-content">
        <div className="side-text">
          <h2>Dates à retenir</h2>
          <div> timeline</div>
          <h2>Personnes impactées</h2>
          <div className="tagged" data-count={impactedUsers.length}>
            {impactedUsers.map((impactedUser) => (
              <img
                key={impactedUser.id}
                src={placeHolderPhoto}
                alt={`${impactedUser.firstname} ${impactedUser.lastname}`}
                title={`${impactedUser.firstname} ${impactedUser.lastname}`}
              />
            ))}
          </div>
          <h2>Personnes expertes</h2>
          <div className="tagged">
            {experts.map((expert) => (
              <img
                key={expert.id}
                src={placeHolderPhoto}
                alt={`${expert.firstname} ${expert.lastname}`}
                title={`${expert.firstname} ${expert.lastname}`}
              />
            ))}
          </div>
        </div>
        <button type="button" className="comment-button">
          Donner mon avis
        </button>
      </div>
    </div>
  );
}
