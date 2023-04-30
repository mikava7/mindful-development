import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostSkeleton } from '../../components/PostSkeleton'
import {
  FlexContainer,
  Title,
  Text,
  Button,
  ListItem,
  Container,
  StyledLink,
} from '../../styled-component/styledComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark,
  faStar,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { addFavorite, removeFavorite } from '../../redux/slices/favoriteSlice'
import { removeStarredId, addStarredId } from '../../redux/slices/favoriteSlice'
interface PostProps {
  _id: string
  title: string
  createdAt: string | number | Date
  imageUrl: string
  author: string
  viewCount: number
  isLoading: boolean
  isEditable: boolean
  content: string
  onClickRemove: (id: string) => void
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
  const postId = _id
  const dispatch = useDispatch()
  const starredIds = useSelector((state) => state.favorites.starredIds) || []
  const [starred, setStared] = useState(starredIds.includes(postId))

  useEffect(() => {
    localStorage.setItem('starredIds', JSON.stringify(starredIds))
  }, [starredIds])

  const handleStarClick = () => {
    setStared((prevStared) => !prevStared)
    if (starredIds.includes(postId)) {
      dispatch(removeStarredId(postId))
    } else {
      dispatch(addStarredId(postId))
    }
  }

  const handleToggleFavorite = () => {
    if (starred) {
      dispatch(removeFavorite(postId))
    } else {
      dispatch(addFavorite(postId))
    }
  }
  const handleStarAndFavoriteClick = () => {
    handleStarClick()
    handleToggleFavorite()
  }
  const starColor = starred ? 'gold' : 'gray'

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Invalid Date'
  if (!content) {
    content = 'No content available'
  }

  const handleRemove = () => {
    onClickRemove(_id)
  }

  // display loading skeleton if post is still being loaded
  if (isLoading) {
    return <PostSkeleton />
  }

  return (
    <div>
      {/* display edit buttons if post is editable */}
      {isEditable && (
        <Container justifyContent="flex-end">
          <StyledLink to={`/posts/${_id}/edit`}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </StyledLink>
          <ListItem onClick={handleRemove}>
            <FontAwesomeIcon icon={faTrash} />
          </ListItem>
        </Container>
      )}
      <Container flexDirection={'column'}>
        <Title>
          <StyledLink to={`/posts/${_id}`} fontSize={'2rem'}>
            {title}{' '}
          </StyledLink>
        </Title>

        <Container justifyContent={'flex-end'} width={'80%'}>
          <span>Views: {viewCount}</span>
        </Container>

        <img src={imageUrl} alt={title} width={'250px'} />

        <Text> {content} </Text>

        <Container flexDirection={'column'}>
          <Container>
            <Container justifyContent={'flex-start'}>
              <b>{author}</b>
            </Container>

            <Container>
              <p>{formattedDate}</p>

              <span>
                <FontAwesomeIcon
                  onClick={handleStarAndFavoriteClick}
                  icon={faStar}
                  style={{ color: starColor }}
                />
              </span>

              <span>
                <FontAwesomeIcon icon={faBookmark} />
              </span>
            </Container>
          </Container>

          <Container justifyContent={'flex-end'}>
            <Link to={`/posts/${_id}`}>Read more </Link>
          </Container>
        </Container>
      </Container>
    </div>
  )
}

export default Post
