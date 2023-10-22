import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useForm, RegisterOptions } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'
import {
  selectAuthStatus,
  selectAuthError,
} from '../redux/slices/auth/authSlice'
import { fetchLogin } from '../redux/slices/auth/authThunk'
import { Navigate } from 'react-router-dom'
import { Button } from '../styled-component/styledComponents'
import { useNavigate } from 'react-router-dom'
import { valueTypes } from '../types/types'
import { useAppSelector } from '../redux/hooks'
import LoadingSpinner from '../components/notifications/loading/LoadingSpinner'
import ErrorMessage from '../components/notifications/error/ErrorMessage'
const Login: React.FC<valueTypes> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const AuthStatus = useAppSelector(selectAuthStatus)
  const AuthError = useAppSelector(selectAuthError)
  console.log({ AuthStatus, AuthError })
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<valueTypes>({
    defaultValues: {},
  })

  const registerOptions: RegisterOptions = {
    required: 'This field is required',
  }
  const onSubmit = (values: valueTypes) => {
    dispatch(fetchLogin(values))
  }
  if (AuthStatus === 'pending') {
    return <LoadingSpinner />
  } else if (AuthStatus === 'fulfilled') {
    // You can redirect or display a success message here
    navigate('/')
  } else if (AuthStatus === 'rejected' && AuthError !== null) {
    return <ErrorMessage message={AuthError} />
  }

  return (
    <LoginForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="field"
          type="email"
          placeholder="Enter email"
          {...register('email', registerOptions)}
        />

        {errors.email && <p>{errors.email.message}</p>}

        <input
          className="field"
          type="password"
          placeholder="Enter password"
          {...register('password', registerOptions)}
        />

        <Button type="submit">Login</Button>
      </form>
    </LoginForm>
  )
}

export default Login

const LoginForm = styled.div`
  width: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    margin-bottom: 1rem;
    padding: 0.5rem 0 0.5rem 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #4267b2;
    font-size: 1rem;
    width: 100%;
  }
`
