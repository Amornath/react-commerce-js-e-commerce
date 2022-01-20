import { Button, Card } from "react-bootstrap";
const Product = ({ product, handleAddToCart }) => {
  console.log(product);
  let myHTML = product.description;
  let strippedHtml = myHTML.replace(/<[^>]+>/g, "");
  return (
    <Card style={{ width: "16rem" }}>
      <Card.Img
        variant="top"
        src={product.image.url}
        style={{ height: "23rem" }}
        className="p-2"
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{strippedHtml}</Card.Text>
        <Button
          variant="outline-secondary"
          onClick={() => handleAddToCart(product.id, 1)}
        >
          AddToCart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
