import mysql from "mysql2/promise";

const initializeConnection = async () => {
  const pool = await mysql.createConnection({
    host: "localhost",
    user: "root",
    port:3306,
    database: "farmaceuticalWorld",
  });
  return pool;

}

export default initializeConnection;


