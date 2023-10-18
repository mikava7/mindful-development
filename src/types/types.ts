export interface PostProps {
  _id: string
  title: string
  createdAt: string | number | Date
  imageUrl: string
  author: string
  viewCount: number
  isLoading: boolean
  isEditable: boolean
  content: string
  onClickRemove: (id: string) => void
}
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
}
