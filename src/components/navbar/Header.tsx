import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { clearUserData } from '../../redux/slices/auth'
import { selectAuthStatus } from '../../redux/slices/auth'
import {
  FlexContainer,
  Container,
  StyledLink,
} from '../../styled-component/styledComponents'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const isAuthentnicated = useAppSelector(selectAuthStatus)
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.data)

  const onClickLogout = () => {
    // Prompt the user to confirm they want to log out
    if (window.confirm('Do you want to log out?')) {
      // Dispatch the clearUserData action to clear the user data in Redux store
      dispatch(clearUserData())
      // Remove the token from local storage
      window.localStorage.removeItem('token')
    }
  }
  return (
    <div>
      <FlexContainer width={'300px'}>
        {isAuthentnicated ? (
          <>
            <StyledLink to="/create-post">create post</StyledLink>
            <button onClick={onClickLogout}>Logout</button>
            <p>{user.fullName}</p>
          </>
        ) : (
          <Container width={'200px'} justifyContent="space-around">
            <StyledLink to="/login">Login</StyledLink>

            <StyledLink to="/register">Create account</StyledLink>
          </Container>
        )}
      </FlexContainer>
    </div>
  )
}

export default Header
