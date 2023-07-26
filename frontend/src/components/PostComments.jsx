import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import userContext from "../contexts/userContext";

export default function PostComments({ setAddComment, handleComment }) {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const { user } = useContext(userContext);
  const { t } = useTranslation();

  function postComment() {
    setAddComment(false);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/decisions/${id}/comments`,
        {
          comment,
          userId: user.id,
        },
        {
          withCredentials: true,
        }
      )
      .catch((err) => console.error(err));
  }

  const handleClick = () => {
    postComment();
    toast.success(t("Toast.commentAdd"), {
      color: "white",
      backgroundColor: "green",
      icon: "✔️",
    });
    setTimeout(handleComment, 500);
  };

  return (
    <div className="post-comment">
      <label htmlFor="comment-content">{t("postComment.label")}</label>
      <textarea
        name="comment-content"
        id="comment-content"
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="button" onClick={handleClick}>
        {t("postComment.textButton")}
      </button>
    </div>
  );
}

PostComments.propTypes = {
  setAddComment: PropTypes.func.isRequired,
  handleComment: PropTypes.func.isRequired,
};
