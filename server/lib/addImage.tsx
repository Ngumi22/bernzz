// app/api/addImages.tsx - path to this

"use server";

import { Pool } from "mysql2/promise";
import mysql from "mysql2/promise";

export default async function handler(
  req: { method: string; formData: () => any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: { status?: string; message?: string; error?: string }): void;
        new (): any;
      };
      end: { (arg0: string): void; new (): any };
    };
    setHeader: (arg0: string, arg1: string[]) => void;
  }
) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
  });
  if (req.method === "POST") {
    const formData = await req.formData();
    const chunks: Uint8Array[] = [];
    const imageBuffer = await new Promise((resolve, reject) => {
      formData
        .get("image")
        .on("data", (chunk: Uint8Array) => chunks.push(chunk))
        .on("end", () => resolve(Buffer.concat(chunks)));
      formData.get("image").on("error", (err: any) => reject(err));
    });

    try {
      const [rows] = await connection.execute(
        "INSERT INTO images (name, data) VALUES (?,?)",
        [formData.get("image").name, imageBuffer]
      );

      res
        .status(200)
        .json({ status: "success", message: "Image uploaded successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while uploading the image." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

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
// C:\Users\ADMIN\Desktop\b_photos/hp.jpg
//INSERT INTO images (title,image_data) VALUES ('Laptop 2', LOAD_FILE('C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/omen.png'));
