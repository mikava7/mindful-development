import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserData, selectAuthStatus } from '../redux/slices/auth'

const UserPage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user) || {}
  const authStatus = useSelector(selectAuthStatus)
  //   console.log(authStatus)
  //   console.log('user in component', user)
  //   console.log('imageUrl in component', user.imageUrl)

  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])

  return (
    <div>
      {authStatus ? (
        <div>
          {' '}
          <p>UserPage: {user.fullName}</p>
          <p>email: {user.email}</p>
          <img
            src={`http://localhost:5000${user.imageUrl}`}
            alt={user.fullName}
          />
        </div>
      ) : (
        <p>not logged in</p>
      )}
    </div>
  )
}

export default UserPage
