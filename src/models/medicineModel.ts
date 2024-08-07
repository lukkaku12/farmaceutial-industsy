import initializeConnection from "../config/db.ts";

interface medicine {
  id: number;
  name: string;
  quantity: number;
  expirationDate: Date;
  price: number;
}

class Inventory {
  static async postMedicine(medicine: medicine) {
    try {
      const { name, quantity, expirationDate, price } = medicine;
      const pool = await initializeConnection();
      const [rows] = await pool.execute(
        "INSERT INTO medicine (name, quantity, expiration_date, price) VALUES (?, ?, ?, ?)",
        [name, quantity, expirationDate, price]
      );
      return rows;
    } catch (error) {
      throw new Error(`Error retrieving data: ${(error as Error).message}`);
    }
  }

  static async getAllMedicines() {
    try {
      const pool = await initializeConnection();
      const [rows] = await pool.execute("SELECT * FROM medicine");
      return rows;
    } catch (error) {
      throw new Error(`Error retrieving data: ${(error as Error).message}`);
    }
  }

  static async updateMedicine(quantity: number, id: number) {
    try {
      const pool = await initializeConnection();
      const [rows] = await pool.execute(
        "UPDATE medicine SET quantity = ? WHERE id = ?",
        [quantity, id]
      );
      return rows;
    } catch (error) {
      throw new Error(`Error retrieving data: ${(error as Error).message}`);
    }
  }

  static async deleteExpiratedMedicine() {
    const pool = await initializeConnection();
    const query = "DELETE FROM medicine WHERE expiration_date < NOW()";
    await pool.query(query);
  }
}

export default Inventory;
