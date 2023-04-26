import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PostSkeleton } from "../../components/PostSkeleton";

interface PostProps {
  _id: string;
  title: string;
  createdAt: string | number | Date;
  imageUrl: string;
  author: string;
  viewCount: number;
  isLoading: boolean;
  isEditable: boolean;
  content: string;
  onClickRemove: (id: string) => void;
}

const Post: React.FC<PostProps> = ({
  _id,
  title,
  createdAt,
  imageUrl,
  author,
  viewCount,
  isLoading,
  isEditable,
  content,
  onClickRemove,
}) => {
  // state to keep track of whether the post content should be expanded or not
  const [expanded, setExpanded] = useState<boolean>(false);

  // format the date if it exists, otherwise display "Invalid Date"
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Invalid Date";

  // set default content if it doesn't exist
  if (!content) {
    content = "No content available";
  }

  // determine whether to display full content or truncated version
  const postContent = expanded ? (
    <p className="content">{content}</p>
  ) : (
    <p>{content.slice(0, 100)}...</p>
  );

  // callback function to handle post removal
  const handleRemove = () => {
    onClickRemove(_id);
  };

  // display loading skeleton if post is still being loaded
  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <div className="post-container">
      {/* display edit buttons if post is editable */}
      {isEditable && (
        <div className="edit-buttons">
          <Link to={`/posts/${_id}/edit`}>Edit</Link>
          <button onClick={handleRemove}>delete</button>{" "}
        </div>
      )}
      <div>
        {/* link to post details */}
        <Link to={`/posts/${_id}`}>{title}</Link>
        <img src={imageUrl} alt={title} />
      </div>

      <div>
        <div>
          {/* display truncated or full content */}
          {postContent}
          {/* button to toggle content truncation */}
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? "read less" : "read more"}
          </button>
        </div>

        <div className="post-details">
          <p className="author">{author}</p>
          {/* display formatted date */}
          <p className="time">{formattedDate}</p>
          <p className="viewCount">Views: {viewCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
