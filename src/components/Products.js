import { Row, Col } from "react-bootstrap";
import Product from "./product/Product";
const Products = ({ products, handleAddToCart }) => {
  if (!products.length) return <p>Loading...</p>;
  return (
    <div>
      <Row>
        {products.map((product, i) => {
          return (
            <Col md={3} className="mt-3" key={i}>
              <Product product={product} handleAddToCart={handleAddToCart} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Products;
