// export interface PostProps {
// import { comment } from '../../../mindful-development-server/modules/Comments';
//   _id: string
//   title: string
//   createdAt: string | number | Date
//   imageUrl: string
//   author: string
//   viewCount: number
//   isLoading: boolean
//   isEditable: boolean
//   content: string
//   onClickRemove: (id: string) => void
// }
export interface UserType {
  _id: string
  username: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}

export interface valueTypes {
  email: string
  password: string
  name: string
  imageUrl: string
  fullname: string
}

//
type IdObject = {
  id: string
}
type CommentType = {
  id: string
  content: string
}
type ReactedBy = {
  id: string
  content: string
}
type Tags = string[]

export type Favorites = IdObject[]
type Followers = IdObject[]
type Following = IdObject[]
type Posts = IdObject[]
type ReactedTo = IdObject[]
type Visited = IdObject[]
export interface Author {
  createdAt: string
  email: string
  fullName: string
  imageUrl: string
  updateAt: string
  favorites: Favorites[]
  followers: Followers[]
  following: Following[]
  posts: Posts[]
  reactedTo: ReactedTo[]
  visited: Visited[]
  _id: string
}
export interface Post {
  comments: CommentType
  _id: string
  viewCount: number
  content: string
  createdAt: string
  imageUrl: string
  title: string
  reactedBy: ReactedBy[]
  tags: Tags[]
  author: Author
}
