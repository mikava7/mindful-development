import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from './post/Post'
import { fetchFavorites } from '../redux/slices/favoriteSlice'
import { deletePost } from '../redux/slices/posts'

const Favorites = () => {
  const dispatch = useDispatch()

  const userData = useSelector((state) => state.auth.user) || {}
  const userId = userData._id
  const favorites = useSelector((state) => state.favorites.favorites) || {}
  const status = useSelector((state) => state.favorites.status) || {}
  console.log('userId in favorite', userId)
  console.log('favorites in favorite', favorites)

  useEffect(() => {
    dispatch(fetchFavorites(userId))
  }, [dispatch, userId])

  // console.log('favorites', favorites.favorites)

  if (status === 'loading') {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h2>Favorites</h2>
      {favorites.favorites &&
        favorites.favorites.map((favorite) => (
          <div key={favorite._id}>
            <Post
              key={favorite.post}
              _id={favorite.post?._id}
              title={favorite.post?.title}
              content={favorite.post?.content}
              createdAt={favorite.post?.createdAt}
              imageUrl={`http://localhost:5000${favorite.post?.imageUrl}`}
              author={favorite.post?.author.fullName}
              viewCount={favorite.post?.viewCount}
              tags={favorite.post?.tags}
              comments={favorite.post?.comments}
              // isEditable={userData?._id === favorite.post?.author?._id}
              onClickRemove={() => onClickRemove(favorite.post?._id)}
            />
          </div>
        ))}
    </div>
  )
}

export default Favorites
