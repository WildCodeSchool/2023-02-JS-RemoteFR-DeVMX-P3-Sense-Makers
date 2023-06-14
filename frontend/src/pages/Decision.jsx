import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Decision() {
  const [decision, setDecison] = useState([]);
  const [comments, setComments] = useState([]);
  const [impactedUsers, setimpactedUsers] = useState([]);
  const [experts, setExperts] = useState([]);
  const { id } = useParams();

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
      <div>
        <div>{decision.title_status}</div>
        <div>{decision.concerned_hub}</div>
      </div>
      <h1>{decision.title_decision}</h1>
      <img
        src={decision.photo}
        alt={`${decision.firstname} ${decision.lastname}`}
      />
      <p>
        par{" "}
        <span>
          {decision.firstname} {decision.lastname}
        </span>
      </p>
      <h2>Les details de la décison</h2>
      <div>
        {decision.context}
        {decision.content}{" "}
      </div>
      <h2>Impact sur l'organisation</h2>
      {decision.usefulness}
      <h2>Bénéfices</h2>
      {decision.benefit}
      <h2>Risques potentiels</h2>
      {decision.disavantages}
      <h2>Avis</h2>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div>
            {" "}
            <img
              src={comment.photo}
              alt={`${comment.firstname} ${comment.lastname}`}
            />{" "}
            <div>
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
      <button type="button">Donner mon avis</button>
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
    </div>
  );
}
