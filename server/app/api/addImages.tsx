"use server";

import mysql from "mysql2/promise";

interface ImageData {
  id: string;
  main_image: string;
  thumbnail1: string;
  thumbnail2: string;
  thumbnail3: string;
  thumbnail4: string;
  thumbnail5: string;
  productName: string;
  productDescription: string;
}

export async function fetchImagesFromDb(): Promise<ImageData[]> {
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
       JOIN product ON images.id = product.image_id`
    );

    // Convert the image_data from binary to base64 string
    const images: ImageData[] = rows.map((row: any) => ({
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

    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  } finally {
    await connection.end();
  }
}
