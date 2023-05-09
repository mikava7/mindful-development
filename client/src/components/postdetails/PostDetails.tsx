import { formatDate } from '../formattedDate'
import { Container } from '../../styled-component/styledComponents'
import styled from 'styled-components'
export const PostDetails = ({ likes, viewCount, createdAt }) => {
  const formattedDate = formatDate(createdAt)

  return (
    <PostDetailsContainer justifyContent={'flex-end'}>
      <Details>{likes ? likes.length : 0} likes</Details>
      <Details>{viewCount} views</Details>
      <Details>{formattedDate}</Details>
    </PostDetailsContainer>
  )
}
const PostDetailsContainer = styled(Container)`
  display: flex;
  justify-content: flex-end;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const Details = styled.div`
  margin-left: 1rem;
`
