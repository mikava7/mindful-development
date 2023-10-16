import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import {
  selectAuthStatus,
  editPassword,
  fetchUserById,
  fetchUserData,
} from '../redux/slices/auth'
import EditUserInfoForm from '../components/EditUserInfoForm'
import EditPasswordForm from '../components/EditPasswordForm'
import {
  faEllipsisVertical,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FacebookIcon from '../svg/facebook.svg'
import twitterIcon from '../svg/twitter.svg'
import instagramIcon from '../svg/instagram.svg'

import {
  handleEditClick,
  handleEditPasswordClick,
  handleEditPasswordSubmit,
  useIsEditing,
} from './UserUtils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MyPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showIcons, setShowIcons] = useState(false)
  const [isEditing, setIsEditing] = useIsEditing()
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const user = useSelector((state: RootState) => state.auth.user) || {}
  const authStatus = useSelector(selectAuthStatus)
  const { userId } = useParams
  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])

  const handlePasswordSubmit = (data) =>
    handleEditPasswordSubmit(data, dispatch, setIsEditingPassword)

  return (
    <StyledUserPage>
      {authStatus ? (
        <ProfileInfo>
          <div>
            <img
              src={`http://localhost:5000${user.imageUrl}`}
              alt={user.fullName}
            />
          </div>
          <div>
            <p>{user.fullName}</p>
            <p>email: {user.email}</p>
          </div>
          {user._id === userId && (
            <span onClick={() => setShowIcons(!showIcons)}>
              <FontAwesomeIcon icon={faEllipsisVertical} />
              {showIcons && (
                <EditUser>
                  <p onClick={handleEditClick}>Edit user info</p>
                  <p onClick={handleEditPasswordClick}>Edit Password</p>
                </EditUser>
              )}
            </span>
          )}
          {isEditing && (
            <EditUserInfoForm user={user} setIsEditing={setIsEditing} />
          )}
          {isEditingPassword && (
            <EditPasswordForm
              handleSubmit={(data) =>
                handleEditPasswordSubmit(data, setIsEditingPassword, dispatch)
              }
            />
          )}
        </ProfileInfo>
      ) : (
        <p>not logged in</p>
      )}
    </StyledUserPage>
  )
}

export default MyPage
const StyledUserPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.inputText};
  color: ${({ theme }) => theme.colors.commentColor};
  font-size: 1.2rem;
`
const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
  position: relative;
  img {
    width: 3.7rem;
    height: 3.7rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
  span {
    margin-left: auto;
    font-size: 1.5rem;
    cursor: pointer;
  }
  p {
    font-size: 1rem;
  }
`
