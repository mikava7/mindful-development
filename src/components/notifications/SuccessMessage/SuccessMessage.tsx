import React from 'react'
import styled from 'styled-components'

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

function SuccessMessage({ message }) {
  return <SuccessContainer>{message}</SuccessContainer>
}

export default SuccessMessage
