import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm, RegisterOptions } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../redux/hooks.js'
import { selectAuthStatus } from '../redux/slices/auth/authSlice.js'
import { registerUser } from '../redux/slices/auth/authThunk.js'
import { Navigate } from 'react-router-dom'
import ImageUpload from '../components/imageUpload'
import { Button } from '../styled-component/styledComponents'
import { valueTypes } from '../types/types.js'
// import StatusIndicator from '../components/notifications/statusIndicator/StatusIndicator.js'
// import LoadingSpinner from '../components/notifications/loading/LoadingSpinner.js'
// import ErrorMessage from '../components/notifications/error/ErrorMessage.js'
// import SuccessMessage from '../components/notifications/SuccessMessage/SuccessMessage.js'
type imageType = string
type Register = (name: string, options?: RegisterOptions) => (ref: any) => void

const Registration: React.FC = () => {
  const isAuthenticated = useAppSelector(selectAuthStatus)
  const dispatch = useAppDispatch()
  const [imageUrl, setImageUrl] = useState('')
  const navigate = Navigate
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
  } = useForm<valueTypes>({
    defaultValues: {},
  })
  // Explicitly specify the type for register
  const registerOptions: RegisterOptions = {
    required: 'This field is required',
  }

  // Submit the register form
  const handleRegistrationSubmit = async (values: valueTypes) => {
    console.log('values', values)
    const data = await dispatch(registerUser(values))
    values.imageUrl = imageUrl
  }

  if (isAuthenticated) {
    // return <Navigate to="/login" />
  }

  return (
    <RegistrationContainer>
      <form onSubmit={handleSubmit(handleRegistrationSubmit)}>
        <h2>create account</h2>
        <div className="field">
          <label htmlFor="fullname">Name</label>
          <input
            type="text"
            id="fullname"
            placeholder="Enter full name"
            {...register('fullname', registerOptions)}
          />
        </div>
        <div className="field">
          <label htmlFor="email">E-Mail</label>
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            {...register('email', registerOptions)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            {...register('password', registerOptions)}
          />
        </div>
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
