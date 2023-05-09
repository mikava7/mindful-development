import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
const EditButtons = ({ handleRemove, postId }) => {
  return (
    <ul>
      <Link to={`/posts/${postId}/edit`}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </Link>

      <Link onClick={handleRemove}>
        <FontAwesomeIcon icon={faTrash} />
      </Link>
    </ul>
  )
}

export default EditButtons
