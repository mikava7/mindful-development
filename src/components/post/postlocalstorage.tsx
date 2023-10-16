// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { PostSkeleton } from "../../components/PostSkeleton";
// import { FlexContainer,Title,Text, Button, ListItem, Container,StyledLink } from "../../styled-component/styledComponents";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBookmark, faStar,faPenToSquare,faTrash} from '@fortawesome/free-solid-svg-icons';
// // import { addFavorite, removeFavorite } from "../../redux/slices/auth";
// import {removeFavorite,addFavorite} from '../../redux/slices/favorites'
// import axios from '../../axios'
// interface PostProps {
//   _id: string;
//   title: string;
//   createdAt: string | number | Date;
//   imageUrl: string;
//   author: string;
//   viewCount: number;
//   isLoading: boolean;
//   isEditable: boolean;
//   content: string;
//   onClickRemove: (id: string) => void;
// }
// const Post: React.FC<PostProps> = ({
//   _id, title, createdAt, imageUrl, author, viewCount, isLoading, isEditable,content,
//   onClickRemove,
// }) => {

//   const postId = _id;
//   const [starred, setStarred] = useState<boolean>(
//     () => JSON.parse(localStorage.getItem('favorites') || '[]').includes(postId)
//   );
//   const favorites = useSelector((state) => state.favorites?.favorites) || [];
//   const isFavorite = favorites.includes(postId);
//   const [favoriteList, setFavoritesList]=useState([])
//   const dispatch = useDispatch()

//   const isLoggedIn = !!localStorage.getItem('token');

//   useEffect(() => {
//     // Load favorites from local storage
//     const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
//     setFavoritesList(storedFavorites);
//   }, []);

//   useEffect(() => {
//     // Update favorites in local storage
//     localStorage.setItem('favorites', JSON.stringify(favorites));
  
//     // Update favorites list state variable
//     setFavoritesList(favorites);
//   }, [favorites]);
  
//   console.log("favoriteList from localstorage",favoriteList)
//   console.log("favorite from slice",favorites)
  
//   const handleFavoriteClick = () => {
//     if (isFavorite) {
//       dispatch(removeFavorite(postId));
//       // Remove post ID from favorites in local storage
//       const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
//       const updatedFavorites = favorites.filter(id => id !== postId);
//       localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//     } else {
//       dispatch(addFavorite(postId));
//       // Add post ID to favorites in local storage
//       const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
//       const updatedFavorites = [...favorites, postId];
//       localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//     }
//     setStarred((prevStar)=> !prevStar)
//   };
  
//   const starColor = isLoggedIn && starred ? "gold" : "gray";
  
// const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString("en-US", {
//         day: "numeric",  month: "long",   year: "numeric",   })  : "Invalid Date";
//   if (!content) {
//     content = "No content available";
//   }


//   // callback function to handle post removal
//   const handleRemove = () => {
//     onClickRemove(_id);
//   };

//   // display loading skeleton if post is still being loaded
//   if (isLoading) {
//     return <PostSkeleton />;
//   }

//   return (
//     <div>
//       {/* display edit buttons if post is editable */}
//       {isEditable && (
//         <Container justifyContent="flex-end">
//           <StyledLink to={`/posts/${_id}/edit`}><FontAwesomeIcon icon={faPenToSquare} /></StyledLink>
//           <ListItem onClick={handleRemove}><FontAwesomeIcon icon={faTrash} /></ListItem>
//         </Container>
//       )}
//       <Container flexDirection={"column"}>
      
//           <Title> 
//             <StyledLink to={`/posts/${_id}`} fontSize={'2rem'}>{title} </StyledLink>
//           </Title>
              
//           <Container justifyContent={"flex-end"} width={"80%"}>

//               <span >Views: {viewCount}</span>
//           </Container>
      
//           <img src={imageUrl} alt={title} width={'250px'}/>
      
//         <Text> {content} </Text> 

//         <Container  flexDirection={"column"}>

//               <Container>

//                       <Container justifyContent={"flex-start"}>    
//                            <b>{author}</b>
//                       </Container >

//                       <Container  >
//                           <p >{formattedDate}</p>
//                           {isLoggedIn ? (
//         <span onClick={handleFavoriteClick}>
//           <FontAwesomeIcon icon={faStar} style={{ color: starColor }} />
//         </span>
//       ) : null}
//                           <span><FontAwesomeIcon icon={faBookmark}/></span>
//                       </Container>
        
//               </Container >

//               <Container justifyContent={"flex-end"}>
//                       <Link to={`/posts/${_id}`}>Read more </Link>
//               </Container>
                 
//         </Container>

      
//       </Container >
//     </div>
//   );
// };

// export default Post;


