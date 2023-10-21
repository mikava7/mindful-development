import { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../redux/store'
import { useAppSelector } from '../redux/hooks'
import { editUserInfo } from '../redux/slices/auth'
import ImageUpload from '../components/imageUpload'
import { useNavigate } from 'react-router-dom'
type ImageUpload = string
interface FormValues {
  fullName: string
  email: string
  imageUrl?: string
  // Add other fields as needed
}

const EditUserInfoForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const currentUser = useAppSelector((state) => state.auth.user)
  const [imageUrl, setImageUrl] = useState('')

  const handleImageUpload = (imageUrl: ImageUpload) => {
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
  } = useForm<FormValues>({
    defaultValues: {
      // fullName: currentUser.fullName,
      // email: currentUser.email,
    },
  })

  interface Values {}
  // Submit the edit user info form
  const onSubmit = async (values: FormValues) => {
    // Add the imageUrl to the values object
    values.imageUrl = imageUrl

    // Call the editUserInfo action creator and wait for the response
    // const data = await dispatch(editUserInfo(values))

    // if (data.payload && data.payload.success) {
    //   // If the update was successful, reset the form and show a success message
    //   reset()
    //   alert('User information updated successfully.')
    //   navigate('/user-info')
    // } else {
    //   // Otherwise, show an error message
    //   alert('Cannot update user information. Please try again.')
    // }
  }

  return (
    <EditUserInfoContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Edit User Information</h2>
        <input
          className="field"
          placeholder="Enter full name"
          {...register('fullName', { required: 'Enter full name' })}
        />
        <input
          className="field"
          placeholder="Enter email"
          {...register('email', { required: 'Enter email' })}
        />

        {/* <ImageUpload
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          imageUrl={imageUrl}
        /> */}

        <button type="submit">Save Changes</button>
      </form>
    </EditUserInfoContainer>
  )
}

export default EditUserInfoForm

const EditUserInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      margin-bottom: 1rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid #4267b2;
      font-size: 1rem;
      width: 100%;
    }

    button {
      background-color: #4267b2;
      color: #fff;
      border-radius: 0.25rem;
      border: none;
      font-size: 1rem;
      padding: 0.5rem;
      width: 100%;
    }
  }
`
