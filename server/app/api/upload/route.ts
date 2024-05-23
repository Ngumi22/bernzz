"use server";

import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

import { NextApiRequest, NextApiResponse } from "next/types";
import { FileData } from "@/lib/definitions";

function validateFiles(files: File[]): { valid: boolean; message?: string } {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
  const maxSize = 100 * 1024; // Images cannot be more 100KB in size

  for (const file of files) {
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, message: "Invalid file type" };
    }
    if (file.size > maxSize) {
      return {
        valid: false,
        message: `File size exceeds 100KB limit: ${file.name}`,
      };
    }
  }
  return { valid: true };
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
    await connection.beginTransaction();

    // Ensure tables exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      )
    `);

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

    await connection.query(`
      CREATE TABLE IF NOT EXISTS product (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sku VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category_id INT,
        status ENUM('Archived', 'Active', 'Draft') DEFAULT 'Draft',
        image_id INT,
        price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        discount DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
        quantity INT NOT NULL DEFAULT 0,
        FOREIGN KEY (image_id) REFERENCES images(id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )
    `);

    const formData = await request.formData();
    const fields = Object.fromEntries(formData.entries());
    // .fromEntries is used here because we are have many entries in the form

    // Extract files from formData
    const main_image = formData.get("main_image") as File;
    const thumbnail1 = formData.get("thumbnail1") as File;
    const thumbnail2 = formData.get("thumbnail2") as File;
    const thumbnail3 = formData.get("thumbnail3") as File;
    const thumbnail4 = formData.get("thumbnail4") as File;
    const thumbnail5 = formData.get("thumbnail5") as File;

    // Validate files
    const filesToValidate = [
      main_image,
      thumbnail1,
      thumbnail2,
      thumbnail3,
      thumbnail4,
      thumbnail5,
    ].filter(Boolean);
    const { valid, message } = validateFiles(filesToValidate);
    if (!valid) {
      await connection.rollback();
      return NextResponse.json({ success: false, message }, { status: 400 });
    }

    const fileData: FileData = {
      main_image,
      thumbnail1,
      thumbnail2,
      thumbnail3,
      thumbnail4,
      thumbnail5,
      fields: {
        sku: fields.sku as string,
        name: fields.name as string,
        description: fields.description as string,
        category: fields.category as string,
        status: fields.status as "Archived" | "Active" | "Draft",
        price: parseFloat(fields.price as string),
        discount: parseFloat(fields.discount as string),
        quantity: parseInt(fields.quantity as string, 10),
      },
    };

    const {
      sku,
      name,
      description,
      category,
      status,
      price,
      discount,
      quantity,
    } = fileData.fields;

    // Check if a product with the same sku already exists
    const [existingProducts]: [any[], any] = await connection.query(
      "SELECT id FROM product WHERE sku = ? FOR UPDATE",
      [sku]
    );

    if (existingProducts.length > 0) {
      await connection.rollback();
      return NextResponse.json(
        {
          success: false,
          message: "Product with this SKU already exists",
        },
        { status: 400 }
      );
    }

    // Check if the category exists, if not, insert it
    let [categoryRows]: [any[], any] = await connection.query(
      "SELECT id FROM categories WHERE name = ? FOR UPDATE",
      [category]
    );

    let categoryId: number;
    if (categoryRows.length === 0) {
      const [categoryResult]: [any, any] = await connection.query(
        "INSERT INTO categories (name) VALUES (?)",
        [category]
      );
      categoryId = categoryResult.insertId;
    } else {
      categoryId = categoryRows[0].id;
    }

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

    const [result]: [any, any] = await connection.query(query, [
      mainImageBuffer,
      ...thumbnailBuffers,
    ]);

    if (!result.insertId) {
      throw new Error("Failed to insert images");
    }

    const imageId = result.insertId;

    // Insert product with associated image_id and category_id
    await connection.query(
      "INSERT INTO product (sku, name, description, category_id, status, image_id, price, discount, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        sku,
        name,
        description,
        categoryId,
        status,
        imageId,
        price,
        discount,
        quantity,
      ]
    );

    await connection.commit();

    return NextResponse.json({
      success: true,
      message: "Files uploaded successfully",
    });
  } catch (error) {
    console.error("Database error:", error);
    await connection.rollback();
    return NextResponse.json({ success: false, message: "Database error" });
  } finally {
    await connection.end();
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const productId = parseInt(req.query.id as string);

  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
  });

  try {
    await connection.beginTransaction();

    // Delete the product
    await connection.query("DELETE FROM product WHERE id = ?", [productId]);

    // Delete the associated images (optional, depending on your data model)
    // await connection.query("DELETE FROM images WHERE id = (SELECT image_id FROM product WHERE id = ?)", [productId]);

    await connection.commit();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    await connection.rollback();
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await connection.end();
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {
    name,
    sku,
    price,
    quantity,
    discount,
    description,
    category,
    status,
  } = await req.json();

  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    database: "bernzz",
    port: 3306,
    password: "123456",
    user: "root",
  });

  try {
    const [result]: [mysql.ResultSetHeader, any] = await connection.query(
      `
      UPDATE product
      SET name = ?, sku = ?, price = ?, quantity = ?, discount = ?, description = ?, status = ?, category_id = (
        SELECT id FROM categories WHERE name = ? LIMIT 1
      )
      WHERE id = ?
      `,
      [name, sku, price, quantity, discount, description, status, category, id]
    );

    if (result.affectedRows === 0) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return new NextResponse("Product updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return new NextResponse("Error updating product", { status: 500 });
  } finally {
    await connection.end();
  }
}
