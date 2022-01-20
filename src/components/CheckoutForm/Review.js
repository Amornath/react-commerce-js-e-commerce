import React from "react";

import { Col, Container, Row } from "react-bootstrap";

const Review = ({ checkoutToken }) => (
  <>
    <h3>Order summary</h3>
    <Container>
      {checkoutToken.live.line_items.map((product) => (
        <Row style={{ padding: "10px 0" }} key={product.name}>
          <Col></Col>
          <Col>
            <h5>{product.name}</h5>
            <h5>{`Quantity: ${product.quantity}`}</h5>
          </Col>
          <Col>
            <p>{product.line_total.formatted_with_symbol}</p>
          </Col>
          <Col></Col>
        </Row>
      ))}
      <div>
        <h5>
          Grand Total: {checkoutToken.live.subtotal.formatted_with_symbol}
        </h5>
      </div>
    </Container>
  </>
);

export default Review;
