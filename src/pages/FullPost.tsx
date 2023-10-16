import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Post from '../components/post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, updateViewCount, fetchPosts } from '../redux/slices/posts'
import { VisitedPosts } from '../redux/slices/auth'
import { fetchComments } from '../redux/slices/commentSlice'

import ReactMarkdown from 'react-markdown'
import Comments from './Comments.js'
import { Button } from '../styled-component/styledComponents'

const FullPost: React.FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { posts } = useSelector((state) => state.posts) || {}
  const userId = useSelector((state) => state.auth.data) || {}
  const comments = useSelector((state) => state.comments.comments) || {}
  const status = useSelector((state) => state.posts.posts.status)
  const [showComments, setShowComments] = useState(false)
  // console.log('status', status)

  // console.log('id', id)
  // console.log('userData in fulPost', userId)

  // Extract the post with the matching ID from the `posts` array
  const post = Array.isArray(posts.items)
    ? posts.items.find((post) => post._id === id)
    : null

  useEffect(() => {
    dispatch(fetchComments(id))
  }, [dispatch, id])

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  useEffect(() => {
    if (userId) {
      dispatch(VisitedPosts(id))
    }
  }, [dispatch, id, userId])

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
      {status === 'loading' && !post && <div>Loading...</div>}
      {!post && status !== 'loading' && <p>Post not found</p>}

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
            author={post.author.fullName}
            viewCount={post.viewCount}
            tags={post.tags}
            // Pass the `onClickRemove` callback function to the `Post` component
            onClickRemove={onClickRemove}
          />

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
          )}
        </>
      )}
    </div>
  )
}

export default FullPost
