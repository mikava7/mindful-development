import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addPostReaction, removePostReaction } from '../redux/slices/posts'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'

const Reactions = ({ postId }) => {
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(user._id))

  const handleLike = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    try {
      const response = await axios.put(`/likePost/${postId}`, headers)
      setIsLiked((prev) => !prev)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDislike = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    try {
      const response = await axios.delete(`/unlikePost/${postId}`, headers)
      setIsLiked((prev) => !prev)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <button>liked</button>
    </div>
  )
}
export default Reactions
