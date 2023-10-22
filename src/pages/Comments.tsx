import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addComment,
  fetchComments,
  deleteComment,
} from '../redux/slices/commentSlice'
import { useAppDispatch } from '../redux/store.js'
import { useAppSelector } from '../redux/hooks.js'
import { selectUserData } from '../redux/slices/auth/authSlice.js'

import Comment from '../components/Comment'
import CommentForm from './CommentForm'
interface Props {
  postId: string
}

const Comments = ({ postId }: Props) => {
  const [commentText, setCommentText] = useState('')
  const [expanded, setExpanded] = useState({})
  const [showComments, setShowComments] = useState(false)
  // Get dispatch function and user data from Redux store
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectUserData)

  // console.log('Comments', { userId, postId, commentText })
  // Get comments from Redux store
  const { comments, status } = useSelector((state) => state.comments)

  const isCommentLoading = comments.status === 'loading'

  // Fetch comments on mount and whenever postId changes
  useEffect(() => {
    dispatch(fetchComments(postId))
  }, [postId])

  // Handle comment submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addComment({ content: commentText, author: userId, postId }))
    setCommentText('')
  }

  if (!comments) {
    return <div>Loading comments...</div>
  }

  return (
    <div>
      <CommentForm
        postId={postId}
        handleSubmit={handleSubmit}
        commentText={commentText}
        setCommentText={setCommentText}
      />

      {isCommentLoading ? (
        <div>Loading comments...</div>
      ) : comments.length > 0 ? (
        comments
          .filter((comment) => comment.comment?.post == postId)
          ?.map((comment) => {
            return (
              <Comment
                key={comment.comment._id}
                isEditable={userId === comment.comment.author?._id}
                postId={postId}
                {...comment}
              />
            )
          })
      ) : (
        <div>No comments yet.</div>
      )}
    </div>
  )
}

export default Comments
