import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Comments from './Comments'
import Post from '../components/post/Post'
import Tags from '../pages/Tags'
import Products from '../components/Products'
import Navbar from '../components/Navbar'
import { fetchPosts, fetchTags, deletePost } from '../redux/slices/posts'
import { fetchComments } from '../redux/slices/commentSlice'
import { fetchUserData } from '../redux/slices/auth'
import {
  FlexContainer,
  CardContainer,
} from '../styled-component/styledComponents'

const Home = () => {
  const dispatch = useDispatch()

  const [reset, setReset] = useState(false)
  const { posts, tags } = useSelector((state) => state.posts) || {}
  const userData = useSelector((state) => state.auth.user) || {}
  // const userId = userData?._id
  // console.log('userData', userData)
  // console.log('userId', userId)
  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'
  const comments = useSelector((state) => state.comments.comments)

  const [selectedTag, setSelectedTag] = useState(null)

  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  useEffect(() => {
    dispatch(fetchTags())
  }, [])

  const onClickRemove = (postId) => {
    dispatch(deletePost(postId))
  }

  const handleTagClick = (tag) => {
    setSelectedTag(tag)
  }

  const filteredPosts = reset
    ? posts.items
    : selectedTag
    ? posts.items.filter((post) => post.tags.includes(selectedTag))
    : posts.items
  const postsToRender = reset
    ? posts.items
    : selectedTag
    ? filteredPosts.filter((post) => post.tags.includes(selectedTag))
    : filteredPosts

  return (
    <HomeContainer flexDirection="column">
      <Tags
        items={tags.items}
        onTagClick={handleTagClick}
        setSelectedTag={setSelectedTag}
        setReset={setReset}
      />
      <Card>
        {isPostsLoading
          ? [Array(5)]
          : postsToRender.map((post, index) => (
              <Post
                key={post._id}
                _id={post._id}
                title={post.title}
                content={post.content}
                truncate={true}
                createdAt={post.createdAt}
                imageUrl={`http://localhost:5000${post.imageUrl}`}
                author={post.author.fullName}
                viewCount={post.viewCount}
                tags={post.tags}
                comments={post.comments}
                isEditable={userData?._id === post.author?._id}
                onClickRemove={() => onClickRemove(post._id)}
              />
            ))}
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
