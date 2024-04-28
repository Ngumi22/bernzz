"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addProduct } from "@/app/api/addProduct";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}

export default function AddForm() {
  const [state, formAction] = useFormState(addProduct, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="productName">Product Name</label>
      <input type="text" id="productName" name="productName" required />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" name="price" required />

      <SubmitButton />

      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
