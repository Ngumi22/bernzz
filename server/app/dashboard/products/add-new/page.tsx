"use client";

import { useState } from "react";
import { addProduct } from "@/app/api/addProduct";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState = {
  message: "",
};

export default function AddForm() {
  const form = useForm();

  const [state, setState] = useState(initialState);

  const handleSubmit = async (formData: any) => {
    try {
      const result = await addProduct(state, formData);
      setState({ message: result.message });
    } catch (error) {
      setState({ message: "Failed to add product" });
    }
  };

  return (
    <section className="container my-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              {...form.register("productName")}
              id="productName"
              type="text"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="price">Price</Label>
            <Input {...form.register("price")} id="price" type="number" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="image">Image</Label>
            <Input {...form.register("image")} id="image" type="text" />
          </div>

          <p>{state.message}</p>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
}
