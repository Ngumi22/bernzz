"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, RefCallBack } from "react-hook-form";
import { boolean, string, z } from "zod";
import { useToast } from "@/components/ui/use-toast";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface IFormInput {
  productname: string;
  description: string;
  category: string;
  brand: string;
  stock: string;
  discount: number;
  image: string;
  price: number;
  sku: string;
  status: string;
  CPU: string;
  RAM: string;
  Storage: string;
  Ports: string;
  Webcam: string;
  Connectivity: string;
  Processor: string;
  OperatingSystem: string;
  Weight: string;
  ScreenSize: string;
  CameraResolution: string;
  BatteryLife: string;
  PrintSpeed: string;
  WiFi: string;
  Copying: string;
  Scanning: string;
  PaperHandling: string;
  Consumables: string;
  PrinterSoftware: string;
  NetworkProtocol: string;
  Interface: string;
  NetworkCompatibility: string;
  SIMCardSlot: string;
  WirelessConnectivity: string;
  MaxDevicesConnected: string;
  Battery: string;
  Security: string;
  Display: string;
  AccessControl: string;
  Compatibility: string;
  ViewableImageArea: string;
  AspectRatio: string;
  Contrast: string;
  Resolution: string;
  Cores: string;
  ProcessorFrequency: string;
  Memory: string;
  Graphics: string;
  PowerSupply: string;
  Dimensions: string;
}

const categoryFieldOptions: { [key: string]: string[] } = {
  laptops: [
    "CPU",
    "RAM",
    "Storage",
    "ScreenSize",
    "BatteryLife",
    "Ports",
    "Webcam",
    "Connectivity",
    "Processor",
    "OperatingSystem",
    "Weight",
  ],
  phones: ["Screen Size", "Camera Resolution", "Battery Life"],
  printers: [
    "Print speeds",
    "Wi-Fi & Wi-Fi Direct",
    "Copying",
    "Scanning",
    "Paper Handling",
    "Consumables",
    "Printer Software",
    "Network Protocol",
    "Interface",
  ],
  networking: [
    "Network Compatibility",
    "SIM Card Slot",
    "Wireless Connectivity",
    "Max Devices Connected",
    "Battery",
    "Security",
    "Display",
    "Access Control",
    "Compatibility",
  ],
  monitor: [
    "Viewable image area",
    "Aspect ratio",
    "Contrast",
    "Resolution",
    "Connectivity",
  ],
  desktop: [
    "Processor",
    "Cores",
    "Processor Frequency",
    "Memory",
    "Storage",
    "Operating System",
    "Graphics",
    "Power Supply",
    "Dimensions",
    "Weight",
  ],
  accessories: [
    "Processor",
    "Cores",
    "Processor Frequency",
    "Memory",
    "Storage",
    "Operating System",
    "Graphics",
    "Power Supply",
    "Dimensions",
    "Weight",
  ],
};

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const FormSchema = z.object({
  productname: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1, "Must be 1 and above"),
  file: fileSchema.refine((file) => file.size > 0, "Required"),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
  thumbnail1: imageSchema.refine((file) => file.size > 0, "Required"),
  thumbnail2: imageSchema.refine((file) => file.size > 0, "Required"),
  thumbnail3: imageSchema.refine((file) => file.size > 0, "Required"),
  thumbnail4: imageSchema.refine((file) => file.size > 0, "Required"),
  sku: z.string().min(2, {
    message: "Sku must be at least 2 characters.",
  }),
  category: z.string(),
  status: z.string(),
  brand: z.string(),
  stock: z.number().min(1, "Must be 1 and above"),
  discount: z.number().min(0, "Must be 0 and above"),
});

export default function AddProduct() {
  const { toast } = useToast();
  const [additionalFields, setAdditionalFields] = useState<string[]>([]);

  const form = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      productname: "",
      description: "",
      price: 1,
      sku: "",
      category: "",
      status: "",
      brand: "",
      discount: 0,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
  };

  const handleCategoryChange = (category: string) => {
    setAdditionalFields(categoryFieldOptions[category] || []);
  };
  return (
    <section className="container">
      <div>
        <p className="text-3xl">Add Product</p>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="productname"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sku"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Sku</FormLabel>
                  <FormControl>
                    <Input placeholder="Sku" {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                min={1}
                id="price"
                name="price"
                required
                placeholder="0"
              />
              <div className="text-muted-foreground"></div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">stock</Label>
              <Input
                type="number"
                min={1}
                id="stock"
                name="stock"
                required
                placeholder="0"
              />
              <div className="text-muted-foreground"></div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount</Label>
              <Input
                type="number"
                id="discount"
                min={0}
                name="discount"
                required
                placeholder="0"
              />
              <div className="text-muted-foreground"></div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input type="file" id="image" name="image" required />
            </div>

            <div>
              <h2 className="mb-6 font-semibold">Thumbails</h2>
              <div className="flex items-center gap-x-8">
                <div className="space-y-2">
                  <Label htmlFor="thumbnail1">Thumbnail 1</Label>
                  <Input
                    type="file"
                    id="thumbnail1"
                    name="thumbnail1"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail2">Thumbnail 2</Label>
                  <Input
                    type="file"
                    id="thumbnail2"
                    name="thumbnail2"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail3">Thumbnail 3</Label>
                  <Input
                    type="file"
                    id="thumbnail3"
                    name="thumbnail3"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail4">Thumbnail 4</Label>
                  <Input
                    type="file"
                    id="thumbnail4"
                    name="thumbnail4"
                    required
                  />
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product description..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            {/* Other form fields */}
            <FormField
              control={form.control}
              name="category"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleCategoryChange(value);
                    }}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="laptops">Laptops</SelectItem>
                      <SelectItem value="phones">Phones</SelectItem>
                      <SelectItem value="monitor">monitor</SelectItem>
                      <SelectItem value="computer">computer</SelectItem>
                      <SelectItem value="desktop">desktop</SelectItem>
                      <SelectItem value="networking">networking</SelectItem>
                      <SelectItem value="printers">printers</SelectItem>
                      <SelectItem value="accessories">accessories</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            {/* Render additional fields based on selected category */}
            {additionalFields.map((fieldName, index) => (
              <FormField
                key={index}
                control={form.control}
                name={fieldName as keyof IFormInput}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>{fieldName}</FormLabel>
                    <FormControl>
                      <Input placeholder={fieldName} {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
