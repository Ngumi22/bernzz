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
import { addProduct, getAllCategories } from "@/app/api/addProduct"; // make sure this path is correct

const initialState = {
  message: "",
};

interface Category {
  id: number;
  name: string;
}

export default function AddForm() {
  const { register, handleSubmit, reset } = useForm();
  const [state, setState] = useState(initialState);
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories();
        setCategories(result);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleProductSubmit = async (formData: any) => {
    try {
      const result = await addProduct(formData);
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
          onSubmit={handleSubmit(handleProductSubmit)}
          className="space-y-8">
          {[
            {
              label: "Category",
              id: "category_id",
              type: "select",
              options: categories,
            },
            { label: "SKU", id: "sku" },
            { label: "Name", id: "name" },
            { label: "Description", id: "description" },
            { label: "Price", id: "price" },
            { label: "Quantity", id: "quantity" },
            { label: "Taxable", id: "taxable" },
            { label: "Product Status ID", id: "product_status_id" },
            { label: "Discount Percentage", id: "discount_percentage" },
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
            { label: "WiFi", id: "WiFi" },
            { label: "Copying", id: "Copying" },
            { label: "Scanning", id: "Scanning" },
            { label: "Paper Handling", id: "PaperHandling" },
            { label: "Consumables", id: "Consumables" },
            { label: "Printer Software", id: "PrinterSoftware" },
            { label: "Network Protocol", id: "NetworkProtocol" },
            { label: "Interface", id: "Interface" },
            { label: "Network Compatibility", id: "NetworkCompatibility" },
            { label: "SIM Card Slot", id: "SIMCardSlot" },
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
                            {option.name}
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
