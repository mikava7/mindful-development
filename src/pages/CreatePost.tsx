import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthStatus } from '../redux/slices/auth.ts'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import axios from '../axios.ts'
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
const CreatePost = () => {
  const authStatus = useSelector(selectAuthStatus)
  const navigate = useNavigate()
  const { id } = useParams() // extract id from URL params
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [imageUrl, setImageUrl] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const inputFileRef = useRef(null)
  const [data, setData] = useState([])

  const isEditing = Boolean(id)
  console.log(axios)
  console.log(authStatus)
  console.log(id)
  console.log(isEditing)

  const handleImageUpload = (imageUrl) => {
    setImageUrl(imageUrl)
  }

  const handleImageRemove = () => {
    setImageUrl('')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const { data } = await axios.get(`/posts/${id}`)

          setTitle(data.post.title)
          setContent(data.post.content)
          setImageUrl(data.post.imageUrl)
          if (data.post && data.post.tags) {
            setTags(
              data.post.tags.join(' ').replace(/,/g, '').replace(/#/g, '')
            )
          }
        }
      } catch (error) {
        console.error(error)
        alert('Failed to fetch post data.')
      }
    }

    fetchData()
  }, [])

  const token = localStorage.getItem('token')

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      setIsLoading(true)
      const fields = {
        title,
        content,
        imageUrl,
        tags: tags.split(' ').map((tag) => tag.trim()),
      }

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields)

      const _id = isEditing ? id : data._id
      console.log({ isEditing, id, data })
      navigate('/')
    } catch (error) {
      console.warn(error)
      console.error(error)

      alert('Error when created post')
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
