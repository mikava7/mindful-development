import React from "react";
import { deleteComment, fetchComments } from "../redux/slices/commentSlice";
import { useDispatch } from "react-redux";
interface Props {
  comment: {
    _id: string;
    content: string;
    author: {
      fullName: string;
    };
    comment?: {
      post: string;
    };
  };
  postId: string; // Add a prop to pass in the post ID
}

function Comment({ comment, postId, isEditable }: Props) {
  const {author, post, content , _id} = comment
const dispatch = useDispatch()

  const onClickCommentRemove = () => {

      dispatch(deleteComment({ postId, _id }));
      console.log("deleted")
  };

  if (post === postId) {
    return (
      <div key={comment._id}>
        <p>{content}</p>
        <p>{author.fullName}</p>
        {isEditable && (

<button onClick={onClickCommentRemove}>Delete</button>
        )}

      </div>
    );
  } else {
    return null;
  }
}

export default Comment;
