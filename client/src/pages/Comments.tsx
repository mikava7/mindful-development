import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, fetchComments, deleteComment } from "../redux/slices/commentSlice";


import Comment from "../components/Comment";
interface Props {
  postId: string;
}

const Comments = ({ postId }: Props) => {
  // Define state variables

  const [commentText, setCommentText] = useState("");
  const [expanded, setExpanded] = useState({});
  const [showComments, setShowComments] = useState(false);
  // Get dispatch function and user data from Redux store
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data) || {};
  
  // Get comments from Redux store
  const {comments, status} = useSelector((state) => state.comments);

  const isCommentLoading = comments.status === "loading";

  // Fetch comments on mount and whenever postId changes
  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [ postId]);

  // Handle comment submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addComment({ content: commentText, author: userData._id, postId }));
    setCommentText("");
  };

  if (!comments) {
    return <div>Loading comments...</div>;
  }

  return (
    <div>
      <h2 onClick={() => setShowComments(!showComments)}>Comments</h2>
      {showComments && (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Add a comment:
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          {isCommentLoading ? (
            <div>Loading comments...</div>
          ) : comments.length > 0 ? (
            comments
              .filter((comment) => comment.comment?.post == postId)
              .map((comment) => {
                return (
                <Comment key={comment.comment._id}
                          isEditable={userData?._id === comment.comment.author?._id}
                          postId={postId} 
                         {...comment} 
          
                />
                );
              })
          ) : (
            <div>No comments yet.</div>
          )}
        </div>
      )}
    </div>
  );
  
};

export default Comments;
