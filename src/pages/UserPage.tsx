import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../axios'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisVertical,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import FacebookIcon from '../svg/facebook.svg'
import twitterIcon from '../svg/twitter.svg'
import instagramIcon from '../svg/instagram.svg'
import {
  handleEditClick,
  handleEditPasswordClick,
  handleEditPasswordSubmit,
  useIsEditing,
} from '../components/UserUtils'
import User from '../components/User'
import Follow from '../components/Follow'
const UserPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showIcons, setShowIcons] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const { userId } = useParams()
  console.log('in UserPage', userId)
  const user = useSelector((state) => state.auth.userById)
  const myInfo = useSelector((state) => state.auth.user) || {}

  // console.log(user)
  // console.log('myInfo in  userPage', myInfo)

  const authStatus = useSelector(selectAuthStatus)

  useEffect(() => {
    dispatch(fetchUserById(userId))
  }, [userId])

  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])

  const handlePasswordSubmit = (data) =>
    handleEditPasswordSubmit(data, dispatch, setIsEditingPassword)
  return (
    <div>
      {authStatus ? (
        <StyledUserPage>
          <ProfileInfo>
            <User user={user} userId={userId} myInfo={myInfo} />

            {myInfo._id === userId && (
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
          </ProfileInfo>
          <SocialIcons>
            <Icon src={FacebookIcon} alt="Facebook" />
            <Icon src={twitterIcon} alt="Twitter" />
            <Icon src={instagramIcon} alt="Instagram" />
          </SocialIcons>
          <Connections>
            <div>
              <span>posts</span>
              <span>134</span>
            </div>
            <div>
              <span>followers</span>
              <span>8009</span>
            </div>
            <div>
              <span>Following</span>
              <span>200</span>
            </div>
          </Connections>
          {myInfo._id !== userId && (
            <ActionButton>
              <div>
                <Follow followUserId={userId} />
              </div>
              <div>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
            </ActionButton>
          )}
          {myInfo._id === userId && isEditing && (
            <EditUserInfoForm user={user} setIsEditing={setIsEditing} />
          )}
          {myInfo._id === userId && isEditingPassword && (
            <EditPasswordForm
              handleSubmit={(data) =>
                handleEditPasswordSubmit(data, setIsEditingPassword, dispatch)
              }
            />
          )}
        </StyledUserPage>
      ) : (
        <p>not logged in</p>
      )}
    </div>
  )
}

export default UserPage
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
const EditUser = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  border: 1px solid gray;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.commentColor};
  color: ${({ theme }) => theme.colors.inputText};
  padding: 0.5rem;
  position: absolute;
  top: 3%;
  right: 3%;
  cursor: pointer;
`
const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 1rem;
`
const Icon = styled.img`
  width: 24px;
  height: 24px;
`
const Connections = styled.div`
  display: flex;
  padding: 0.5rem;
  justify-content: space-evenly;
  div {
    display: flex;
    flex-direction: column;
    span {
      margin: 0 auto;
    }
  }
`
const ActionButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 2rem;
  padding: 1rem;
  cursor: pointer;
  div {
    font-size: 2rem;
  }
  button {
    border: none;
    border-radius: 12px;
    padding: 0.3rem;
    background-color: ${({ theme }) => theme.colors.commentColor};
    color: ${({ theme }) => theme.colors.inputText};
    width: 100px;
    font-size: 1.2rem;
  }
`
