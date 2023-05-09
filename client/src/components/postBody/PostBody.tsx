import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  StyledLink,
  Text,
  ImageContainer,
} from '../../styled-component/styledComponents'
const PostBody = ({ truncate, content, imageUrl, title, _id, author }) => {
  return (
    <BodyContainer>
      <StyledLink to={`/posts/${_id}`}>{title.substring(0, 60)} </StyledLink>
      <ImageContainer flexDirection={'column'}>
        <Text alignSelf={'flex-end'}>
          By <b style={{ marginLeft: '0.6rem' }}>{author}</b>
        </Text>

        <img src={imageUrl} alt={title.substring(0, 60)} />
      </ImageContainer>
      <Text>{truncate ? content.substring(0, 300) + '...' : content}</Text>
    </BodyContainer>
  )
}

export default PostBody

const BodyContainer = styled.div`
  padding-bottom: 0.5rem;
`
