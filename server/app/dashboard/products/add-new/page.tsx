"use client";

import { useState } from "react";
import { addProduct } from "@/app/api/addProduct";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState = {
  message: "",
};

export default function AddForm() {
  const form = useForm();
  const [state, setState] = useState(initialState);

  const handleSubmit = async (formData) => {
    try {
      const result = await addProduct(state, formData);
      setState({ message: result.message });
    } catch (error) {
      console.error("Error adding product:", error);
      setState({ message: "Failed to add product" });
    }
  };

  return (
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
        <p>{state.message}</p>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
