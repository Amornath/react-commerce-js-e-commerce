import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { commerce } from "../../../lib/commerce";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { Card, Row, Button } from "react-bootstrap";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, onCaptureCheckout, order, error, refreshCart }) => {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });

          setCheckoutToken(token);
        } catch {
          if (activeStep !== steps.length);
        }
      };

      generateToken();
    }
  }, [cart]);

  const test = (data) => {
    setShippingData(data);

    nextStep();
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <h5>
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}!
          </h5>

          <h3>Order ref: {order.customer_reference}</h3>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    ) : (
      <div>
        <h4>Please fill form</h4>
      </div>
    );

  if (error) {
    Confirmation = () => (
      <>
        <h4>Thank you for your purchase</h4> <br />
        <a href="/" style={{ textDecoration: "none" }}>
          {" "}
          <h4>Back to home</h4>
        </a>
      </>
    );
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        setShippingData={setShippingData}
        test={test}
      />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
        onCaptureCheckout={onCaptureCheckout}
        refreshCart={refreshCart}
      />
    );

  return (
    <>
      <div />
      <Row>
        <Card>
          <h3>Checkout</h3>

          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Card>
      </Row>
    </>
  );
};

export default Checkout;
