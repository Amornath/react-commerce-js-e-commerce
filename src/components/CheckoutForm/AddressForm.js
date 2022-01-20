import React, { useState, useEffect } from "react";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { commerce } from "../../lib/commerce";

import { Container, Row, Button, Form, Col } from "react-bootstrap";

const AddressForm = ({ checkoutToken, test }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  const onSubmit = (data) =>
    test({
      ...data,
      shippingCountry,
      shippingSubdivision,
      shippingOption,
    });

  return (
    <>
      <h2>Shipping address</h2>

      <FormProvider>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container className="ps-5 pt-5 pr-5">
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control required {...register("firstName")} />
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control {...register("lastName", { required: true })} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control {...register("address1", { required: true })} />
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control {...register("email", { required: true })} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control {...register("city", { required: true })} />
              </Form.Group>

              <Form.Group as={Col} className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control {...register("zip", { required: true })} />
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Shipping Country</Form.Label>
                  <Form.Select
                    value={shippingCountry}
                    fullWidth
                    onChange={(e) => setShippingCountry(e.target.value)}
                  >
                    {Object.entries(shippingCountries)
                      .map(([code, name]) => ({ id: code, label: name }))
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">
                    Shipping Subdivision
                  </Form.Label>
                  <Form.Select
                    value={shippingSubdivision}
                    fullWidth
                    onChange={(e) => setShippingSubdivision(e.target.value)}
                  >
                    {Object.entries(shippingSubdivisions)
                      .map(([code, name]) => ({ id: code, label: name }))
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group as={Col} md={6} className="mb-3">
                <Form.Label>Shipping Options</Form.Label>
                <Form.Select
                  value={shippingOption}
                  fullWidth
                  onChange={(e) => setShippingOption(e.target.value)}
                >
                  {shippingOptions
                    .map((sO) => ({
                      id: sO.id,
                      label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                    }))
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Row>
          </Container>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "50px",
              marginRight: "30px",
              marginBottom: "50px",
            }}
          >
            <Button variant="outline-primary" onClick={() => navigate("/cart")}>
              Back to Cart
            </Button>
            <Button type="submit" variant="outline-primary">
              Go to Next
            </Button>
          </div>
        </Form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
