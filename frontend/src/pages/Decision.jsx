import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import userContext from "../contexts/userContext";
import FirstDecisionEditor from "../components/TextEditors/FirstDecisionEditor";
import Timeline from "../components/graphicElements/Timeline";
import PostComments from "../components/PostComments";
import Details from "../components/Details";

export default function Decision() {
  const [decision, setDecison] = useState({});
  const [comments, setComments] = useState([]);
  const [impactedUsers, setimpactedUsers] = useState([]);
  const [experts, setExperts] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const [displayValidation, setDisplayValidation] = useState(true);
  const [firstDecision, setFirstDecision] = useState("");
  const [openDecisionModal, setOpenDecisionModal] = useState(false);
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const ref = useRef(null);
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
    toast.success(t("Toast.firstDecisionAdd"), {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
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
    toast.success(t("Toast.finalDecisionAdd"), {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });

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
      .then(() =>
        toast.success(t("Toast.decisionRemoved"), {
          color: "white",
          backgroundColor: "green",
          icon: "✔️",
        })
      )
      .catch((err) => console.error(err));
    navigate(-1);
  };

  return (
    <div className="decision">
      <div className="main-content">
        <div className="status-hub">
          <p className="status" style={statusColors}>
            {t(`decisions.status.${decision.status_id}`)}
          </p>
          <p className="hub">{decision.concerned_hub}</p>
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
        <Details
          decision={decision}
          handleComment={handleComment}
          comments={comments}
          impactedUsers={impactedUsers}
          experts={experts}
          user={user}
        />

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
              <FirstDecisionEditor setFirstDecision={setFirstDecision} />
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
            className="comment-button delete-btn"
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
