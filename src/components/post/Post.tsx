import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import { useAppSelector } from '../../redux/hooks'
import { RootState } from '../../redux/store'
import { Link } from 'react-router-dom'
import { PostSkeleton } from '../../components/PostSkeleton'
import axios from '../../axios'
import {
  Title,
  Text,
  Button,
  ListItem,
  Container,
  StyledLink,
} from '../../styled-component/styledComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { addFavorites, removeFavorite } from '../../redux/slices/auth'
import { removeStarredId, addStarredId } from '../../redux/slices/auth'
// import { addPostReaction, removePostReaction } from '../../redux/slices/posts'
import { fetchUserData } from '../../redux/slices/auth'
import { PostDetails } from '../postdetails/PostDetails'
import { ActionButton } from '../actionButton/ActionButton'
import PostBody from '../postBody/PostBody'
import EditButtons from '../editButtons/EditButtons'
interface PostProps {
  _id: string
  title: string
  createdAt: string | number | Date
  imageUrl: string
  author: string
  viewCount: number
  isEditable: boolean | false
  content: string
  truncate: boolean
  onClickRemove: (id: string) => void
}
const Post: React.FC<PostProps> = ({
  _id,
  title,
  createdAt,
  imageUrl,
  author,
  viewCount,
  isEditable,
  content,
  onClickRemove,
  truncate,
}) => {
  const dispatch = useAppDispatch()
  const starredIds =
    useAppSelector((state: RootState) => state.auth.starredIds) || []
  const userData = useAppSelector((state: RootState) => state.auth.data) || {}
  const postId: string = _id
  const userId = userData?._id
  const posts = useAppSelector(((state: RootState) => state.posts) || {})
  const [starred, setStared] = useState(starredIds.includes(postId))
  // const likes = posts?.items.find((post) => post._id === postId)?.reactedBy
  // const [isLiked, setIsLiked] = useState(likes ? likes.includes(userId) : false)

  // const handleHeartAndLikeClick = () => {
  //   setIsLiked((prevHeart: boolean) => !prevHeart)
  //   if (isLiked) {
  //     dispatch(removePostReaction(postId))
  //   } else {
  //     dispatch(addPostReaction(postId))
  //   }
  // }

  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('starredIds', JSON.stringify(starredIds))
  }, [starredIds])

  const handleStarClick = () => {
    setStared((prevStared: boolean) => !prevStared)
    if (starredIds.includes(postId)) {
      dispatch(removeStarredId(postId))
    } else {
      dispatch(addStarredId(postId))
    }
  }

  const handleToggleFavorite = () => {
    if (starred) {
      dispatch(removeFavorite())
    } else {
      dispatch(addFavorites())
    }
  }
  const handleStarAndFavoriteClick = () => {
    handleStarClick()
    handleToggleFavorite()
  }
  const bookmarkColor = starred ? 'gold' : 'gray'
  // const heartColor = isLiked ? 'red' : 'gray'

  if (!content) {
    content = 'No content available'
  }

  const handleRemove = () => {
    onClickRemove(_id)
  }

  return (
    <BoxContainer>
      <PostBody
        isEditable={isEditable}
        handleRemove={handleRemove}
        postId={postId}
        title={title}
        imageUrl={imageUrl}
        content={content}
        truncate={truncate}
        author={author}
        userId={userId}
      />

      <PostDetails
        postId={postId}
        likes={bookmarkColor}
        viewCount={viewCount}
        createdAt={createdAt}
      />

      <ActionButton
        handleStarAndFavoriteClick={handleStarAndFavoriteClick}
        bookmarkColor={bookmarkColor}
        handleHeartAndLikeClick={handleStarAndFavoriteClick}
        heartColor={bookmarkColor}
        postId={postId}
      />
    </BoxContainer>
  )
}

export default Post

const BoxContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.lightBlack};
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  max-width: 467px;
`
