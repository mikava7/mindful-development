import React, { useState } from 'react'
import { deleteComment, fetchComments } from '../redux/slices/commentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faTrash,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons'
import { spawn } from 'child_process'
interface Props {
  comment: {
    _id: string
    content: string
    author: {
      fullName: string
    }
    comment?: {
      post: string
    }
  }
  postId: string // Add a prop to pass in the post ID
}

function Comment({ postId, comment, isEditable }) {
  const dispatch = useDispatch()
  const comments = useSelector((state) => state.comments.comments)
  const navigate = useNavigate()
  const { _id, content, author, post } = comment
  // Add a state variable to track whether the ellipsis icon has been clicked
  const [showOptions, setShowOptions] = useState(false)

  const onClickCommentRemove = () => {
    dispatch(deleteComment({ postId, _id }))

    const updatedComments = comments.filter((comment) => comment._id === _id)
    console.log(author)
    dispatch({ type: 'comments/commentDeleted', payload: updatedComments })
    navigate(`/posts/${postId}`)
  }
  console.log('author', author)
  if (post === postId) {
    return (
      <CommentContainer key={_id}>
        <img
          src={`http://localhost:5000${author.imageUrl}`}
          alt={author.fullName}
        />

        <div>
          <p>
            {' '}
            <b> {author.fullName} </b>
          </p>

          <p>{content}</p>
        </div>
        <span>
          {isEditable && (
            <FontAwesomeIcon icon={faTrash} onClick={onClickCommentRemove} />
          )}
        </span>
      </CommentContainer>
    )
  } else {
    return null
  }
}

export default Comment
const CommentContainer = styled.div`
  margin-top: 1rem;
  display: flex;

  div {
    display: flex;
    padding: 0.2rem 1rem;
    border: 1px solid grey;
    border-radius: 12px;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.inputText};
    color: ${({ theme }) => theme.colors.commentColor};

    p {
      align-self: center;
    }
  }
  p {
    align-self: center;
    padding: 0.2rem 1rem;
  }
  img {
    width: 2.7rem;
    height: 2.7rem;
    border-radius: 50%;
    align-self: center;
    margin-right: 1rem;
  }
`
