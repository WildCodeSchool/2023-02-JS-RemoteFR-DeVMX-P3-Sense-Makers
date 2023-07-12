import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import DOMPurify from "dompurify";
import PostComments from "../components/PostComments";
import Timeline from "../components/graphicElements/Timeline";
import FirstDecisionEditor from "../components/FirstDecisionEditor";
import userContext from "../contexts/userContext";

export default function Decision() {
  const [decision, setDecison] = useState([]);
  const [comments, setComments] = useState([]);
  const [impactedUsers, setimpactedUsers] = useState([]);
  const [experts, setExperts] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const [displayValidation, setDisplayValidation] = useState(true);
  const [firstDecision, setFirstDecision] = useState("");
  const { user } = useContext(userContext);
  const { id } = useParams();
  const ref = useRef(null);

  const commentAdd = () => {
    toast.success("commentaire ajouté", {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
  };
  const firstDecisionAdd = () => {
    toast.success("première décision ajoutée", {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
  };
  const finalDecisionAdd = () => {
    toast.success("validation prise en compte", {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
  };

  function strip(html) {
    return (
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
    );
  }
  const getDecision = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`, {
        withCredentials: true,
      })
      .then((res) => setDecison(res.data))
      .catch((err) => console.error(err));
  };

  const postFirstDecision = () => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`,
        {
          firstDecision,
          id,
        },
        { withCredentials: true }
      )
      .catch((err) => console.error(err));
    firstDecisionAdd();
    setTimeout(() => {
      getDecision();
    }, 500);
  };

  const handleAddComment = () => {
    setAddComment((state) => !state);
  };

  const handleExpertChoice = (e) => {
    axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/decisions/${id}/validation`,
      {
        expertChoice: e.target.value,
      },
      { withCredentials: true }
    );
    finalDecisionAdd();
    setDisplayValidation(false);
  };

  useEffect(() => {
    if (addComment && ref.current) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [addComment, ref]);

  const handleComment = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions/${id}/comments`, {
        withCredentials: true,
      })
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getDecision();
  }, []);

  useEffect(() => {
    handleComment();
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions/${id}/impacted`, {
        withCredentials: true,
      })
      .then((res) => setimpactedUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/decisions/${id}/expert`, {
        withCredentials: true,
      })
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
            <div className="context">
              <p className="bold-text">context:</p> {strip(decision.context)}
            </div>
            <p>{strip(decision.content)}</p>
          </div>
        </details>

        <details>
          <summary>
            Impact sur l'organisation
            <hr />
          </summary>
          <div className="summary-content">
            <p>{strip(decision.usefulness)}</p>
          </div>
        </details>

        <details>
          <summary>
            Bénéfices
            <hr />
          </summary>
          <div className="summary-content">
            <p>{strip(decision.benefit)}</p>
          </div>
        </details>

        <details>
          <summary>
            Risques potentiels
            <hr />
          </summary>

          <div className="summary-content">
            <p>{strip(decision.disadvantages)}</p>
          </div>
        </details>

        {decision.first_decision_content && (
          <details>
            <summary>
              Première prise de décision
              <hr />
            </summary>
            <div className="summary-content">
              <p>{strip(decision.first_decision_content)}</p>
            </div>
          </details>
        )}

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

        {experts.some((expert) => expert.id === user.id) &&
          decision.status_id === 4 &&
          displayValidation && (
            <div className="expert-choice">
              <button
                className="validate"
                type="button"
                value={1}
                onClick={handleExpertChoice}
              >
                Valider cette décision
              </button>

              <button
                className="reject"
                type="button"
                value={0}
                onClick={handleExpertChoice}
              >
                Rejeter cette décision
              </button>
            </div>
          )}

        {decision.status_id === 2 &&
          user.id === decision.userId &&
          !decision.first_decision_content && (
            <div>
              {" "}
              <FirstDecisionEditor
                setFirstDecision={setFirstDecision}
                firstDecisionAdd={firstDecisionAdd}
              />
              <button
                type="button"
                className="comment-button"
                onClick={postFirstDecision}
              >
                poster ma première prise de décision
              </button>
            </div>
          )}

        {!addComment && (
          <button
            type="button"
            className="comment-button"
            onClick={handleAddComment}
            disabled={decision.status_id !== 1 && decision.status_id !== 3}
          >
            Donner mon avis
          </button>
        )}
        {decision.status_id === 2 && (
          <div className="closed-comment">
            <p> La période de commentaires est à present terminée!</p>
            <p>
              Attendez la première prise de décision de l'auteur pour a nouveau
              pouvoir donner votre avis!
            </p>
          </div>
        )}
        {decision.status_id === 4 && (
          <div className="closed-comment">
            <p> La période de commentaires est à present terminée!</p>
            <p>Merci pour vos retours!</p>
          </div>
        )}
        {addComment && (
          <div ref={ref}>
            <PostComments
              commentAdd={commentAdd}
              setAddComment={setAddComment}
              handleComment={handleComment}
            />
          </div>
        )}
      </div>
      <div className="side-content">
        <div className="side-text">
          <h2>Dates à retenir</h2>
          <Timeline decision={decision} />
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
          disabled={decision.status_id !== 1 && decision.status_id !== 3}
        >
          Donner mon avis
        </button>
      </div>
      <ToastContainer autoClose={1500} transition={Slide} />
    </div>
  );
}
