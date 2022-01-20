import { Row, Col, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./cartitem/CartItem";

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  let navigate = useNavigate();
  if (!cart.line_items) return "Loading";

  const renderCart = () => {
    return (
      <div>
        <Row>
          {cart.line_items.map((item, i) => {
            console.log(item);
            return (
              <Col md={4} className="mt-3" key={i}>
                <CartItem
                  item={item}
                  handleUpdateCartQty={handleUpdateCartQty}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              </Col>
            );
          })}
        </Row>
        <Row className="mt-2 mb-3">
          <Col></Col>
          <Col>
            <h5>Subtotal: {cart.subtotal.formatted_with_symbol}</h5>
          </Col>
          <Col>
            <Button variant="outline-danger" onClick={handleEmptyCart}>
              Empty cart
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </div>
    );
  };

  const renderEmptyCart = () => {
    return (
      <h2>
        You have no items in your shopping cart,
        <Link to="/">start adding some</Link>!
      </h2>
    );
  };

  return (
    <Container>
      <div />
      <h3>Your Shopping Cart</h3>
      {!cart.line_items.length ? renderEmptyCart() : renderCart()}
    </Container>
  );
};

export default Cart;
