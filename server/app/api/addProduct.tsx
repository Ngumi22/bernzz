"use server";

import { revalidatePath } from "next/cache";
import mysql from "mysql2/promise";
import { z } from "zod";

async function connectToDatabase() {
  const sql = await mysql.createPool({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  return sql;
}

export async function addProduct(
  state: { message: string },
  formData: Record<string, any>
) {
  console.log("Form data received:", formData);

  // Use parameterized query to prevent SQL injection
  const sqlInsert =
    "INSERT INTO products (productName, price, quantity) VALUES (?, ?, 1)";
  const sqlUpdate =
    "UPDATE products SET quantity = quantity + 1 WHERE productName = ? AND price = ?";

  try {
    const pool = await connectToDatabase();
    const connection = await pool.getConnection();

    // Validate user input to prevent SQL injection
    const productName = formData.productName;
    const price = parseFloat(formData.price);

    // Validate price input format
    const priceRegex = /^\d+(\.\d+)?$/;
    if (!priceRegex.test(formData.price)) {
      return { message: "Invalid price format. Please enter a valid price." };
    }

    // Validate product name
    const productNameRegex = /^[A-Za-z]+(?:\s+[A-Za-z0-9]+)*$/;
    if (!productNameRegex.test(productName)) {
      return {
        message:
          "Invalid product name. Product name should only contain letters and spaces.",
      };
    }

    // Validate maximum length of product name
    const maxProductNameLength = 100; // Adjust as needed
    if (productName.length > maxProductNameLength) {
      return {
        message: `Product name cannot exceed the maximum length of ${maxProductNameLength} characters.`,
      };
    }

    // Reject input containing SQL injection patterns for product name
    if (
      productName.includes("'") ||
      productName.includes("--") ||
      productName.includes(";") ||
      productName.includes("/*")
    ) {
      return { message: "Invalid input. Failed to create product." };
    }

    // Check if product with same name and price exists
    const [existingProduct] = await connection.query(
      "SELECT * FROM products WHERE productName = ? AND price = ?",
      [productName, price]
    );

    if (Array.isArray(existingProduct) && existingProduct.length > 0) {
      // If product with same name and price exists, update its quantity
      await connection.query(sqlUpdate, [productName, price]);

      revalidatePath("/");
      return {
        message: `Product ${productName} already exists. Quantity updated.`,
      };
    } else {
      // If no matching product exists, insert the new product into the database
      await connection.query(sqlInsert, [productName, price]);

      revalidatePath("/");
      return { message: `Product ${productName} added successfully.` };
    }
  } catch (error) {
    console.error("Error adding product:", error);
    return { message: "Failed to add product. Please try again later." };
  }
}

// Function to delete a product from the database
// Function to delete a product from the database
export async function deleteProduct(productId: number) {
  try {
    const pool = await connectToDatabase();
    const connection = await pool.getConnection();

    // Delete the product from the database using the default "id" column
    const sql = "DELETE FROM products WHERE id = ?";
    await connection.query(sql, [productId]);

    // Release the connection and revalidate the cache
    connection.release();
    revalidatePath("/");

    console.log(`Product with ID ${productId} deleted successfully.`); // Log success message

    return { message: `Product with ID ${productId} deleted successfully.` };
  } catch (error) {
    console.error("Error deleting product:", error); // Log error message
    return { message: "Failed to delete product. Please try again later." };
  }
}

// Function to edit an existing product in the database
export async function editProduct(
  id: number,
  updatedData: Record<string, any>
) {
  try {
    const pool = await connectToDatabase();
    const connection = await pool.getConnection();

    // Validate and extract updated product data
    const { productName, price, quantity } = updatedData;

    // Update the product in the database using the product ID
    const query =
      "UPDATE products SET productName = ?, price = ?, quantity = ? WHERE id = ?";
    await connection.query(query, [productName, price, quantity, id]);

    // Release the connection and revalidate the cache
    connection.release();
    revalidatePath("/");

    return { message: `Product with ID ${id} updated successfully.` };
  } catch (error) {
    console.error("Error editing product:", error);
    return { message: "Failed to edit product. Please try again later." };
  }
}
