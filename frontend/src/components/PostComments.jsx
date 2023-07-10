import { useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import userContext from "../contexts/userContext";

export default function PostComments({ setAddComment, handleComment }) {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const { user } = useContext(userContext);

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
    setTimeout(handleComment, 500);
  };

  return (
    <div className="post-comment">
      <label htmlFor="comment-content">Mon commentaire:</label>
      <textarea
        name="comment-content"
        id="comment-content"
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="button" onClick={handleClick}>
        Poster mon commentaire
      </button>
    </div>
  );
}

PostComments.propTypes = {
  setAddComment: PropTypes.func.isRequired,
  handleComment: PropTypes.func.isRequired,
};
