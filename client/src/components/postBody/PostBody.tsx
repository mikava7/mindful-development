import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  StyledLink,
  Text,
  ImageContainer,
} from '../../styled-component/styledComponents'
import EditButtons from '../editButtons/EditButtons'
const PostBody = ({
  truncate,
  content,
  imageUrl,
  title,
  postId,
  author,
  handleRemove,
  isEditable,
  userId,
}) => {
  return (
    <BodyContainer>
      <StyledLink to={`/posts/${postId}`}>{title.substring(0, 60)} </StyledLink>
      <Text alignSelf={'flex-end'}>{author}</Text>
      <EditButtonsContainer>
        {isEditable && (
          <EditButtons postId={postId} handleRemove={handleRemove} />
        )}
      </EditButtonsContainer>
      <ImageContainer flexDirection={'column'}>
        <img src={imageUrl} alt={title.substring(0, 60)} />
      </ImageContainer>
      <Text>{truncate ? content.substring(0, 300) + '...' : content}</Text>
    </BodyContainer>
  )
}

export default PostBody

const BodyContainer = styled.div`
  padding-bottom: 0.5rem;
  position: relative;
`
const EditButtonsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
