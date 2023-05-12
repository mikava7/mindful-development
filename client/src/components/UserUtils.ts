import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAuthStatus,
  editPassword,
  fetchUserData,
} from '../redux/slices/auth'

export const useIsEditing = () => {
  const [isEditing, setIsEditing] = useState(false)
  return [isEditing, setIsEditing]
}

export const handleEditClick = (setIsEditing, navigate) => {
  setIsEditing(true)
  navigate('/edit-user-info')
}

export const handleEditPasswordClick = (setIsEditingPassword, navigate) => {
  setIsEditingPassword(true)
  navigate('/edit-password')
}

export const handleEditPasswordSubmit = async (
  data,
  dispatch,
  setIsEditingPassword
) => {
  try {
    await dispatch(editPassword(data)).unwrap()
    setIsEditingPassword(false)
  } catch (error) {
    console.log(error)
  }
}
