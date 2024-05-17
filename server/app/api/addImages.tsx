"use server";
import mysql from "mysql2/promise";

export async function fetchImagesFromDb() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
  });

  try {
    const [rows]: any[] = await connection.execute("SELECT * FROM images");

    // Convert the image_data from binary to base64 string
    const images = rows.map((row: any) => ({
      ...row,
      image_data: Buffer.from(row.image_data).toString("base64"),
    }));

    await connection.end();
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    await connection.end();
    throw error;
  }
}

// INSERT INTO images (title,image_data) VALUES ('Laptop 2', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/omen.png'));
// INSERT INTO images (title,image_data) VALUES ('Laptop 3', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/sam.png'));
// INSERT INTO images (title,image_data) VALUES ('Laptop 4', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/lap3.jpg'));
// C:\Users\ADMIN\Desktop\b_photos/hp.jpg
//INSERT INTO images (title,image_data) VALUES ('Laptop 2', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/omen.png'));
