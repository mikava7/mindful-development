import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from './post/Post'
import { getFavorites } from '../redux/slices/auth'

const Favorites = () => {
  const dispatch = useDispatch()

  const userData = useSelector((state) => state.auth.user) || {}
  const userId = userData._id
  const favorites = useSelector((state) => state.auth.favorites) || []
  const posts = useSelector((state) => state.posts.posts.items) || []
  const status = useSelector((state) => state.auth.status) || {}
  // console.log('userId in favorite', userId)
  // console.log('userData in favorite', userData)
  // console.log('posts in favorite', posts)
  // console.log('favorites in favorite', favorites)

  const favoritePosts =
    favorites && posts.filter((post) => favorites.includes(post._id))
  console.log('favoritePosts', favoritePosts)
  useEffect(() => {
    dispatch(getFavorites(userId))
  }, [dispatch, userId])

  return (
    <div>
      <h2>Favorites</h2>
      {favoritePosts && favoritePosts.length > 0 ? (
        favoritePosts.map((favoritePost) => (
          <div key={favoritePost._id}>
            <Post
              key={favoritePost._id}
              _id={favoritePost._id}
              title={favoritePost.title}
              content={favoritePost.content}
              createdAt={favoritePost.createdAt}
              imageUrl={`http://localhost:5000${favoritePost.imageUrl}`}
              author={favoritePost.author.fullName}
              viewCount={favoritePost.viewCount}
              tags={favoritePost.tags}
              comments={favoritePost.comments}
              onClickRemove={() => onClickRemove(favoritePost._id)}
            />
          </div>
        ))
      ) : (
        <div>No favorite posts found.</div>
      )}
      {status === 'loading' && <div>Loading...</div>}
    </div>
  )
}

export default Favorites
