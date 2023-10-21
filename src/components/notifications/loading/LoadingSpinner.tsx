import styled, { keyframes } from 'styled-components'

// Keyframes for spinning animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

// Styled component for the loading spinner container
const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
`

// Styled component for the loading circle
const Circle = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #333; /* Border color of the circle */
  border-top: 4px solid #007bff; /* Border color of the spinning part */
  border-radius: 50%;
  animation: ${spin} 2s linear infinite; /* Apply the spinning animation */
`

// Styled component for the loading text
const LoadingText = styled.p`
  margin-top: 10px;
`

function LoadingSpinner() {
  return (
    <SpinnerContainer>
      <Circle />
      <LoadingText>Loading...</LoadingText>
    </SpinnerContainer>
  )
}

export default LoadingSpinner
