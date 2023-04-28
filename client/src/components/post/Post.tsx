import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PostSkeleton } from "../../components/PostSkeleton";
import { FlexContainer,Title,Text, Button, ListItem, Container,StyledLink } from "../../styled-component/styledComponents";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faStar,faPenToSquare,faTrash} from '@fortawesome/free-solid-svg-icons';

;
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
  const [starred, setStarred] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  // toggle the starred state when the star icon is clicked
  const toggleColor = ()=>{
    setStarred((prevColor)=> !prevColor)
  }
  const toggleBookmark = ()=>{
    setBookmarked((prevColor)=> !prevColor)
  }
  const starColor = starred ? "gold" : "gray";
  const bookmarkColor = bookmarked ? "gold" : "gray";

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
    <div>
      {/* display edit buttons if post is editable */}
      {isEditable && (
        <Container justifyContent="flex-end">
          <StyledLink to={`/posts/${_id}/edit`}><FontAwesomeIcon icon={faPenToSquare} /></StyledLink>
          <ListItem onClick={handleRemove}><FontAwesomeIcon icon={faTrash} /></ListItem>
        </Container>
      )}
      <Container flexDirection={"column"}>

          <Title> 
            <StyledLink to={`/posts/${_id}`} fontSize={'2rem'}>{title} </StyledLink>
          </Title>
              
          <Container justifyContent={"flex-end"} width={"80%"}>

              <span >Views: {viewCount}</span>
          </Container>
      
          <img src={imageUrl} alt={title} width={'250px'}/>
      

       
        <Text> {postContent} </Text> 

        <Container  flexDirection={"column"}>

       
              <Container>

                      <Container justifyContent={"flex-start"}>    
                           <b>{author}</b>
                      </Container >

                      <Container  >
                          <p >{formattedDate}</p>
                          <span onClick={toggleColor}
                              >
                            <FontAwesomeIcon icon={faStar} style={{ color: starColor }}/>
                          </span>
                          <span onClick={toggleBookmark}><FontAwesomeIcon icon={faBookmark} style={{ color: bookmarkColor }}/></span>
                      </Container>
        
              </Container >

              <Container justifyContent={"flex-end"}>
                      <Link to={`/posts/${_id}`}>Read more </Link>
              </Container>
                 
        </Container>

      
      </Container >
    </div>
  );
};

export default Post;


