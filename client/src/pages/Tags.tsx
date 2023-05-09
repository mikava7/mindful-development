import styled from 'styled-components'
const Tags = ({ items, onTagClick, setSelectedTag, setReset }) => {
  return (
    <Container>
      <ListContainer>
        {items.map((item) => {
          return (
            <ListItem key={items._id} onClick={() => onTagClick(item)}>
              {item}
            </ListItem>
          )
        })}
      </ListContainer>
      <ResetTagsButton
        onClick={() => {
          setSelectedTag(null)
          setReset(true)
        }}
      >
        Reset tags
      </ResetTagsButton>
    </Container>
  )
}

export default Tags

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors.lightBlack};
`
const ListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  align-items: center;
  max-width: 467px;
`
const ListItem = styled.li`
  list-style-type: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};

  padding: 0.2rem;
  margin: 0.2rem;
  width: 25%;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 12px;
  align-self: center;
  text-align: center;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    transform: scale(0.98);
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text};
  }
`

const ResetTagsButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 8px;
  padding: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`
