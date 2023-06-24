import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function PostComments({ setAddComment }) {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const placholderUserId = Math.floor(Math.random() * 4 + 1);

  const postComment = () => {
    setAddComment(false);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/decisions/${id}/comments`, {
        comment,
        userId: placholderUserId,
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="post-comment">
      <label htmlFor="comment-content">Mon commentaire:</label>
      <textarea
        name="comment-content"
        id="comment-content"
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="button" onClick={postComment}>
        Poster mon commentaire
      </button>
    </div>
  );
}

PostComments.propTypes = {
  setAddComment: PropTypes.func.isRequired,
};
