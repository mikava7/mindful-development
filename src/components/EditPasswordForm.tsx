import { useDispatch } from 'react-redux'
import { editPassword } from '../redux/slices/auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const EditPasswordForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newPassword !== newPassword) {
      dispatch(editPassword({ currentPassword, newPassword }))
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      alert('New password must be different from the previous')
      setNewPassword('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  )
}

export default EditPasswordForm
