import React from 'react'
import styled from 'styled-components'

interface ProductProps {
  title: string
  price: number
  category: string
  image: string
  rating: number
  count: number
}

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 16px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`

const Title = styled.h2`
  font-size: 1.25rem;
  margin: 8px 0;
`

const Price = styled.p`
  font-weight: bold;
  margin: 8px 0;
`

const Category = styled.p`
  color: #555;
  margin: 8px 0;
`

const Image = styled.img`
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  margin-top: 8px;
`

const Product: React.FC<ProductProps> = ({
  title,
  price,
  category,
  image,
  rating,
  count,
}) => {
  return (
    <ProductCard>
      <Image src={image} alt={title} />
      <Title>{title}</Title>
      <Price>${price}</Price>
      <Category>{category}</Category>
    </ProductCard>
  )
}

export default Product
