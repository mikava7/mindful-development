import React, { useState } from "react";
import axios from "../axios";

const CommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/posts/${postId}/comments`, { content });
      setContent("");
      onCommentAdded(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Post comment</button>
    </form>
  );
};

export default CommentForm;
