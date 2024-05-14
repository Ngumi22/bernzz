"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addProduct,
  addCategory,
  addTagToProduct,
  getAllCategories,
} from "@/app/api/addProduct";

const initialState = {
  message: "",
};

export default function AddForm() {
  const form = useForm();
  const { register, handleSubmit, reset } = useForm();
  const [state, setState] = useState(initialState);

  const handleCategorySubmit = async (formData: any) => {
    try {
      const result = await addCategory(formData.category);
      setState({ message: result.message });
      reset();
    } catch (error) {
      setState({ message: "Failed to add category" });
    }
  };

  const handleProductSubmit = async (formData: any) => {
    try {
      const result = await addProduct(state, formData);
      setState({ message: result.message });
      reset();
    } catch (error) {
      setState({ message: "Failed to add product" });
    }
  };

  const [categories, setCategories] = useState([]); // Initialize with an empty array

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  const handleGetAllCategories = async () => {
    try {
      const result = await getAllCategories();
      setCategories(result); // Assuming result is an array of categories
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="container my-8">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleCategorySubmit)}
          className="space-y-8 my-16"
        >
          <p>Create Category</p>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="category">Category</Label>
            <Input {...register("category")} id="category" type="text" />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <div>
        <Select>
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleProductSubmit)}
          className="space-y-8"
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="sku">SKU</Label>
            <Input {...register("sku")} id="sku" type="text" />
          </div>

          <p>{state.message}</p>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
}
