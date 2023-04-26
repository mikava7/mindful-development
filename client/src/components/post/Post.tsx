import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PostSkeleton } from "../../components/PostSkeleton";
import { FlexContainer,Title,Text, Button, ListItem } from "../../styled-component/styledComponents";
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
    <Text className="content">{content}</Text>
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
      <Title>  <Link to={`/posts/${_id}`}>{title}</Link></Title>
        <img src={imageUrl} alt={title} />
      </div>

      <div>
        <div>
          {/* display truncated or full content */}
        <Text> {postContent} </Text> 
          {/* button to toggle content truncation */}
          {/* <button onClick={() => setExpanded(!expanded)}>
            {expanded ? "read less" : "read more"}
          </button> */}
        </div>

        <FlexContainer justifyContent={'space-around'} margin={'1rem'} border={'none'}>
               <p >{author}</p>
                <p >{formattedDate}</p>
               <p >Views: {viewCount}</p>
       
        </FlexContainer>

        
         
            <StyledLink to={`/posts/${_id}`}>Read more </StyledLink>
        

      </div>
    </div>
  );
};

export default Post;

const StyledLink = styled(Link)`
      height:${(props)=> props.height || '30px'};
    width:${(props)=> props.width || '30px'};
    font-size:${(props)=> props.fontSize || '1.2rem'};
    padding:${(props)=>props.padding || '0.5rem'};
    width:100%;
    border: none;
    align-self:center;
`