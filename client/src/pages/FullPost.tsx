import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Post from '../components/post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, updateViewCount, fetchPosts } from '../redux/slices/posts'
import { VisitedPosts } from '../redux/slices/auth'
import { fetchComments } from '../redux/slices/commentSlice'

import ReactMarkdown from 'react-markdown'
import Comments from './Comments.js'

const FullPost: React.FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  console.log('id', id)
  const { posts } = useSelector((state) => state.posts) || {}
  const userId = useSelector((state) => state.auth.data) || {}
  const comments = useSelector((state) => state.comments.comments) || {}

  console.log('userData in fulPost', userId)

  // Extract the post with the matching ID from the `posts` array
  const post = Array.isArray(posts.items)
    ? posts.items.find((p) => p._id === id)
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
      {/* If the `posts` array is still loading, display a loading message */}
      {posts.status === 'loading' && <div>Loading...</div>}

      {/* If the `post` variable is null, display a "post not found" message */}
      {!post && <p>Post not found</p>}

      {/* If the `post` variable is not null, display the post and its comments */}
      {post && (
        <>
          {/* Pass the post data to the `Post` component */}
          <Post
            key={post._id}
            _id={post._id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            imageUrl={`http://localhost:5000${post.imageUrl}`}
            author={post.author.fullName}
            viewCount={post.viewCount}
            tags={post.tags}
            // Pass the `onClickRemove` callback function to the `Post` component
            onClickRemove={onClickRemove}
          />

          {/* Pass the post ID and comments to the `Comments` component */}
          <Comments
            postId={post._id}
            comments={comments.filter(
              (comment) => comment.comment.post === post._id
            )}
          />

          {/* Use the `ReactMarkdown` component to render the post content as Markdown */}
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </>
      )}
    </div>
  )
}

export default FullPost
