import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";

interface ProductType {
    id: number;
    title: string;
    category: string;
    price: number;
    image: string;
    rating: {
        rate:number;
        count:number;
    }
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const categories: string[] = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];
  const [categoryId, setCategoryId] = useState<number>(-1);

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const fetchProducts = async (): Promise<void> => {
    try {
      let response;
      if (categoryId === -1) {
        response = await axios.get(`https://fakestoreapi.com/products`);
      } else {
        response = await axios.get(`https://fakestoreapi.com/products/category/${categories[categoryId]}`);
      }
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {categories.map((category, index:number) => (
          <li onClick={() => setCategoryId(index)} key={index}>
            {category}
          </li>
        ))}
      </div>
      <div>
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
      </div>
    </div>
  );
};

export default Products;
