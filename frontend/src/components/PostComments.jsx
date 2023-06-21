import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PostComments() {
  const [comment, setComment] = useState("");
  const id = useParams();

  const postComment = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/decisions/${id}/comments`, {
        comment,
        decision_id: id,
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
