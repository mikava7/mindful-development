import styled from 'styled-components'
import { Link } from 'react-router-dom'
// Styled component for the success message container
const SuccessContainer = styled.div`
  background-color: #4caf50; /* Green background color */
  color: #fff; /* White text color */
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  width: 100%;
  margin-top: 10px;
`

type SuccessMessageProps = {
  message: string
}

function SuccessMessage() {
  return (
    <SuccessContainer>
      <Link to="/">Home</Link>
    </SuccessContainer>
  )
}
export default SuccessMessage
