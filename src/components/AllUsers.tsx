import { useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../redux/store'
import { useAppSelector } from '../redux/hooks'
import {
  selectUsers,
  selectUsersLoadingStatus,
  selectUsersErrorState,
  getAllUsers,
} from '../redux/slices/user/userSlice'
import { Link } from 'react-router-dom'
import LoadingSpinner from './notifications/loading/LoadingSpinner'
import ErrorMessage from './notifications/error/ErrorMessage'
import { Author } from '../types/types'

interface UsersData {
  AllUser: Author
  // You can add other properties here if needed
}

const AllUsers = () => {
  const dispatch = useAppDispatch()
  const usersData: UsersData[] = useAppSelector(selectUsers)
  const loadingStatus = useAppSelector(selectUsersLoadingStatus)
  const error = useAppSelector(selectUsersErrorState)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <StyledAllUsers>
      <h2>All Users</h2>
      {loadingStatus === 'loading' ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <UserList>
          {usersData.AllUser.map((user) => (
            <UserCard key={user._id}>
              <Link to={`/users/${user._id}`}>
                <UserImage
                  src={`http://localhost:5000${user.imageUrl}`}
                  alt={user.fullName}
                />
                <UserName>{user.fullName}</UserName>
              </Link>
            </UserCard>
          ))}
        </UserList>
      )}
    </StyledAllUsers>
  )
}

export default AllUsers

// The rest of your styled components and imports

const StyledAllUsers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`

const UserList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 1000px;
  width: 100%;
`

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.inputText};
  color: ${({ theme }) => theme.colors.commentColor};
  border-radius: 1rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  a {
    text-decoration: none;
  }
`

const UserImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`

const UserName = styled.h3`
  font-size: 1.2rem;
  padding: 1rem;
  text-align: center;
`
