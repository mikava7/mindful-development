import React from 'react'
import styled from 'styled-components'

// Styled component for the error message container
const ErrorContainer = styled.div`
  background-color: #f44336; /* Red background color */
  color: #fff; /* White text color */
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  width: 100%;
  margin-top: 10px;
`
type Message = string

function ErrorMessage({ message }: { message: Message }) {
  console.log('message in ErrorMessage', message)
  return <ErrorContainer> error{message}</ErrorContainer>
}

export default ErrorMessage
