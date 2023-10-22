import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserData } from '../redux/slices/auth/authSlice.js'
import { useAppDispatch } from '../redux/store.js'
import { useAppSelector } from '../redux/hooks.js'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons'
import ImageUpload from '../components/imageUpload'
import {
  Button,
  FlexContainer,
  ImageContainer,
} from '../styled-component/styledComponents.js'
import { createPost } from '../redux/slices/posts/postThunk.js'
const CreatePost = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  console.log('id', id)
  const dispatch = useAppDispatch()
  const isEditing = Boolean(id)
  const userData = useAppSelector(selectUserData)
  const userId = userData ? userData._id : null
  console.log('userId', userId)
  // Define your state variables
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [imageUrl, setImageUrl] = useState(
    'data:image/png;base64,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'
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = (imageUrl) => {
    setImageUrl(imageUrl)
  }

  const handleImageRemove = () => {
    setImageUrl('')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isEditing) {
          // Fetch data and set state variables
        }
      } catch (error) {
        console.error(error)
        alert('Failed to fetch post data.')
      }
    }

    fetchData()
  }, [isEditing])

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      setIsLoading(true)

      const fields = {
        title,
        content,
        imageUrl,
        userId,
        tags: tags.split(' ').map((tag) => tag.trim()),
      }

      if (isEditing) {
        // Dispatch an action to update the post
        dispatch(updatePost({ id, fields })).then(() => {
          navigate('/')
        })
      } else {
        // Dispatch an action to create a new post
        dispatch(createPost(fields)).then(() => {
          navigate('/')
        })
      }
    } catch (error) {
      console.warn(error)
      console.error(error)
      alert('Error when creating or updating the post')
    }
  }

  const onChangeTags = useCallback((event) => {
    setTags(event.target.value)
  }, [])

  return (
    <Container>
      <ImageBox>
        <ImageUpload
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          imageUrl={imageUrl}
        />
      </ImageBox>

      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input placeholder="Tags" value={tags} onChange={onChangeTags} />

      <Textarea
        type="text"
        placeholder="Text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <FlexContainer>
        <Button type="submit" onClick={onSubmit}>
          {isEditing ? 'Save' : 'Create'}
        </Button>
        <Link to="/">
          <Button>Cancel</Button>
        </Link>
      </FlexContainer>
    </Container>
  )
}
export default CreatePost

const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.lightBlack};
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  max-width: 467px;
`
const Input = styled.input`
  width: 100%;
  margin: 1rem;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const Textarea = styled.textarea`
  height: 200px;
  width: 100%;
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 16px;
  line-height: 1.5;
`
const ImageBox = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  align-items: ${(props) => props.alignItems || 'center'};
  padding: 0.1rem;
  border: 1px solid grey;

  height: 300px;
  overflow: scroll;

  & img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }

  @media (min-width: 719px) {
    max-width: 26rem;
    max-height: 26rem;
  }

  @media (min-width: 992px) {
    max-width: 32rem;
    max-height: 32rem;
  }
`
