import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchUserData,
  selectAuthStatus,
  editPassword,
} from '../redux/slices/auth'
import EditUserInfoForm from '../components/EditUserInfoForm'
import EditPasswordForm from '../components/EditPasswordForm'

const UserPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.user) || {}
  const authStatus = useSelector(selectAuthStatus)
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)

  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])

  const handleEditClick = () => {
    setIsEditing(true)
    navigate('/edit-user-info')
  }

  const handleEditPasswordClick = () => {
    setIsEditingPassword(true)
    navigate('/edit-password')
  }

  const handleEditPasswordSubmit = async (data) => {
    try {
      await dispatch(editPassword(data)).unwrap()
      setIsEditingPassword(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {authStatus ? (
        <div>
          <p>UserPage: {user.fullName}</p>
          <p>email: {user.email}</p>
          <img
            src={`http://localhost:5000${user.imageUrl}`}
            alt={user.fullName}
          />
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleEditPasswordClick}>Edit Password</button>
          {isEditing && (
            <EditUserInfoForm user={user} setIsEditing={setIsEditing} />
          )}
          {isEditingPassword && (
            <EditPasswordForm
              onSubmit={handleEditPasswordSubmit}
              onCancel={() => setIsEditingPassword(false)}
            />
          )}
        </div>
      ) : (
        <p>not logged in</p>
      )}
    </div>
  )
}

export default UserPage
