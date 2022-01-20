import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const CartItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {
  return (
    <Card style={{ width: "16rem" }}>
      <Card.Img variant="top" src={item.image.url} className="p-2" />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text> {item.line_total.formatted_with_symbol}</Card.Text>
      </Card.Body>

      <Row>
        <Col>
          <div className="d-flex ms-2">
            <Button
              variant="outline-secondary"
              onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
            >
              -
            </Button>
            <h3 className="ms-1 me-1">{item.quantity}</h3>
            <Button
              variant="outline-secondary"
              onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </div>
        </Col>
        <Col>
          <Button
            variant="outline-danger"
            onClick={() => handleRemoveFromCart(item.id)}
          >
            Remove
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default CartItem;
