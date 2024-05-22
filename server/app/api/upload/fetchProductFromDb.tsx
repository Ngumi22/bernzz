"use server";

import { ImageData, CategoryData, ProductssData } from "@/lib/definitions";
import mysql from "mysql2/promise";

// Create a connection pool
const pool = mysql.createPool({
  host: "127.0.0.1",
  database: "bernzz",
  port: 3306,
  password: "123456",
  user: "root",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Utility function to convert binary data to base64
const convertToBase64 = (buffer: Buffer | null) =>
  buffer ? buffer.toString("base64") : "";

export async function fetchAllProductFromDb(): Promise<ProductssData[]> {
  const connection = await pool.getConnection();
  try {
    const [rows]: any[] = await connection.execute(`
      SELECT
        p.id AS product_id,
        p.name,
        p.sku,
        p.price,
        p.discount,
        p.quantity,
        c.name AS category,
        p.status,
        p.description,
        i.main_image,
        i.thumbnail1,
        i.thumbnail2,
        i.thumbnail3,
        i.thumbnail4,
        i.thumbnail5
      FROM product p
      LEFT JOIN images i ON p.image_id = i.id
      LEFT JOIN categories c ON p.category_id = c.id
    `);

    const products: ProductssData[] = rows.map((row: any) => {
      const thumbnails = [
        row.thumbnail1,
        row.thumbnail2,
        row.thumbnail3,
        row.thumbnail4,
        row.thumbnail5,
      ]
        .filter(Boolean)
        .map(convertToBase64);

      return {
        id: row.product_id,
        sku: row.sku,
        status: row.status,
        category: row.category,
        name: row.name,
        description: row.description,
        price: row.price,
        discount: row.discount,
        quantity: row.quantity,
        images: {
          main: convertToBase64(row.main_image),
          thumbnails,
        },
      };
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function fetchCategoryFromDb(): Promise<CategoryData[]> {
  const connection = await pool.getConnection();
  try {
    const [rows]: any[] = await connection.execute(
      `SELECT id, name FROM categories`
    );

    const categories: CategoryData[] = rows.map((row: any) => ({
      id: row.id,
      name: row.name,
    }));

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function fetchProductByIdFromDb(
  id: number
): Promise<ProductssData | null> {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
  });

  try {
    const [rows]: [any[], any] = await connection.query(
      `
      SELECT
        p.id, p.sku, p.price, p.discount, p.quantity, p.status, p.name, p.description,
        c.name AS category,
        i.main_image, i.thumbnail1, i.thumbnail2, i.thumbnail3, i.thumbnail4, i.thumbnail5
      FROM product p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN images i ON p.image_id = i.id
      WHERE p.id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];

    const product: ProductssData = {
      id: row.id,
      sku: row.sku,
      price: row.price,
      discount: row.discount,
      quantity: row.quantity,
      status: row.status,
      category: row.category,
      name: row.name,
      description: row.description,
      images: {
        main: row.main_image ? row.main_image.toString("base64") : "",
        thumbnails: [
          row.thumbnail1 ? row.thumbnail1.toString("base64") : "",
          row.thumbnail2 ? row.thumbnail2.toString("base64") : "",
          row.thumbnail3 ? row.thumbnail3.toString("base64") : "",
          row.thumbnail4 ? row.thumbnail4.toString("base64") : "",
          row.thumbnail5 ? row.thumbnail5.toString("base64") : "",
        ].filter(Boolean),
      },
    };

    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

export async function fetchProductsByCategoryFromDb(
  categoryId: number
): Promise<ImageData[]> {
  const connection = await pool.getConnection();
  try {
    const [rows]: any[] = await connection.execute(
      `SELECT p.*, i.main_image, i.thumbnail1, i.thumbnail2, i.thumbnail3, i.thumbnail4, i.thumbnail5
       FROM product p
       LEFT JOIN images i ON p.image_id = i.id
       WHERE p.category_id = ?`,
      [categoryId]
    );

    const products: ImageData[] = rows.map((row: any) => ({
      id: row.id,
      main_image: convertToBase64(row.main_image),
      thumbnail1: convertToBase64(row.thumbnail1),
      thumbnail2: convertToBase64(row.thumbnail2),
      thumbnail3: convertToBase64(row.thumbnail3),
      thumbnail4: convertToBase64(row.thumbnail4),
      thumbnail5: convertToBase64(row.thumbnail5),
      productName: row.name,
      productDescription: row.description,
      price: row.price,
      discount: row.discount,
      quantity: row.quantity,
    }));

    return products;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function fetchProductsBySearchFromDb(
  searchQuery: string
): Promise<ImageData[]> {
  const connection = await pool.getConnection();
  try {
    const [rows]: any[] = await connection.execute(
      `SELECT product.*, images.*
       FROM product
       JOIN images ON product.image_id = images.id
       WHERE product.name LIKE ?`,
      [`%${searchQuery}%`]
    );

    const products: ImageData[] = rows.map((row: any) => ({
      id: row.id,
      main_image: convertToBase64(row.main_image),
      thumbnail1: convertToBase64(row.thumbnail1),
      thumbnail2: convertToBase64(row.thumbnail2),
      thumbnail3: convertToBase64(row.thumbnail3),
      thumbnail4: convertToBase64(row.thumbnail4),
      thumbnail5: convertToBase64(row.thumbnail5),
      productName: row.name,
      productDescription: row.description,
    }));

    return products;
  } catch (error) {
    console.error("Error fetching products by search:", error);
    throw error;
  } finally {
    connection.release();
  }
}

export async function fetchProductBySlugFromDb(
  slug: string
): Promise<ImageData | null> {
  const connection = await pool.getConnection();
  try {
    const [rows]: any[] = await connection.execute(
      `SELECT p.*, i.main_image, i.thumbnail1, i.thumbnail2, i.thumbnail3, i.thumbnail4, i.thumbnail5
       FROM product p
       LEFT JOIN images i ON p.image_id = i.id
       WHERE p.slug = ?`,
      [slug]
    );

    if (rows.length === 0) return null; // Product not found

    const row = rows[0];

    const product: ImageData = {
      id: row.id,
      main_image: convertToBase64(row.main_image),
      thumbnail1: convertToBase64(row.thumbnail1),
      thumbnail2: convertToBase64(row.thumbnail2),
      thumbnail3: convertToBase64(row.thumbnail3),
      thumbnail4: convertToBase64(row.thumbnail4),
      thumbnail5: convertToBase64(row.thumbnail5),
      productName: row.name,
      productDescription: row.description,
      price: row.price,
      discount: row.discount,
      quantity: row.quantity,
    };

    return product;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    throw error;
  } finally {
    connection.release();
  }
}
