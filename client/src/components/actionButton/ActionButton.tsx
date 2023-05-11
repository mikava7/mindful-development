import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark,
  faHeart,
  faComment,
  faShare,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { StyledLink } from '../../styled-component/styledComponents'
import styled from 'styled-components'
import { useState } from 'react'
import Comments from '../../pages/Comments'
export const ActionButton = ({
  handleHeartAndLikeClick,
  handleStarAndFavoriteClick,
  bookmarkColor,
  heartColor,
  postId,
}) => {
  const [showComments, setShowComments] = useState(false)

  return (
    <ButtonContainer>
      <div onClick={handleStarAndFavoriteClick}>
        <FontAwesomeIcon icon={faBookmark} style={{ color: bookmarkColor }} />
        <span>Bookmark</span>
      </div>
      <div onClick={handleHeartAndLikeClick}>
        <FontAwesomeIcon icon={faHeart} style={{ color: heartColor }} />
        <span>Love</span>
      </div>
      <div onClick={() => setShowComments(!showComments)}>
        <FontAwesomeIcon icon={faComment} style={{ color: 'grey' }} />
        <span>Comments</span>
      </div>
      <div>
        <FontAwesomeIcon icon={faShare} style={{ color: 'grey' }} />
        <span>share</span>
      </div>
      {showComments && <Comments postId={postId} />}
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
  width: 330px;
  span {
    margin: 0 auto;
    margin-left: 0.1rem;
  }
`
