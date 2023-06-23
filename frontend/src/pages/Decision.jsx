import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PostComments from "../components/PostComments";

export default function Decision() {
  const [decision, setDecison] = useState([]);
  const [comments, setComments] = useState([]);
  const [impactedUsers, setimpactedUsers] = useState([]);
  const [experts, setExperts] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const { id } = useParams();

  const today = Date.parse(new Date());
  const initialDate = Date.parse(decision.initial_date);
  const dayDiff = (today - initialDate) / 86400000;

  const handleAddComment = () => {
    setAddComment(true);
  };

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
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
              decision.photo
            }`}
            alt={`${decision.firstname} ${decision.lastname}`}
          />
          <p>
            par{" "}
            <span className="bold-text">
              {decision.firstname} {decision.lastname}
            </span>
          </p>
        </div>

        <details>
          <summary>
            Les details de la décison
            <hr />
          </summary>

          <div className="summary-content">
            <p>
              <span className="bold-text">context:</span> {decision.context}
            </p>
            <p>{decision.content}</p>
          </div>
        </details>

        <details>
          <summary>
            Impact sur l'organisation
            <hr />
          </summary>
          <div className="summary-content">
            <p>{decision.usefulness}</p>
          </div>
        </details>

        <details>
          <summary>
            Bénéfices
            <hr />
          </summary>
          <div className="summary-content">
            <p>{decision.benefit}</p>
          </div>
        </details>

        <details>
          <summary>
            Risques potentiels
            <hr />
          </summary>

          <div className="summary-content">
            <p>{decision.disadvantages}</p>
          </div>
        </details>

        <details>
          <summary>
            Avis
            <hr />
          </summary>

          <div className="comments summary-content">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-info">
                  {" "}
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                      comment.photo
                    }`}
                    alt={`${comment.firstname} ${comment.lastname}`}
                  />{" "}
                  <div className="comment-info">
                    <p className="bold-text ">
                      {comment.firstname} {comment.lastname}
                    </p>
                    {experts.some((expert) => expert.id === comment.user_id) ? (
                      <p className="bold-text">expert</p>
                    ) : (
                      impactedUsers.some(
                        (impactedUser) => impactedUser.id === comment.user_id
                      ) && <p className="bold-text ">impacté par la décision</p>
                    )}{" "}
                    <p>le {comment.date}</p>
                  </div>
                </div>
                <div className="comment-text">
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </details>

        {!addComment && (
          <button
            type="button"
            className="comment-button"
            onClick={handleAddComment}
            disabled={dayDiff > 15}
          >
            Donner mon avis
          </button>
        )}
        {dayDiff > 15 && (
          <div>
            <p>
              {" "}
              La période de commentaire est a present fermée! attendez la
              première
            </p>
            <p>
              {" "}
              prise de décision de l'auteur pour a nouveau pouvoir donner votre
              avis!
            </p>
          </div>
        )}
        {addComment && <PostComments />}
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
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                  impactedUser.photo
                }`}
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
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                  expert.photo
                }`}
                alt={`${expert.firstname} ${expert.lastname}`}
                title={`${expert.firstname} ${expert.lastname}`}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="comment-button"
          onClick={handleAddComment}
          disabled={dayDiff > 15}
        >
          Donner mon avis
        </button>
      </div>
    </div>
  );
}
