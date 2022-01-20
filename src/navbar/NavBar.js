import { Button, Container, Navbar } from "react-bootstrap";
import { BsFillCartCheckFill } from "react-icons/bs";
import React from "react";
import { useNavigate } from "react-router-dom";
const NavBar = ({ totalItems }) => {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/cart");
  }
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="/">E-commerce</Navbar.Brand>
        <Button variant="light" onClick={handleClick}>
          <BsFillCartCheckFill />
          <span className="badge border border-light rounded-circle bg-danger ">
            {totalItems}
          </span>
        </Button>
      </Container>
    </Navbar>
  );
};

export default NavBar;
