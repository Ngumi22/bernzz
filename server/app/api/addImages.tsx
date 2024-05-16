// app/api/addImages.tsx - path to this

"use server";

import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

interface ImageFormData {
  images: File[];
}

export const saveImagesToDb = async (
  formData: ImageFormData,
  res: NextApiResponse
) => {
  try {
    const { images } = formData;

    if (!images || !images.length) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      database: "bernzz",
      port: 3306,
      password: "123456",
      user: "root",
    });

    for (const image of images) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        "images",
        image.name
      );
      const imageBuffer = fs.readFileSync(imagePath);

      await connection.execute(
        "INSERT INTO images (title, image_data) VALUES (?, ?)",
        [image.name, imageBuffer]
      );
    }

    await connection.end();

    res.status(200).json({ message: "Images uploaded successfully" });
  } catch (error) {
    console.error("Error saving images to database:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to extract image title from file path
const getImageTitleFromPath = (imagePath: string): string => {
  // Extract the image title from the file path
  const parts = imagePath.split("/");
  const fileName = parts[parts.length - 1];
  // Remove file extension from file name (if any)
  const title = fileName.split(".")[0];
  return title;
};

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
    await connection.end();
    return rows;
  } catch (error) {
    console.error("Error fetching images:", error);
    await connection.end();
    throw error;
  }
}

// INSERT INTO images (title,image_data) VALUES ('Laptop 2', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/omen.png'));
// INSERT INTO images (title,image_data) VALUES ('Laptop 3', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/sam.png'));
// INSERT INTO images (title,image_data) VALUES ('Laptop 4', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/lap3.jpg'));
