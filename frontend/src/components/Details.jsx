import axios from "axios";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export default function Details({
  decision,
  handleComment,
  comments,
  impactedUsers,
  experts,
  user,
}) {
  const { t } = useTranslation();
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [commentId, setCommentId] = useState();
  const { id } = useParams();

  function strip(html) {
    return (
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
    );
  }

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
      .then(() =>
        toast.success(t("Toast.commentdeleted"), {
          color: "white",
          backgroundColor: "green",
          icon: "✔️",
        })
      )
      .catch((err) => console.error(err));
    setTimeout(() => {
      handleComment();
    }, 500);
  };

  return (
    <>
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
          {strip(decision.content)}
        </div>
      </details>

      <details>
        <summary>
          {t("decision.details.impact")}
          <hr />
        </summary>
        <div className="summary-content">{strip(decision.usefulness)}</div>
      </details>

      <details>
        <summary>
          {t("decision.details.benefit")}
          <hr />
        </summary>
        <div className="summary-content">{strip(decision.benefit)}</div>
      </details>

      <details>
        <summary>
          {t("decision.details.risks")}
          <hr />
        </summary>
        <div className="summary-content">{strip(decision.disadvantages)}</div>
      </details>

      {decision.first_decision_content && (
        <details>
          <summary>
            {t("decision.details.firstTake")}
            <hr />
          </summary>
          <div className="summary-content">
            {strip(decision.first_decision_content)}
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
                        ? `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                            comment.photo
                          }`
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
                    <p className="bold-text">{t("decision.comment.expert")}</p>
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
    </>
  );
}

Details.propTypes = {
  decision: PropTypes.shape.isRequired,
  handleComment: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf.isRequired,
  impactedUsers: PropTypes.arrayOf.isRequired,
  experts: PropTypes.arrayOf.isRequired,
  user: PropTypes.arrayOf.isRequired,
};
