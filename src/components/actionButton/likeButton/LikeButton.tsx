import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
const LikeButton = () => {
  const postId = useParams()
  const posts = useSelector((state) => state.posts.posts.items) || {}
  const postIds = posts.map((post) => post._id)

  console.log('postIds', postIds)
  console.log('postId', postId)

  console.log('posts', posts)

  return (
    <div>
      <div>
        <button>like button</button>
      </div>
    </div>
  )
}

export default LikeButton
