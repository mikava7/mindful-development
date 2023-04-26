import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Comments from "./Comments";
import Post from "../components/post/Post";
import Tags from "../pages/Tags";
import Products from "../components/Products";
import Navbar from "../components/Navbar";
import { fetchPosts, fetchTags, deletePost } from "../redux/slices/posts";
import { fetchComments } from "../redux/slices/commentSlice";
import { FlexContainer } from "../styled-component/styledComponents";


const Home = () => {
  const dispatch = useDispatch();

  const [reset, setReset] = useState(false);
  const { posts, tags,  } = useSelector((state) => state.posts) || {};
  const userData = useSelector((state) => state.auth.data) || {};
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const comments = useSelector(state => state.comments.comments);

  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    dispatch(fetchTags());
  }, []);

  const onClickRemove = (postId) => {
    dispatch(deletePost(postId));
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const filteredPosts = reset
    ? posts.items
    : selectedTag
    ? posts.items.filter((post) => post.tags.includes(selectedTag))
    : posts.items;
  const postsToRender = reset
    ? posts.items
    : selectedTag
    ? filteredPosts.filter((post) => post.tags.includes(selectedTag))
    : filteredPosts;

  return (
    <FlexContainer flexDirection={'column'}>
 
      <div>
        {isPostsLoading ? (
          [Array(5)]
        ) : (
          postsToRender.map((obj, index) => (
            <div key={index}>
              <Post
                key={obj._id}
                _id={obj._id}
                title={obj.title}
                content={obj.content}
                createdAt={obj.createdAt}
                imageUrl={`http://localhost:5000${obj.imageUrl}`}
                author={obj.author.fullName}
                viewCount={obj.viewCount}
                tags={obj.tags}
                comments={obj.comments}
                isEditable={userData?._id === obj.author?._id}
                onClickRemove={() => onClickRemove(obj._id)}
              />
              <Comments
                postId={obj._id}
                comments={comments.filter((comment) => comment.comment.post === obj._id)} // filter comments array to show only comments for this post
              />
            </div>
          ))
        )}
      </div>

      <div>
        <Tags
          items={tags.items}
          isLoading={isTagsLoading}
          onTagClick={handleTagClick}
          setSelectedTag={setSelectedTag}
          setReset={setReset}
        />
      </div>
    
    </FlexContainer>
  );
};

export default Home;
