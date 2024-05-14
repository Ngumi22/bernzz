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

export async function getAllProducts() {
  try {
    const pool = await connectToDatabase();
    const connection = await pool.getConnection();

    const [products] = await connection.query("SELECT * FROM products");
    connection.release();

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getAllCategories() {
  try {
    const pool = await connectToDatabase();
    const connection = await pool.getConnection();

    const [categories] = await connection.query("SELECT * FROM categories");
    connection.release();

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// Function to handle generic database errors
async function handleDatabaseError(error: any) {
  console.error("Database error:", error);
  throw new Error("An unexpected error occurred. Please try again later.");
}

// Function to add a category
export async function addCategory(categoryName: string) {
  try {
    // Check if the category name meets the criteria
    if (!/^[a-zA-Z]{3,}$/.test(categoryName)) {
      // If the category name doesn't meet the criteria, return an error message
      return {
        message:
          "Category name must contain at least 3 letters and only letters.",
      };
    }

    const pool = await connectToDatabase();
    const connection = await pool.getConnection();

    // Check if the category already exists
    const [existingCategory] = await connection.query(
      "SELECT * FROM categories WHERE name = ?",
      [categoryName]
    );

    if (Array.isArray(existingCategory) && existingCategory.length > 0) {
      // Category already exists, return an error message
      return { message: `Category "${categoryName}" already exists.` };
    } else {
      // Category does not exist, proceed with insertion
      const sql = "INSERT INTO categories (name) VALUES (?)";
      await connection.query(sql, [categoryName]);
      connection.release();

      return { message: `Category "${categoryName}" added successfully.` };
    }
  } catch (error) {
    await handleDatabaseError(error);
  }
}

// Function to add a product
export async function addProduct(state: { message: string }, formData: any) {
  const sqlInsert =
    "INSERT INTO products (sku, name, description, product_status_id, price, discount_percentage, category_id, quantity, taxable, CPU, RAM, Storage, Ports, Webcam, Connectivity, Processor, OperatingSystem, Weight, ScreenSize, CameraResolution, BatteryLife, PrintSpeed, WiFi, Copying, Scanning, PaperHandling, Consumables, PrinterSoftware, NetworkProtocol, Interface, NetworkCompatibility, SIMCardSlot, WirelessConnectivity, MaxDevicesConnected, Battery, Security, Display, AccessControl, Compatibility, ViewableImageArea, AspectRatio, Contrast, Resolution, Cores, ProcessorFrequency, Memory, Graphics, PowerSupply, Dimensions, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  const sqlUpdate = "UPDATE products SET quantity = quantity + 1 WHERE sku =?";

  const imageFields = [
    "main_image",
    "thumbnail1",
    "thumbnail2",
    "thumbnail3",
    "thumbnail4",
    "thumbnail5",
  ];
  let imagePaths = [];

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
    } = formData;

    for (let field of imageFields) {
      const image = formData[field];
      if (image) {
        const imageType = field === "main_image" ? "main" : "thumbnail";
        const imageData = image[0].buffer;
        // Cast the result to any to bypass TypeScript's type checking temporarily
        const [result] = (await connection.query(
          "INSERT INTO product_images (product_sku, image_type, image_data) VALUES (?,?,?)",
          [sku, imageType, imageData]
        )) as any;
        // Access the insertId from the ResultSetHeader
        const insertId = result[0].insertId;
        imagePaths.push({ [imageType]: insertId });
      }
    }

    const [existingProduct] = await connection.query(
      "SELECT * FROM products WHERE sku =?",
      [sku]
    );

    if (Array.isArray(existingProduct) && existingProduct.length > 0) {
      await connection.query(sqlUpdate, [sku]);
      revalidatePath("/");
      return {
        message: `Product with SKU ${sku} already exists. Quantity updated.`,
      };
    } else {
      await connection.query(sqlInsert, [
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
        new Date(),
        new Date(),
      ]);
      revalidatePath("/");
      return { message: `Product with SKU ${sku} added successfully.` };
    }
  } catch (error) {
    await handleDatabaseError(error);
  }
}

// Function to associate a product with a category
export async function associateProductWithCategory(
  productId: number,
  categoryId: number
) {
  try {
    const pool = await connectToDatabase();
    const connection = await pool.getConnection();

    const sql =
      "INSERT INTO product_categories (product_id, category_id) VALUES (?,?)";
    await connection.query(sql, [productId, categoryId]);
    connection.release();

    return {
      message: `Product with ID ${productId} associated with category ID ${categoryId} successfully.`,
    };
  } catch (error) {
    await handleDatabaseError(error);
  }
}

// Function to add a tag to a product
export async function addTagToProduct(productId: number, tagName: string) {
  try {
    const pool = await connectToDatabase();
    const connection = await pool.getConnection();

    const sql = "INSERT INTO product_tags (product_id, tag_name) VALUES (?,?)";
    await connection.query(sql, [productId, tagName]);
    connection.release();

    return {
      message: `Tag "${tagName}" added to product ID ${productId} successfully.`,
    };
  } catch (error) {
    await handleDatabaseError(error);
  }
}

// Function to delete a product
export async function deleteProduct(productId: number) {
  try {
    const pool = await connectToDatabase();
    const connection = await pool.getConnection();

    const sql = "DELETE FROM products WHERE productId =?";
    await connection.query(sql, [productId]);
    connection.release();
    revalidatePath("/");
    console.log(`Product with ID ${productId} deleted successfully.`);
    return { message: `Product with ID ${productId} deleted successfully.` };
  } catch (error) {
    await handleDatabaseError(error);
  }
}

// Function to edit a product
export async function editProduct(
  productId: number,
  updatedData: Record<string, any>
) {
  try {
    const pool = await connectToDatabase();
    const connection = await pool.getConnection();

    const { productName, price, quantity } = updatedData;

    const query =
      "UPDATE products SET productName =?, price =?, quantity =? WHERE productId =?";
    await connection.query(query, [productName, price, quantity, productId]);
    connection.release();
    revalidatePath("/");
    return { message: `Product with ID ${productId} updated successfully.` };
  } catch (error) {
    await handleDatabaseError(error);
  }
}
