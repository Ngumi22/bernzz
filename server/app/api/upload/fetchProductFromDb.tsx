"use server";

import mysql from "mysql2/promise";

import { ImageData, CategoryData, ProductssData } from "@/lib/definitions";

export async function fetchAllProductFromDb(): Promise<ProductssData[]> {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
  });

  try {
    const [rows]: any[] = await connection.execute(`
      SELECT
        p.id AS product_id,
        p.name,
        p.sku,
        p.description,
        i.main_image,
        i.thumbnail1,
        i.thumbnail2,
        i.thumbnail3,
        i.thumbnail4,
        i.thumbnail5
      FROM product p
      LEFT JOIN images i ON p.image_id = i.id
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
        .map((thumbnail: Buffer) => Buffer.from(thumbnail).toString("base64"));

      return {
        id: row.product_id,
        sku: row.sku,
        name: row.name,
        description: row.description,
        images: {
          main: row.main_image
            ? Buffer.from(row.main_image).toString("base64")
            : "",
          thumbnails,
        },
      };
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

export async function fetchCategoryFromDb(): Promise<CategoryData[]> {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
  });

  try {
    const [rows]: any[] = await connection.execute(`SELECT * from Categories`);

    // Convert the category_data from binary to base64 string
    const categories: CategoryData[] = rows.map((row: any) => ({
      id: row.id,
    }));

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  } finally {
    await connection.end();
  }
}
export async function fetchProductByIdFromDb(
  productId: number
): Promise<ImageData | null> {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
  });

  try {
    const [rows]: any[] = await connection.execute(
      `SELECT images.*, product.name AS productName, product.description AS productDescription
       FROM images
       JOIN product ON images.id = product.image_id
       WHERE product.id = ?`,
      [productId]
    );

    if (rows.length === 0) {
      return null; // Product not found
    }

    const row = rows[0];

    // Convert the image_data from binary to base64 string
    const image: ImageData = {
      id: row.id,
      main_image: Buffer.from(row.main_image).toString("base64"),
      thumbnail1: Buffer.from(row.thumbnail1).toString("base64"),
      thumbnail2: Buffer.from(row.thumbnail2).toString("base64"),
      thumbnail3: Buffer.from(row.thumbnail3).toString("base64"),
      thumbnail4: Buffer.from(row.thumbnail4).toString("base64"),
      thumbnail5: Buffer.from(row.thumbnail5).toString("base64"),
      productName: row.productName,
      productDescription: row.productDescription,
    };

    return image;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  } finally {
    await connection.end();
  }
}
export async function fetchProductsByCategoryFromDb(
  categoryId: number
): Promise<ImageData[]> {
  // Connect to the database
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
  });

  try {
    const [rows]: any[] = await connection.execute(
      `SELECT images.*, product.name AS productName, product.description AS productDescription
       FROM images
       JOIN product ON images.id = product.image_id
       WHERE product.category_id = ?`,
      [categoryId]
    );

    // Convert the image_data from binary to base64 string
    const products: ImageData[] = rows.map((row: any) => ({
      id: row.id,
      main_image: Buffer.from(row.main_image).toString("base64"),
      thumbnail1: Buffer.from(row.thumbnail1).toString("base64"),
      thumbnail2: Buffer.from(row.thumbnail2).toString("base64"),
      thumbnail3: Buffer.from(row.thumbnail3).toString("base64"),
      thumbnail4: Buffer.from(row.thumbnail4).toString("base64"),
      thumbnail5: Buffer.from(row.thumbnail5).toString("base64"),
      productName: row.productName,
      productDescription: row.productDescription,
    }));

    return products;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

export async function fetchProductsBySearchFromDb(
  searchQuery: string
): Promise<ImageData[]> {
  // Connect to the database
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
  });

  try {
    const [rows]: any[] = await connection.execute(
      `SELECT images.*, product.name AS productName, product.description AS productDescription
       FROM images
       JOIN product ON images.id = product.image_id
       WHERE product.name LIKE ?`,
      [`%${searchQuery}%`]
    );

    // Convert the image_data from binary to base64 string
    const products: ImageData[] = rows.map((row: any) => ({
      id: row.id,
      main_image: Buffer.from(row.main_image).toString("base64"),
      thumbnail1: Buffer.from(row.thumbnail1).toString("base64"),
      thumbnail2: Buffer.from(row.thumbnail2).toString("base64"),
      thumbnail3: Buffer.from(row.thumbnail3).toString("base64"),
      thumbnail4: Buffer.from(row.thumbnail4).toString("base64"),
      thumbnail5: Buffer.from(row.thumbnail5).toString("base64"),
      productName: row.productName,
      productDescription: row.productDescription,
    }));

    return products;
  } catch (error) {
    console.error("Error fetching products by search:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

export async function fetchProductBySlugFromDb(
  slug: string
): Promise<ImageData | null> {
  // Connect to the database
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
  });

  try {
    const [rows]: any[] = await connection.execute(
      `SELECT images.*, product.name AS productName, product.description AS productDescription
       FROM images
       JOIN product ON images.id = product.image_id
       WHERE product.slug = ?`,
      [slug]
    );

    if (rows.length === 0) {
      return null; // Product not found
    }

    const row = rows[0];

    // Convert the image_data from binary to base64 string
    const product: ImageData = {
      id: row.id,
      main_image: Buffer.from(row.main_image).toString("base64"),
      thumbnail1: Buffer.from(row.thumbnail1).toString("base64"),
      thumbnail2: Buffer.from(row.thumbnail2).toString("base64"),
      thumbnail3: Buffer.from(row.thumbnail3).toString("base64"),
      thumbnail4: Buffer.from(row.thumbnail4).toString("base64"),
      thumbnail5: Buffer.from(row.thumbnail5).toString("base64"),
      productName: row.productName,
      productDescription: row.productDescription,
    };

    return product;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    throw error;
  } finally {
    await connection.end();
  }
}
