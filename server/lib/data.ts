"use server";
import mysql from "mysql2/promise";

const executeQuery = async (query: any, data: any) => {
  try {
    const db = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      database: "bernzz",
      user: "root",
      password: "123456",
    });

    const [result] = await db.execute(query, data);

    db.end();

    return result;
  } catch (error) {
    return error;
  }
};

export default executeQuery;
