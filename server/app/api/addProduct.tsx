"use server";

import { revalidatePath } from "next/cache";
import mysql from "mysql2/promise";
import { z } from "zod";

async function connectToDatabase() {
  const sql = await mysql.createConnection({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
  });
  return sql;
}

export async function addProduct(
  state: { message: string },
  formData: FormData
) {
  const schema = z.object({
    productName: z.string().min(1),
    price: z.number().min(0),
    // Add more validation rules as needed
  });

  const productName = formData.get("productName");
  const price = formData.get("price");

  if (typeof productName !== "string" || typeof price !== "string") {
    return { message: "Failed to create product" };
  }

  const parse = schema.safeParse({
    productName: productName,
    price: parseFloat(price),
    // Parse other form fields as needed
  });

  if (!parse.success) {
    return { message: "Failed to create product" };
  }

  const data = parse.data;

  try {
    const sql = await connectToDatabase(); // Await the connection

    // Check if the product already exists based on productName and price
    const [existingProduct] = await sql.query(
      "SELECT * FROM products WHERE productName = ? AND price = ?",
      [data.productName, data.price]
    );

    if (Array.isArray(existingProduct) && existingProduct.length > 0) {
      // If product with same name and price exists, update its quantity or take appropriate action
      // For example, you can update the quantity of the existing product instead of inserting a new one
      // For demonstration, let's assume we want to update the quantity here
      await sql.query(
        "UPDATE products SET quantity = quantity + 1 WHERE productName = ? AND price = ?",
        [data.productName, data.price]
      );

      revalidatePath("/");
      return {
        message: `Product ${data.productName} already exists. Quantity updated.`,
      };
    } else {
      // If no matching product exists, insert the new product into the database
      await sql.query(
        "INSERT INTO products (productName, price, quantity) VALUES (?, ?, 1)",
        [data.productName, data.price]
      );

      revalidatePath("/");
      return { message: `Added product ${data.productName}` };
    }
  } catch (e) {
    console.error(e);
    return { message: "Failed to create product" };
  }
}
