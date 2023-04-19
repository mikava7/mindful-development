import React from 'react';
import AddComment from './AddComments'
interface CommentsProps {
  content: string;
  author: string;
}

const Comments = () => {

  return (
    <div>
     <AddComment/>
    </div>
  );
}

export default Comments;
