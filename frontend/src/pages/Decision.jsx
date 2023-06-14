import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Decision() {
  const [decision, setDecison] = useState([]);
  const [comments, setComments] = useState([]);
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

  console.info({ decision });
  return (
    <div className="decision">
      <div>
        <div>status</div>
        <div>hub france</div>
      </div>
      <h1>{decision.title}</h1>
      <img src="on verre plus tard" alt="on verra plus tard" />
      <p>
        par {decision.firstname} {decision.lastname}
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
        <div key={comment.id}>{comment.comment}</div>
      ))}
      <h2>Dates à retenir</h2>
      <div> timeline</div>
      <h2>Personnes impactées</h2>
      <div>photos</div>
      <h2>Personnes expertes</h2>
      <div>photos</div>
    </div>
  );
}
