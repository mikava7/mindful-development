import { SetStateAction, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import Post from '../components/post/Post'
import { UserType, Post as PostType } from '../types/types'
import { Navigate } from 'react-router-dom'
import Tags from '../pages/Tags'
import { fetchPosts, deletePost } from '../redux/slices/posts/postThunk'
import {
  fetchTags,
  selectTags,
  selectTagsErrorState,
  selectTagsLoading,
} from '../redux/slices/tags/tagsSlice'
import {
  selectPosts,
  selectPostStatus,
  selectPostError,
} from '../redux/slices/posts/posts'
import { selectUserId } from '../redux/slices/auth/authSlice'
import LoadingSpinner from '../components/notifications/loading/LoadingSpinner'
import ErrorMessage from '../components/notifications/error/ErrorMessage'
import SuccessMessage from '../components/notifications/SuccessMessage/SuccessMessage'
type Tag = null | string

const Home = () => {
  const dispatch = useAppDispatch()

  const [reset, setReset] = useState(false)
  const posts = useAppSelector(selectPosts) || []
  const postStatus = useAppSelector(selectPostStatus)
  const postError = useAppSelector(selectPostError)
  const userId = useAppSelector(selectUserId)

  const tags = useAppSelector(selectTags)
  const isTagsLoading = useAppSelector(selectTagsLoading)
  const tagsError = useAppSelector(selectTagsErrorState)

  const [selectedTag, setSelectedTag] = useState(null)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  useEffect(() => {
    dispatch(fetchTags())
  }, [])

  const onClickRemove = (postId: string, userId: string) => {
    dispatch(deletePost({ postId, userId }))

    return <Navigate to="/" />
  }
  const handleTagClick = (tag: Tag) => {
    setSelectedTag(tag as SetStateAction<null>)
  }

  const filteredPosts = reset
    ? posts
    : selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts
  const postsToRender = reset
    ? posts
    : selectedTag
    ? filteredPosts.filter((post) => post.tags.includes(selectedTag))
    : filteredPosts

  if (postStatus === 'pending') {
    return <LoadingSpinner />
  } else if (postStatus === 'idle' && postError) {
    return <SuccessMessage message={postError} />
  } else if (postStatus === 'rejected' && postError !== null) {
    return <ErrorMessage message={postError} />
  }

  return (
    <HomeContainer>
      <Tags
        items={tags}
        onTagClick={handleTagClick}
        setSelectedTag={setSelectedTag}
        setReset={setReset}
      />
      {postError && <SuccessMessage message={postError} />}
      <Card>
        {postsToRender &&
          postsToRender?.map((postArray) => {
            return (
              <div key={postArray._id}>
                {postArray?.map((post) => {
                  return (
                    <Post
                      key={post._id}
                      _id={post._id}
                      title={post.title}
                      truncate={true}
                      content={post.content}
                      createdAt={post.createdAt}
                      imageUrl={`http://localhost:5000${post.imageUrl}`}
                      author={post.author?.fullName}
                      viewCount={post.viewCount}
                      isEditable={userId === post.author?._id}
                      onClickRemove={() => onClickRemove(post._id, userId)}
                    />
                  )
                })}
              </div>
            )
          })}
      </Card>
    </HomeContainer>
  )
}
export default Home
const HomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Card = styled.section``
