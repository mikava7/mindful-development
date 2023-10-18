import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
// import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../redux/hooks.js'
// import { fetchRegister, selectAuthStatus } from '../redux/slices/auth.ts'
import { registerUser } from '../redux/slices/auth/authSlice.js'
import { Navigate } from 'react-router-dom'
import ImageUpload from '../components/imageUpload'
import { Button } from '../styled-component/styledComponents'
import { valueTypes } from '../types/types.js'
type imageType = string

const Registration: React.FC = () => {
  // const authStatus = useAppSelector(selectAuthStatus)
  const dispatch = useAppDispatch()
  const [imageUrl, setImageUrl] = useState('')

  const handleImageUpload = (imageUrl: imageType) => {
    setImageUrl(imageUrl)
  }

  const handleImageRemove = () => {
    setImageUrl('')
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {},
  })

  // Submit the register form
  const handleRegistrationSubmit = async (values: valueTypes) => {
    const data = await dispatch(registerUser(values))
    values.imageUrl = imageUrl
    if (data.payload && 'token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } else {
      // Otherwise, show an error message
      alert('Invalid email or password. Please try again.')
    }
  }

  // if (authStatus) {
  //   return <Navigate to="/" />
  // }

  return (
    <RegistrationContainer>
      <form onSubmit={handleSubmit(handleRegistrationSubmit)}>
        <h2>create account</h2>
        <input
          className="field"
          label="Name"
          placeholder="Enter full name"
          {...register('fullName', { required: 'Enter full name' })}
        />
        <input
          className="field"
          label="E-Mail"
          placeholder="Enter email"
          {...register('email', { required: 'Enter email' })}
        />
        <input
          className="field"
          label="password"
          placeholder="Enter password"
          {...register('password', { required: 'Enter password' })}
        />
        <ImageUpload
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          imageUrl={imageUrl}
        />
        <Button type="submit">Register</Button>
      </form>
    </RegistrationContainer>
  )
}

export default Registration

const RegistrationContainer = styled.section`
  width: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-bottom: 1rem;
  }

  form {
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
  }
`
