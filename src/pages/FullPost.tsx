import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Post from '../components/post/Post'
import {
  deletePost,
  updateViewCount,
  fetchPosts,
} from '../redux/slices/posts/postThunk'
import {
  selectPosts,
  selectPostStatus,
  selectPostError,
} from '../redux/slices/posts/posts'
import { selectUserId } from '../redux/slices/auth/authSlice'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { VisitedPosts } from '../redux/slices/auth'
import { fetchComments } from '../redux/slices/commentSlice'

import ReactMarkdown from 'react-markdown'
import Comments from './Comments.js'
import { Button } from '../styled-component/styledComponents'

const FullPost: React.FC = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectPosts) || []
  const postStatus = useAppSelector(selectPostStatus)
  const postError = useAppSelector(selectPostError)
  const userId = useAppSelector(selectUserId)
  // const [showComments, setShowComments] = useState(false)
  // console.log('status', status)

  // console.log('id', id)
  // console.log('userData in fulPost', userId)

  // Extract the post with the matching ID from the `posts` array
  const { id } = useParams()

  const postId = '6535724a7f8fa9aa248a034d' // Replace with the correct post ID

  // Iterate through the outer array to find the post
  let post = null
  for (const postArray of posts) {
    post = postArray?.find((selectedPost) => selectedPost._id === postId)
    if (post) {
      break // Exit the loop when the post is found
    }
  }

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  // Dispatch the `updateViewCount` action to increment the view count for this post when the component mounts
  useEffect(() => {
    if (post) {
      dispatch(updateViewCount(post._id))
    }
  }, [dispatch, post])

  // Define a callback function to handle the "remove post" button click event
  const onClickRemove = () => {
    dispatch(deletePost(post._id))
  }

  return (
    <div>
      {postStatus === 'pending' && !post && <div>Loading...</div>}
      {!post && postStatus !== 'pending' && <p>Post not found</p>}

      {/* If the `post` variable is not null, display the post and its comments */}
      {post && (
        <>
          {/* Pass the post data to the `Post` component */}
          <Post
            key={post._id}
            _id={post._id}
            title={post.title}
            content={post.content}
            truncate={false}
            createdAt={post.createdAt}
            imageUrl={`http://localhost:5000${post.imageUrl}`}
            author={post?.author?.fullName}
            viewCount={post.viewCount}
            // Pass the `onClickRemove` callback function to the `Post` component
            onClickRemove={onClickRemove}
          />
          {/* 
          {showComments ? (
            <Comments
              postId={post._id}
              comments={comments.filter(
                (comment) => comment.comment.post === post._id
              )}
            />
          ) : (
            <button onClick={() => setShowComments(!showComments)}>
              comments
            </button>
          )} */}
        </>
      )}
    </div>
  )
}

export default FullPost
