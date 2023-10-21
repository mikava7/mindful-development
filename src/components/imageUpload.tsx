import instance from '../axios'
import React, { useState, useRef, ChangeEvent } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { ImageContainer } from '../styled-component/styledComponents'

interface ImageUploadProps {
  onImageUpload: () => void
  onImageRemove: () => void
  imageUrl: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  onImageRemove,
  imageUrl,
}) => {
  const inputFileRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      event.preventDefault()
      const file = event.target.files && event.target.files[0]
      if (!file) {
        throw new Error('No file selected')
      }

      const formData = new FormData()
      formData.append('image', file)

      const response = await instance.post('/uploads', formData)
      const imageUrl = response.data.url
      // setSelectedFile(file)
      // onImageUpload(imageUrl)
    } catch (error) {
      console.error(error)
      alert('File upload error')
    }
  }

  const onClickRemoveImage = () => {
    setSelectedFile(null)
    onImageRemove()
  }

  return (
    <Container>
      {/* <Button onClick={() => inputFileRef?.current?.click?.()}> */}
      <Button>
        Upload <FontAwesomeIcon icon={faImage} />{' '}
      </Button>

      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <div>
          <ImageContainer>
            <img src={`http://localhost:5000${imageUrl}`} alt="Uploaded" />
          </ImageContainer>
          <Button onClick={onClickRemoveImage}>
            Delete <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      )}
    </Container>
  )
}

ImageUpload.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
  onImageRemove: PropTypes.func.isRequired,
  // imageUrl: PropTypes.string,
}

export default ImageUpload
const Container = styled.div`
  width: 300px;
  height: 300px;
`
// const ImageContainer = styled.div`
//   width: 300px;
//   height: 300px;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   & > img {
//     max-width: 100%;
//     height: auto;
//     object-fit: contain;
//   }
// `
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4267b2;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 0.5rem;
  cursor: pointer;
`
