import mysql from "mysql2/promise";

const getProducts = async (query: string, data: any[]) => {
  try {
    const db = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      database: "bernzz",
      user: "root",
      password: "123456",
    });

    const [result] = await db.execute(query, data);
    db.end(); // Close the connection

    return result;
  } catch (error) {
    console.error("Error retrieving products:", error);
    return [];
  }
};

export default getProducts;
