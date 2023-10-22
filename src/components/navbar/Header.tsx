import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { clearUserData } from '../../redux/slices/auth'
import {
  selectAuthStatus,
  selectAuthError,
} from '../../redux/slices/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/auth/authThunk'
import { selectUserData } from '../../redux/slices/auth/authSlice'
import {
  FlexContainer,
  Container,
  StyledLink,
} from '../../styled-component/styledComponents'
import LoadingSpinner from '../notifications/loading/LoadingSpinner'
import ErrorMessage from '../notifications/error/ErrorMessage'
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const authStatus = useAppSelector(selectAuthStatus)
  const authError = useAppSelector(selectAuthError)
  const user = useAppSelector(selectUserData)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  console.log('user', user)
  console.log('authStatus', authStatus)

  const onClickLogout = async () => {
    await dispatch(logout())
    navigate('/')
  }

  return (
    <div>
      <FlexContainer width={'300px'}>
        {authStatus === 'fulfilled' ? (
          <>
            <StyledLink to="/create-post">Create Post</StyledLink>
            <button onClick={onClickLogout}>Logout</button>
            <p>{user?.fullName}</p>
            {authError && <p>{authError}</p>}
          </>
        ) : (
          <Container width={'200px'} justifyContent="space-around">
            {authStatus === 'rejected' && authError !== null && (
              <ErrorMessage message={authError} />
            )}
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/register">Create Account</StyledLink>
          </Container>
        )}
      </FlexContainer>
    </div>
  )
}

export default Header
