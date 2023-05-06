import instance from '../axios'
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons'

const ImageUpload = ({ onImageUpload, onImageRemove, imageUrl }) => {
  const inputFileRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleChangeFile = async (event) => {
    try {
      const file = event.target.files[0]
      if (!file) {
        throw new Error('No file selected')
      }

      const formData = new FormData()
      formData.append('image', file)

      const response = await instance.post('/uploads', formData)
      const imageUrl = response.data.url
      setSelectedFile(file)
      onImageUpload(imageUrl)
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
    <div>
      <div onClick={() => inputFileRef.current.click()}>
        Upload <FontAwesomeIcon icon={faImage} />{' '}
      </div>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <div>
          <img src={`http://localhost:5000${imageUrl}`} alt="Uploaded" />
          <div style={{ marginTop: '1rem' }} onClick={onClickRemoveImage}>
            Delete <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      )}
    </div>
  )
}

ImageUpload.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
  onImageRemove: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
}

export default ImageUpload
