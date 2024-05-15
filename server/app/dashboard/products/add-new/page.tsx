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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addCategory,
  addProduct,
  getAllCategories,
} from "@/app/api/addProduct";

const initialState = {
  message: "",
};

export default function AddForm() {
  const { register, handleSubmit, reset } = useForm();
  const [state, setState] = useState(initialState);
  const [categoryState, setCategoryState] = useState(initialState);
  const form = useForm();

  const [category, setCategories] = useState<any>([]);

  useEffect(() => {
    handlegetAllCategories();
  }, []);

  const handlegetAllCategories = async () => {
    try {
      const result = await getAllCategories();
      setCategories(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategorySubmit = async (formData: any) => {
    try {
      const result = await addCategory(formData.categoryName);
      setCategoryState({ message: result.message });
      reset();
    } catch (error) {
      setCategoryState({ message: "Failed to add Category" });
    }
  };

  const handleProductSubmit = async (formData: any, state: any) => {
    try {
      const result = await addProduct(formData, state);
      setState({ message: result.message });
      reset();
    } catch (error) {
      setState({ message: "Failed to add product" });
    }
  };

  return (
    <section className="container my-8">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleCategorySubmit)}
          className="space-y-8">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              {...register("categoryName")}
              id="categoryName"
              type="text"
            />
          </div>
          <p>{categoryState.message}</p>
          <Button type="submit">Add Category</Button>
        </form>
      </Form>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleProductSubmit)}
          className="space-y-8">
          {[
            {
              label: "Category",
              id: "categoryId",
              type: "select",
              options: category.map((cat: any) => ({
                id: cat.id,
                label: cat.category_name,
              })),
            },
            { label: "SKU", id: "sku" },
            { label: "Name", id: "name" },
            { label: "Description", id: "description" },
            { label: "Price", id: "price", type: "number" },
            { label: "Quantity", id: "quantity", type: "number" },
            {
              label: "Taxable",
              id: "taxable",
              type: "select",
              options: [
                { id: "yes", label: "Yes" },
                { id: "no", label: "No" },
              ],
            },
            {
              label: "Product Status",
              id: "product_status",
              type: "select",
              options: [
                { id: "Active", label: "Active" },
                { id: " Draft", label: "Draft" },
                { id: "Archived", label: "Archived" },
              ],
            },
            { label: "Image", id: "main_image", type: "file" },
            { label: "Thumbnail 1", id: "thumbnail1", type: "file" },
            { label: "Thumbnail 2", id: "thumbnail2", type: "file" },
            { label: "Thumbnail 3", id: "thumbnail3", type: "file" },
            { label: "Thumbnail 4", id: "thumbnail4", type: "file" },
            { label: "Thumbnail 5", id: "thumbnail5", type: "file" },
            {
              label: "Discount Percentage",
              id: "discount_percentage",
              type: "number",
            },
            { label: "CPU", id: "CPU" },
            { label: "RAM", id: "RAM" },
            { label: "Storage", id: "Storage" },
            { label: "Ports", id: "Ports" },
            { label: "Webcam", id: "Webcam" },
            { label: "Connectivity", id: "Connectivity" },
            { label: "Processor", id: "Processor" },
            { label: "Operating System", id: "OperatingSystem" },
            { label: "Weight", id: "Weight" },
            { label: "Screen Size", id: "ScreenSize" },
            { label: "Camera Resolution", id: "CameraResolution" },
            { label: "Battery Life", id: "BatteryLife" },
            { label: "Print Speed", id: "PrintSpeed" },
            {
              label: "WiFi",
              id: "WiFi",
              type: "select",
              options: [
                { id: "yes", label: "Yes" },
                { id: "no", label: "No" },
              ],
            },
            { label: "Copying", id: "Copying" },
            { label: "Scanning", id: "Scanning" },
            { label: "Paper Handling", id: "PaperHandling" },
            { label: "Consumables", id: "Consumables" },
            { label: "Printer Software", id: "PrinterSoftware" },
            { label: "Network Protocol", id: "NetworkProtocol" },
            { label: "Interface", id: "Interface" },
            { label: "Network Compatibility", id: "NetworkCompatibility" },
            {
              label: "SIM Card Slot",
              id: "SIMCardSlot",
              type: "select",
              options: [
                { id: "yes", label: "Yes" },
                { id: "no", label: "No" },
              ],
            },
            { label: "Wireless Connectivity", id: "WirelessConnectivity" },
            {
              label: "Max Devices Connected",
              id: "MaxDevicesConnected",
              type: "number",
            },
            { label: "Battery", id: "Battery" },
            { label: "Security", id: "Security" },
            { label: "Display", id: "Display" },
            { label: "Access Control", id: "AccessControl" },
            { label: "Compatibility", id: "Compatibility" },
            { label: "Viewable Image Area", id: "ViewableImageArea" },
            { label: "Aspect Ratio", id: "AspectRatio" },
            { label: "Contrast", id: "Contrast" },
            { label: "Resolution", id: "Resolution" },
            { label: "Cores", id: "Cores", type: "number" },
            { label: "Processor Frequency", id: "ProcessorFrequency" },
            { label: "Memory", id: "Memory" },
            { label: "Graphics", id: "Graphics" },
            { label: "Power Supply", id: "PowerSupply" },
            { label: "Dimensions", id: "Dimensions" },
          ].map(({ label, id, type, options }) => (
            <div key={id} className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor={id}>{label}</Label>
              {type === "select" ? (
                <Select {...register(id)}>
                  <SelectTrigger className="w-auto">
                    <SelectValue placeholder={`Select ${label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {options &&
                        options.map((option: any) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.label}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <Input {...register(id)} id={id} type={type} />
              )}
            </div>
          ))}
          <p>{state.message}</p>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
}
