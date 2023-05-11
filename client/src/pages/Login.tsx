import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin, selectAuthStatus } from '../redux/slices/auth'
import { Navigate } from 'react-router-dom'
import { Button } from '../styled-component/styledComponents'
interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const authStatus = useSelector(selectAuthStatus)

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {},
  })

  const onSubmit = async (values) => {
    // Call the fetchUserData action creator and wait for the response
    const data = await dispatch(fetchLogin(values))

    // If the response contains a token, set it in local storage
    if (data.payload && 'token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } else {
      // Otherwise, show an error message
      alert('Invalid email or password. Please try again.')
    }
  }

  if (authStatus) {
    return <Navigate to="/" />
  }

  return (
    <LoginForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="field"
          type="email"
          name="email"
          placeholder="Enter email"
          {...register('email', { required: 'Enter email' })}
        />

        {errors.email && <p>{errors.email.message}</p>}

        <input
          className="field"
          type="password"
          name="password"
          placeholder="Enter password"
          {...register('password', { required: 'Enter password' })}
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
