import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVisitedPosts, clearHistory } from '../redux/slices/auth'

const History = () => {
  const dispatch = useDispatch()
  const { VisitedPosts, status } = useSelector((state) => state.auth) || []
  // console.log('VisitedPosts in history', VisitedPosts)
  // console.log('status in history', status)

  useEffect(() => {
    dispatch(getVisitedPosts())
  }, [dispatch])

  const handleClearVisitedPosts = () => {
    dispatch(clearHistory())
  }
  return (
    <div>
      <h2>Visited Posts</h2>
      {status === 'loading' && <div>Loading...</div>}
      {VisitedPosts.length === 0 ? (
        <div>No visited posts found.</div>
      ) : (
        <>
          <button onClick={handleClearVisitedPosts}>Clear Visited Posts</button>
          {VisitedPosts.map((post) => (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
export default History
