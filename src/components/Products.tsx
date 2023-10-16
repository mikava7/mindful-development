import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Product from './Product'

interface ProductType {
  id: number
  title: string
  category: string
  price: number
  image: string
  rating: {
    rate: number
    count: number
  }
}

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CategoryList = styled.ul`
  list-style: none;
  display: flex;
  gap: 10px;
  margin: 20px 0;
  padding: 0;
`

const CategoryItem = styled.li`
  cursor: pointer;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: 1px solid #007bff;
  border-radius: 5px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([])
  const categories: string[] = [
    'all',
    'electronics',
    'jewelry',
    "men's clothing",
    "women's clothing",
  ]
  const [categoryId, setCategoryId] = useState<number>(-1)

  useEffect(() => {
    fetchProducts()
  }, [categoryId])

  const fetchProducts = async (): Promise<void> => {
    try {
      let response
      if (categoryId === -1) {
        response = await axios.get(`https://fakestoreapi.com/products`)
      } else {
        response = await axios.get(
          `https://fakestoreapi.com/products/category/${categories[categoryId]}`
        )
      }
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ProductsContainer>
      <CategoryList>
        {categories.map((category, index: number) => (
          <CategoryItem key={index} onClick={() => setCategoryId(index)}>
            {category}
          </CategoryItem>
        ))}
      </CategoryList>
      <ProductsList>
        {products.map((product: ProductType) => (
          <Product
            key={product.id}
            title={product.title}
            category={product.category}
            price={product.price}
            image={product.image}
            rating={product.rating.rate}
            count={product.rating.count}
          />
        ))}
      </ProductsList>
    </ProductsContainer>
  )
}

export default Products
