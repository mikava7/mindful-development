interface ProductProps {
  title: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  count: number;
}

const Product: React.FC<ProductProps> = ({ title, price, category, image, rating, count }) => {
  return (
    <div>
      <h2>products</h2>
      <p>title {title}$</p>
      <p>price {price}</p>
      <p>rating {rating}</p>
      <p>count {count}</p>
      <p>category {category}</p>
      <img src={image} alt={title} />
    </div>
  );
};

export default Product;
