import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Container } from '../../styled-component/styledComponents'
import styled from 'styled-components'
interface EditButtonProps {
  handleRemove: () => void
  postId: string
}
const EditButtons: React.FC<EditButtonProps> = ({ handleRemove, postId }) => {
  return (
    <IconsContainer>
      <StyledLink to={`/posts/${postId}/edit`}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </StyledLink>

      <StyledIcons onClick={handleRemove}>
        <FontAwesomeIcon icon={faTrash} />
      </StyledIcons>
    </IconsContainer>
  )
}

export default EditButtons
const IconsContainer = styled.div`
  display: flex;
`
const StyledIcons = styled.li`
  color: ${({ theme }) => theme.colors.commentColor};
  margin-left: 0.3rem;
`

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.commentColor};
`
