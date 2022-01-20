import React from "react";

import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";
import { Button } from "react-bootstrap";

const stripePromise = loadStripe(
  "pk_test_51KIx3SIQbwpD8gifd9BdpSKfEDtFXCyt3ztnRvgdBUXDHyUmzi385c1HqHJRQN9hjNEp5sXZUO7Vjpe9y35DLg7Q00S5Tqs3GI"
);

const PaymentForm = ({
  checkoutToken,
  nextStep,
  backStep,
  shippingData,
  onCaptureCheckout,
  refreshCart,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    refreshCart();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    // });

    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: "International",
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.shippingSubdivision,

        country: shippingData.shippingCountry,
      },
      // fulfillment: { shipping_method: shippingData.shippingOption },
      //   payment: {
      //     gateway: "stripe",
      //     stripe: {
      //       payment_method_id: paymentMethod.id,
      //     },
      //   },
    };

    onCaptureCheckout(checkoutToken.id, orderData);

    nextStep();
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <hr></hr>

      <h3>Payment method</h3>

      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="primary" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!stripe}
                  //   onClick={() => {
                  //     refreshCart();
                  //     nextStep();
                  //   }}
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
