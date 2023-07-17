import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { firstDecisionAdd, finalDecisionAdd } from "../services/toast";
import userContext from "../contexts/userContext";
import FirstDecisionEditor from "../components/FirstDecisionEditor";
import Timeline from "../components/graphicElements/Timeline";
import PostComments from "../components/PostComments";

export default function Decision() {
  const [decision, setDecison] = useState([]);
  const [comments, setComments] = useState([]);
  const [impactedUsers, setimpactedUsers] = useState([]);
  const [experts, setExperts] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const [displayValidation, setDisplayValidation] = useState(true);
  const [firstDecision, setFirstDecision] = useState("");
  const [openDecisionModal, setOpenDecisionModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState();
  const [commentId, setCommentId] = useState();
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const ref = useRef(null);
  const { t } = useTranslation();

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
  }, [id]);

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

  const deleteDecision = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/decisions/${id}`, {
        withCredentials: true,
      })
      .catch((err) => console.error(err));
    navigate(-1);
  };

  const deleteComment = (commId) => {
    axios
      .delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/decisions/${id}/comments/${commId}`,
        {
          withCredentials: true,
        }
      )
      .catch((err) => console.error(err));
    setTimeout(() => {
      handleComment();
    }, 500);
  };
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
            src={
              decision.photo === "default_avatar.png"
                ? `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                    decision.photo
                  }`
                : `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                    decision.photo
                  }`
            }
            alt={`${decision.firstname} ${decision.lastname}`}
          />
          <p>
            {t("decision.by")}{" "}
            <span className="bold-text">
              {decision.firstname} {decision.lastname}
            </span>
          </p>
        </div>

        <details>
          <summary>
            {t("decision.details.decisionDetails")}
            <hr />
          </summary>

          <div className="summary-content">
            <div className="context">
              <p className="bold-text">{t("decision.details.context")}</p>{" "}
              {strip(decision.context)}
            </div>
            <p>{strip(decision.content)}</p>
          </div>
        </details>

        <details>
          <summary>
            {t("decision.details.impact")}
            <hr />
          </summary>
          <div className="summary-content">
            <p>{strip(decision.usefulness)}</p>
          </div>
        </details>

        <details>
          <summary>
            {t("decision.details.benefit")}
            <hr />
          </summary>
          <div className="summary-content">
            <p>{strip(decision.benefit)}</p>
          </div>
        </details>

        <details>
          <summary>
            {t("decision.details.risks")}
            <hr />
          </summary>

          <div className="summary-content">
            <p>{strip(decision.disadvantages)}</p>
          </div>
        </details>

        {decision.first_decision_content && (
          <details>
            <summary>
              {t("decision.details.firstTake")}
              <hr />
            </summary>
            <div className="summary-content">
              <p>{strip(decision.first_decision_content)}</p>
            </div>
          </details>
        )}

        <details>
          <summary>
            {t("decision.details.comments")}
            <hr />
          </summary>

          <div className="comments summary-content">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-info">
                  <div className="info-block">
                    <img
                      src={
                        comment.photo === "default_avatar.png"
                          ? `${
                              import.meta.env.VITE_BACKEND_URL
                            }/assets/images/${comment.photo}`
                          : `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                              comment.photo
                            }`
                      }
                      alt={`${comment.firstname} ${comment.lastname}`}
                    />{" "}
                    <p className="bold-text ">
                      {comment.firstname} {comment.lastname}
                    </p>
                    {experts.some((expert) => expert.id === comment.user_id) ? (
                      <p className="bold-text">
                        {t("decision.comment.expert")}
                      </p>
                    ) : (
                      impactedUsers.some(
                        (impactedUser) => impactedUser.id === comment.user_id
                      ) && (
                        <p className="bold-text ">
                          {t("decision.comment.impacted")}
                        </p>
                      )
                    )}{" "}
                    <p>
                      {t("decision.comment.on")} {comment.date}
                    </p>
                  </div>
                  {(user.role_id === 1 || user.id === comment.user_id) && (
                    <Button
                      className="delete-button"
                      type="button"
                      onClick={() => {
                        setOpenCommentModal(true);
                        setCommentId(comment.id);
                      }}
                    >
                      X
                    </Button>
                  )}
                </div>
                <div className="comment-text">
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <Dialog
            open={openCommentModal}
            onClose={() => setOpenCommentModal(false)}
          >
            <DialogTitle>{t("decision.comment.deleteComm")}</DialogTitle>
            <DialogContent>{t("decision.modal.carefull")}</DialogContent>
            <DialogActions>
              <Button
                type="button"
                onClick={() => {
                  deleteComment(commentId);
                  setOpenCommentModal(false);
                }}
              >
                {t("decision.modal.confirm")}
              </Button>
              <Button type="button" onClick={() => setOpenCommentModal(false)}>
                {t("decision.modal.cancel")}
              </Button>
            </DialogActions>
          </Dialog>
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
                {t("decision.approve")}
              </button>

              <button
                className="reject"
                type="button"
                value={0}
                onClick={handleExpertChoice}
              >
                {t("decision.reject")}
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
                {t("decision.postFirstTake")}
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
            {t("decision.commButton")}
          </button>
        )}
        {decision.status_id === 2 && (
          <div className="closed-comment">
            <p>{t("decision.closedComment")}</p>
            <p>{t("decision.waitComment")}</p>
          </div>
        )}
        {decision.status_id === 4 && (
          <div className="closed-comment">
            <p>{t("decision.closedComment")}</p>
            <p>{t("decision.thanks")}</p>
          </div>
        )}
        {addComment && (
          <div ref={ref}>
            <PostComments
              setAddComment={setAddComment}
              handleComment={handleComment}
            />
          </div>
        )}
      </div>
      <div className="side-content">
        {user.role_id === 1 && (
          <button
            onClick={() => setOpenDecisionModal(true)}
            className="comment-button"
            type="button"
            value={1}
          >
            {t("decision.delete")}
          </button>
        )}

        <Dialog
          open={openDecisionModal}
          onClose={() => setOpenDecisionModal(false)}
        >
          <DialogTitle>{t("decision.deleteDecision")}</DialogTitle>
          <DialogContent>{t("decision.modal.carefull")}</DialogContent>
          <DialogActions>
            <Button
              type="button"
              onClick={() => {
                deleteDecision();
                setOpenDecisionModal(false);
              }}
            >
              {t("decision.modal.confirm")}
            </Button>
            <Button type="button" onClick={() => setOpenDecisionModal(false)}>
              {t("decision.modal.cancel")}
            </Button>
          </DialogActions>
        </Dialog>

        <div className="side-text">
          <h2>{t("decision.dates")}</h2>
          <Timeline decision={decision} />
          <h2>{t("decision.impactedUsers")}</h2>
          <div className="tagged" data-count={impactedUsers.length}>
            {impactedUsers.map((impactedUser) => (
              <img
                key={impactedUser.id}
                src={
                  impactedUser.photo === "default_avatar.png"
                    ? `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                        impactedUser.photo
                      }`
                    : `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        impactedUser.photo
                      }`
                }
                alt={`${impactedUser.firstname} ${impactedUser.lastname}`}
                title={`${impactedUser.firstname} ${impactedUser.lastname}`}
              />
            ))}
          </div>
          <h2>{t("decision.expertsUsers")}</h2>
          <div className="tagged">
            {experts.map((expert) => (
              <img
                key={expert.id}
                src={
                  expert.photo === "default_avatar.png"
                    ? `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                        expert.photo
                      }`
                    : `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        expert.photo
                      }`
                }
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
          {t("decision.commButton")}
        </button>
      </div>
      <ToastContainer autoClose={1500} transition={Slide} />
    </div>
  );
}
