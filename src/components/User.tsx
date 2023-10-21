import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

interface UserProps {
  user: {
    // Define the structure of the user object
    // For example, assuming it has a name and email property:
    fullName: string
    email: string
    imageUrl: string
    // Add other properties as needed
  }
  myInfo: {
    // Define the structure of myInfo object if available
  }
  userId: string
}

const User: React.FC<UserProps> = ({ user, myInfo, userId }) => {
  const [showIcons, setShowIcons] = useState(false)

  return (
    <StyledUserPage>
      <ProfileInfo>
        <div>
          <img
            src={`http://localhost:5000${user && user.imageUrl}`}
            alt={user && user.fullName}
          />
        </div>
        <div>
          <p>{user && user.fullName}</p>
          <p>email: {user && user.email}</p>
        </div>
      </ProfileInfo>
    </StyledUserPage>
  )
}

export default User
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
