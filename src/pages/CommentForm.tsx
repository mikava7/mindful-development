import React, { useState } from 'react'
import axios from '../axios'
import styled from 'styled-components'
const CommentForm = ({ postId, handleSubmit, commentText, setCommentText }) => {
  // console.log('props', { postId, handleSubmit, commentText, setCommentText })
  return (
    <StyledCommentForm onSubmit={handleSubmit}>
      <textarea
        placeholder="Add a comment"
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit">Post comment</button>
    </StyledCommentForm>
  )
}

const StyledCommentForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  textarea {
    margin: 8px 0;
    padding: 12px;
    border: none;
    border-radius: 4px;
    align-self: stretch;
    background-color: #f0f2f5;
    font-size: 16px;
    resize: none;
    overflow: auto;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    width: 100%;

    &::placeholder {
      color: #65676b;
    }
  }

  button[type='submit'] {
    align-self: center;
    padding: 8px 16px;
    margin-top: 8px;
    border: none;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background-color: #166fe5;
    }

    &:active {
      background-color: #1660cc;
    }
  }
`

export default CommentForm
