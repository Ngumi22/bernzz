"use server";
import { revalidatePath } from "next/cache";
import mysql, { RowDataPacket } from "mysql2/promise";

import { ProductData } from "@/lib/definitions";

// Function to connect to the database
async function connectToDatabase() {
  return await mysql.createPool({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

async function executeQuery<T>(
  query: string,
  params: any[]
): Promise<T | null> {
  const pool = await connectToDatabase();
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.query(query, params);
    return results as T;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("An unexpected error occurred. Please try again later.");
  } finally {
    connection.release();
  }
}

export async function getAllProducts() {
  const products = await executeQuery("SELECT * FROM products", []);
  return products;
}

export async function getAllCategories() {
  const categories = await executeQuery("SELECT * FROM categories", []);
  return categories;
}

// Function to add a category
export async function addCategory(categoryName: string) {
  if (!/^[a-zA-Z\s]{3,}$/.test(categoryName)) {
    return {
      message:
        "Category name must contain at least 3 letters and only letters.",
    };
  }

  const existingCategory = await executeQuery<RowDataPacket[]>(
    "SELECT * FROM categories WHERE category_name = ?",
    [categoryName]
  );

  if (existingCategory && existingCategory.length > 0) {
    return { message: `Category "${categoryName}" already exists.` };
  }

  await executeQuery("INSERT INTO categories (category_name) VALUES (?)", [
    categoryName,
  ]);
  return { message: `Category "${categoryName}" added successfully.` };
}

export async function addProduct(
  productData: ProductData,
  state: { message: string }
) {
  const {
    sku,
    name,
    description,
    product_status_id,
    price,
    discount_percentage,
    category_id,
    quantity,
    taxable,
    status,
    tags,
    CPU,
    RAM,
    Storage,
    Ports,
    Webcam,
    Connectivity,
    Processor,
    OperatingSystem,
    Weight,
    ScreenSize,
    CameraResolution,
    BatteryLife,
    PrintSpeed,
    WiFi,
    Copying,
    Scanning,
    PaperHandling,
    Consumables,
    PrinterSoftware,
    NetworkProtocol,
    Interface,
    NetworkCompatibility,
    SIMCardSlot,
    WirelessConnectivity,
    MaxDevicesConnected,
    Battery,
    Security,
    Display,
    AccessControl,
    Compatibility,
    ViewableImageArea,
    AspectRatio,
    Contrast,
    Resolution,
    Cores,
    ProcessorFrequency,
    Memory,
    Graphics,
    PowerSupply,
    Dimensions,
    main_image,
    thumbnail1,
    thumbnail2,
    thumbnail3,
    thumbnail4,
    thumbnail5,
  } = productData;

  try {
    const pool = await connectToDatabase();
    const connection = await pool.getConnection();

    const [existingProduct] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM products WHERE sku = ?",
      [sku]
    );

    if (existingProduct && existingProduct.length > 0) {
      await connection.query(
        "UPDATE products SET quantity = quantity + ? WHERE sku = ?",
        [quantity, sku]
      );
      connection.release();
      return {
        message: `Product with SKU ${sku} already exists. Quantity updated.`,
      };
    } else {
      const productInsertResult = await connection.query<any>(
        `INSERT INTO products (
          category_id,
          sku,
          name,
          description,
          price,
          quantity,
          taxable,
          product_status,
          tags,
          discount_percentage,
          CPU,
          RAM,
          Storage,
          Ports,
          Webcam,
          Connectivity,
          Processor,
          OperatingSystem,
          Weight,
          ScreenSize,
          CameraResolution,
          BatteryLife,
          PrintSpeed,
          WiFi,
          Copying,
          Scanning,
          PaperHandling,
          Consumables,
          PrinterSoftware,
          NetworkProtocol,
          Interface,
          NetworkCompatibility,
          SIMCardSlot,
          WirelessConnectivity,
          MaxDevicesConnected,
          Battery,
          Security,
          Display,
          AccessControl,
          Compatibility,
          ViewableImageArea,
          AspectRatio,
          Contrast,
          Resolution,
          Cores,
          ProcessorFrequency,
          Memory,
          Graphics,
          PowerSupply,
          Dimensions,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          category_id,
          sku,
          name,
          description,
          price,
          quantity,
          taxable,
          product_status_id,
          tags,
          discount_percentage,
          CPU,
          RAM,
          Storage,
          Ports,
          Webcam,
          Connectivity,
          Processor,
          OperatingSystem,
          Weight,
          ScreenSize,
          CameraResolution,
          BatteryLife,
          PrintSpeed,
          WiFi,
          Copying,
          Scanning,
          PaperHandling,
          Consumables,
          PrinterSoftware,
          NetworkProtocol,
          Interface,
          NetworkCompatibility,
          SIMCardSlot,
          WirelessConnectivity,
          MaxDevicesConnected,
          Battery,
          Security,
          Display,
          AccessControl,
          Compatibility,
          ViewableImageArea,
          AspectRatio,
          Contrast,
          Resolution,
          Cores,
          ProcessorFrequency,
          Memory,
          Graphics,
          PowerSupply,
          Dimensions,
        ]
      );

      const productId = productInsertResult[0].insertId;

      await connection.query(
        `INSERT INTO product_images (
          product_id,
          main_image,
          thumbnail1,
          thumbnail2,
          thumbnail3,
          thumbnail4,
          thumbnail5
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          productId,
          main_image,
          thumbnail1,
          thumbnail2,
          thumbnail3,
          thumbnail4,
          thumbnail5,
        ]
      );

      connection.release();
      return { message: `Product with SKU ${sku} added successfully.` };
    }
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product.ss");
  }
}

// Function to delete a product
export async function deleteProduct(productId: number) {
  await executeQuery("DELETE FROM product_images WHERE product_id = ?", [
    productId,
  ]);
  await executeQuery("DELETE FROM products WHERE id = ?", [productId]);
  revalidatePath("/");
  return { message: `Product with ID ${productId} deleted successfully.` };
}

// Function to edit a product
export async function editProduct(
  productId: number,
  updatedData: Partial<ProductData>
) {
  const { name, price, quantity, status, tags } = updatedData;

  await executeQuery(
    "UPDATE products SET name = ?, price = ?, quantity = ?, status = ?, tags = ?, updated_at = NOW() WHERE id = ?",
    [name, price, quantity, status, tags, productId]
  );

  revalidatePath("/");
  return { message: `Product with ID ${productId} updated successfully.` };
}

export async function getCategoryById(categoryId: number) {
  const categories = await executeQuery<any>(
    "SELECT id, name FROM categories WHERE id = ?",
    [categoryId]
  );
  if (categories && categories.length > 0) {
    return categories[0] as { id: number; name: string };
  } else {
    return null;
  }
}
