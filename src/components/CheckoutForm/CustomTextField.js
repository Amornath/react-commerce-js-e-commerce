import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import { Col } from "react-bootstrap";

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  const isError = false;

  return (
    <Col>
      <Controller
        type="text"
        name={name}
        control={control}
        label={label}
        fullWidth
        required={required}
        error={isError}
      />
    </Col>
  );
}

export default FormInput;
