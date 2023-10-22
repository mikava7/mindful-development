import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { Link, useParams } from 'react-router-dom'
import Comments from './Comments'
import Post from '../components/post/Post'
import Tags from '../pages/Tags'
import Products from '../components/Products'
import Navbar from '../components/navbar/Navbar'
import { fetchPosts, deletePost } from '../redux/slices/posts/postThunk'
import {
  fetchTags,
  selectTags,
  selectTagsErrorState,
  selectTagsLoading,
} from '../redux/slices/tags/tagsSlice'
import { fetchComments } from '../redux/slices/commentSlice'
import { fetchUserData } from '../redux/slices/auth'
import {
  FlexContainer,
  CardContainer,
} from '../styled-component/styledComponents'

const Home = () => {
  const dispatch = useAppDispatch()

  const [reset, setReset] = useState(false)
  const posts = useSelector((state) => state.posts) || {}
  console.log('posts', posts)
  const userData = useSelector((state) => state.auth.user) || {}

  const isPostsLoading = posts.status === 'loading'
  const tags = useAppSelector(selectTags)
  const isTagsLoading = useAppSelector(selectTagsLoading)
  const tagsError = useAppSelector(selectTagsErrorState)
  // console.log('isTagsLoading', isTagsLoading)
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
        items={tags}
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
