"use server";

import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(request: NextRequest) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
  });

  const data = await request.formData();
  const files: File[] = Array.from(data.getAll("files") as File[]);

  if (files.length === 0) {
    return NextResponse.json({ success: false, message: "No files uploaded" });
  }

  try {
    const query = "INSERT INTO images (title, image_data) VALUES ?";
    const values = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        return [file.name, buffer];
      })
    );

    await connection.query(query, [values]);

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
