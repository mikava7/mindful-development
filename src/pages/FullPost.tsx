import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Post from '../components/post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { useAppSelector } from '../redux/hooks'
import { deletePost, updateViewCount, fetchPosts } from '../redux/slices/posts'
import { fetchComments } from '../redux/slices/commentSlice'

import ReactMarkdown from 'react-markdown'
import Comments from './Comments.js'
import { Button } from '../styled-component/styledComponents'

const FullPost: React.FC = () => {
  const dispatch = useDispatch()

  return <div></div>
}

export default FullPost
