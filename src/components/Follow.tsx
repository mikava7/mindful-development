import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppSelector } from '../redux/hooks'
import { follow, unFollow } from '../redux/slices/auth'
import { useParams } from 'react-router-dom'

import axios from '../axios'
type UserId = string
function Follow({ followUserId }: { followUserId: UserId }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const currentUser = useAppSelector((state) => state.auth.user)

  // useEffect(() => {
  //   if (currentUser && currentUser.following.includes(followUserId)) {
  //     setIsFollowing(true)
  //   }
  // }, [currentUser, followUserId])

  const handleFollow = async () => {
    try {
      await axios.put('/auth/follow', { followId: followUserId })
      setIsFollowing(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnfollow = async () => {
    try {
      await axios.put('/auth/unFollow', { followId: followUserId })
      setIsFollowing(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {isFollowing ? (
        <button onClick={handleUnfollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </div>
  )
}

export default Follow
