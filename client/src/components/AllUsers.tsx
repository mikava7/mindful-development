import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../redux/slices/auth'
import { Link } from 'react-router-dom'
const AllUsers = () => {
  const dispatch = useDispatch()
  const allUsers = useSelector((state) => state.auth.users) || []

  console.log('allUsers', allUsers)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  return (
    <StyledAllUsers>
      <h2>all users</h2>
      {allUsers.AllUser &&
        allUsers.AllUser.map((user) => (
          <Link to={`/users/${user._id}`}>
            <CardContainer key={user._id}>
              <div>
                <img
                  src={`http://localhost:5000${user.imageUrl}`}
                  alt={user.fullName}
                />
              </div>
              <div>
                <h3>{user.fullName}</h3>
                <p>
                  <span>post created</span>
                  <span>
                    <b>35</b>{' '}
                  </span>
                </p>
              </div>
            </CardContainer>
          </Link>
        ))}
    </StyledAllUsers>
  )
}

export default AllUsers

const StyledAllUsers = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
`
const CardContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.inputText};
  color: ${({ theme }) => theme.colors.commentColor};
  padding: 1rem;
  margin: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  h3 {
    font-size: 1.2rem;
    padding: 0 auto;
    margin: 0 auto;
    margin-left: 0.5rem;
  }
  div {
    p {
      display: flex;
      flex-direction: row;
      margin-left: 1rem;
    }
  }
  span {
    display: flex;
    flex-direction: column;
  }
`
