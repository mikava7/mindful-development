import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthStatus } from '../redux/slices/auth.ts'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor'

import instance from '../axios.ts'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons'
import ImageUpload from '../components/imageUpload'
const CreatePost = () => {
  const authStatus = useSelector(selectAuthStatus)
  const navigate = useNavigate()
  const { id } = useParams() // extract id from URL params
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputFileRef = useRef(null)
  const [data, setData] = useState([])

  const isEditing = Boolean(id)

  const handleImageUpload = (imageUrl) => {
    setImageUrl(imageUrl)
  }

  const handleImageRemove = () => {
    setImageUrl('')
  }

  const onChange = useCallback((value) => {
    setContent(value)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const { data } = await instance.get(`/posts/${id}`)

          setTitle(data.post.title)
          setContent(data.post.content)
          setImageUrl(data.post.imageUrl)
          if (data.post && data.post.tags) {
            setTags(data.post.tags.join(' ').replace(/,/g, ''))
          }
          console.log('res', data)
        }
      } catch (error) {
        console.error(error)
        alert('Failed to fetch post data.')
      }
    }

    fetchData()
  }, [])

  const options = useMemo(
    () => ({
      spellChecker: false,
      textarea: true,
      maxHeight: '100px',
      autofocus: true,
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  )
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
        ? await instance.patch(`/posts/${id}`, fields)
        : await instance.post('/posts', fields)

      const _id = isEditing ? id : data._id

      navigate('/')

      // console.log('postCreation data', `/posts/${id}`)
    } catch (error) {
      console.warn(error)
      alert('Error when created post')
    }
  }
  const onChangeTags = useCallback((event) => {
    setTags(event.target.value)
  }, [])

  return (
    <Container>
      <div>
        <ImageUpload
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          imageUrl={imageUrl}
        />
      </div>
      {/* {imageUrl && (
        <Container>
          <img src={`http://localhost:5000${imageUrl}`} alt="Uploaded" />
          <div style={{ marginTop: '1rem' }} onClick={handleImageRemove}>
            Delete <FontAwesomeIcon icon={faTrash} />
          </div>
        </Container>
      )} */}
      <br />

      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input placeholder="Tags" value={tags} onChange={onChangeTags} />

      <SimpleMDE value={content} onChange={onChange} options={options} />

      <div className="buttons">
        <button type="submit" onClick={onSubmit}>
          {isEditing ? 'Save' : 'Create'}
        </button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </div>
    </Container>
  )
}
export default CreatePost

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  width: 100%;
`
const Input = styled.input`
  width: 100%;
  margin: 1rem;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`
const SimpleMDEWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 8px 0;
  .CodeMirror {
    height: 200px;
    overflow-y: scroll;
  }
`
