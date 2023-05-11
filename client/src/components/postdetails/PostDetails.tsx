import { formatDate } from '../formattedDate'
import { Container, StyledLink } from '../../styled-component/styledComponents'
import styled from 'styled-components'
export const PostDetails = ({ likes, viewCount, createdAt, postId }) => {
  const formattedDate = formatDate(createdAt)

  return (
    <BoxContainer>
      <PostDetailsContainer>
        <Details>{likes ? likes.length : 0} likes</Details>
        <Details>{viewCount} views</Details>
        <Details>{formattedDate}</Details>
      </PostDetailsContainer>
      <StyledLink
        to={`/posts/${postId}`}
        width={'100px'}
        fontSize={'1rem'}
        padding={0}
      >
        Read more
      </StyledLink>
    </BoxContainer>
  )
}
const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const PostDetailsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const Details = styled.div`
  margin-left: 1rem;
`
