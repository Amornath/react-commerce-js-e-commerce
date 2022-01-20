import Commerce from "@chec/commerce.js";

export const commerce = new Commerce(
  // "pk_383900b782977f07d64805f544835e22e7c7a07ef0f2a",
  process.env.REACT_APP_CHEC_PUBLIC_KEY,
  true
);
