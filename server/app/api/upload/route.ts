import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

interface FileData {
  main_image: File;
  thumbnail1: File;
  thumbnail2: File;
  thumbnail3: File;
  thumbnail4: File;
  thumbnail5: File;
  fields: {
    name: string;
    description: string;
  };
}

export async function POST(request: NextRequest) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
  });

  try {
    // Ensure the 'images' table exists with the new structure
    await connection.query(`
      CREATE TABLE IF NOT EXISTS images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        main_image LONGBLOB,
        thumbnail1 LONGBLOB,
        thumbnail2 LONGBLOB,
        thumbnail3 LONGBLOB,
        thumbnail4 LONGBLOB,
        thumbnail5 LONGBLOB
      )
    `);

    // Ensure the 'product' table exists with the new structure
    await connection.query(`
      CREATE TABLE IF NOT EXISTS product (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_id INT,
        FOREIGN KEY (image_id) REFERENCES images(id)
      )
    `);

    const formData = await request.formData();
    const fields = Object.fromEntries(formData.entries());

    // Extract files from formData
    const main_image = formData.get("main_image") as File;
    const thumbnail1 = formData.get("thumbnail1") as File;
    const thumbnail2 = formData.get("thumbnail2") as File;
    const thumbnail3 = formData.get("thumbnail3") as File;
    const thumbnail4 = formData.get("thumbnail4") as File;
    const thumbnail5 = formData.get("thumbnail5") as File;

    const fileData: FileData = {
      main_image,
      thumbnail1,
      thumbnail2,
      thumbnail3,
      thumbnail4,
      thumbnail5,
      fields: {
        name: fields.name as string,
        description: fields.description as string,
      },
    };

    const mainImageBuffer = main_image
      ? Buffer.from(await main_image.arrayBuffer())
      : null;
    const thumbnailBuffers = await Promise.all(
      [thumbnail1, thumbnail2, thumbnail3, thumbnail4, thumbnail5].map(
        async (thumbnail) =>
          thumbnail ? Buffer.from(await thumbnail.arrayBuffer()) : null
      )
    );

    const query = `
      INSERT INTO images (main_image, thumbnail1, thumbnail2, thumbnail3, thumbnail4, thumbnail5)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await connection.query<any>(query, [
      mainImageBuffer,
      ...thumbnailBuffers,
    ]);

    const imageId = result.insertId;

    const { name, description } = fileData.fields;

    // Insert product with associated image_id
    await connection.query(
      "INSERT INTO product (name, description, image_id) VALUES (?, ?, ?)",
      [name, description, imageId]
    );

    return NextResponse.json({
      success: true,
      message: "Files uploaded successfully",
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ success: false, message: "Database error" });
  } finally {
    await connection.end();
  }
}
