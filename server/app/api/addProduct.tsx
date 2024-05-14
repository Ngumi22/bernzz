"use server";

import { revalidatePath } from "next/cache";
import mysql from "mysql2/promise";

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

async function executeQuery<
  T extends [mysql.RowDataPacket[], mysql.ResultSetHeader]
>(query: string, params: any[]): Promise<T> {
  const pool = await connectToDatabase();
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.query<T>(query, params);
    return results;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("An unexpected error occurred. Please try again later.");
  } finally {
    connection.release();
  }
}

export async function getAllProducts() {
  return executeQuery("SELECT * FROM products", []);
}

export async function getAllCategories(): Promise<
  { id: number; name: string }[]
> {
  try {
    const pool = await connectToDatabase();
    const connection = await pool.getConnection();
    const [categories] = await connection.query<mysql.RowDataPacket[]>(
      "SELECT id, name FROM categories"
    );
    connection.release();
    return categories as { id: number; name: string }[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// Function to add a category
export async function addCategory(categoryName: string) {
  if (!/^[a-zA-Z]{3,}$/.test(categoryName)) {
    return {
      message:
        "Category name must contain at least 3 letters and only letters.",
    };
  }

  const existingCategory = await executeQuery(
    "SELECT * FROM categories WHERE name = ?",
    [categoryName]
  );

  if (existingCategory.length > 0) {
    return { message: `Category "${categoryName}" already exists.` };
  }

  await executeQuery("INSERT INTO categories (name) VALUES (?)", [
    categoryName,
  ]);
  return { message: `Category "${categoryName}" added successfully.` };
}

export async function addProduct(
  productData: any
): Promise<{ message: string }> {
  try {
    const pool = await connectToDatabase();
    const connection = await pool.getConnection();

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
    } = productData;

    const [existingProduct] = await connection.query<mysql.RowDataPacket[]>(
      "SELECT * FROM products WHERE sku = ?",
      [sku]
    );

    if (existingProduct.length > 0) {
      await connection.query(
        "UPDATE products SET quantity = quantity + ? WHERE sku = ?",
        [quantity, sku]
      );
      connection.release();
      return {
        message: `Product with SKU ${sku} already exists. Quantity updated.`,
      };
    } else {
      const sql = `INSERT INTO products (
        category_id,
        sku,
        name,
        description,
        price,
        quantity,
        taxable,
        product_status_id,
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
      ) VALUES (
        ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
      )`;

      await connection.query(sql, [
        category_id,
        sku,
        name,
        description,
        price,
        quantity,
        taxable,
        product_status_id,
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
        new Date(),
        new Date(),
      ]);
      connection.release();
      return { message: `Product with SKU ${sku} added successfully.` };
    }
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product.");
  }
}

// Function to associate a product with a category
export async function associateProductWithCategory(
  productId: number,
  categoryId: number
) {
  await executeQuery(
    "INSERT INTO product_categories (product_id, category_id) VALUES (?,?)",
    [productId, categoryId]
  );
  return {
    message: `Product with ID ${productId} associated with category ID ${categoryId} successfully.`,
  };
}

// Function to add a tag to a product
export async function addTagToProduct(productId: number, tagName: string) {
  await executeQuery(
    "INSERT INTO product_tags (product_id, tag_name) VALUES (?,?)",
    [productId, tagName]
  );
  return {
    message: `Tag "${tagName}" added to product ID ${productId} successfully.`,
  };
}

// Function to delete a product
export async function deleteProduct(productId: number) {
  await executeQuery("DELETE FROM products WHERE productId = ?", [productId]);
  revalidatePath("/");
  return { message: `Product with ID ${productId} deleted successfully.` };
}

// Function to edit a product
export async function editProduct(
  productId: number,
  updatedData: Record<string, any>
) {
  const { productName, price, quantity } = updatedData;
  await executeQuery(
    "UPDATE products SET productName = ?, price = ?, quantity = ? WHERE productId = ?",
    [productName, price, quantity, productId]
  );
  revalidatePath("/");
  return { message: `Product with ID ${productId} updated successfully.` };
}

export async function getCategoryById(
  categoryId: number
): Promise<{ id: number; name: string } | null> {
  try {
    const pool = await connectToDatabase();
    const connection = await pool.getConnection();
    const [categories] = await connection.query<mysql.RowDataPacket[]>(
      "SELECT id, name FROM categories WHERE id = ?",
      [categoryId]
    );
    connection.release();
    if (categories.length > 0) {
      return categories[0] as { id: number; name: string };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    throw new Error("Failed to fetch category by ID.");
  }
}
