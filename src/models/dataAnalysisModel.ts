import initializeConnection from "../config/db.ts";

export class dataAnalysis {
  static async getByMedicine(medicine: string) {
    try {
      const pool = await initializeConnection();
      const [rows] = await pool.execute(
        `SELECT 
    prescription.id,
    prescription.medicine_id,
    medicine.name AS medicine_name,
    prescription.dosis,
    prescription.frequency,
    prescription.duration,
    prescription.patient_id
    FROM prescription
    JOIN medicine ON prescription.medicine_id = medicine.id
    WHERE medicine.name LIKE ?`,
        [medicine]
      );
      return rows;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  static async getByFrequency(frequency: string) {
    try {
      const pool = await initializeConnection();
      const [rows] = await pool.execute(
        `SELECT 
    prescription.id,
    prescription.medicine_id,
    medicine.name AS medicine_name,
    prescription.dosis,
    prescription.frequency,
    prescription.duration,
    prescription.patient_id
    FROM prescription
    JOIN medicine ON prescription.medicine_id = medicine.id
    WHERE prescription.frequency LIKE ?`,
        [frequency]
      );
      return rows;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  static async getByDuration(duration: string) {
    try {
      const pool = await initializeConnection();
      const [rows] = await pool.execute(
        `SELECT 
    prescription.id,
    prescription.medicine_id,
    medicine.name AS medicine_name,
    prescription.dosis,
    prescription.frequency,
    prescription.duration,
    prescription.patient_id
    FROM prescription
    JOIN medicine ON prescription.medicine_id = medicine.id
    WHERE prescription.duration LIKE ?`,
        [duration]
      );
      return rows;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  static async totalDosisApplied() {
    try {
      const pool = await initializeConnection();
      const [rows] = await pool.execute(
        `SELECT 
    medicine.id,
    medicine.name,
    SUM(CAST(prescription.dosis AS UNSIGNED)) AS total_doses
  FROM prescription 
  JOIN medicine ON prescription.medicine_id = medicine.id
  GROUP BY medicine.id, medicine.name;`
      );
      return rows;
    } catch (error) {}
  }

  static async usageFrequency() {
    try {
      const pool = await initializeConnection();
      const [rows] = await pool.execute(`SELECT 
    medicine.id,
    medicine.name,
    COUNT(prescription.id) AS frequency_of_use
FROM prescription
JOIN medicine ON prescription.medicine_id = medicine.id
GROUP BY medicine.id, medicine.name;`);

return rows
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
