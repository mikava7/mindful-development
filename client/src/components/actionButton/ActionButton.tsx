import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark,
  faHeart,
  faComment,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ActionButton = ({
  handleHeartAndLikeClick,
  handleStarAndFavoriteClick,
  bookmarkColor,
  heartColor,
  _id,
}) => {
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
      <FontAwesomeIcon icon={faComment} />
      <Link to={`/posts/${_id}`}>Read more </Link>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
  width: 300px; /* set a width to limit the container's size */
`
