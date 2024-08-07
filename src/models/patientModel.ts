import initializeConnection from "../config/db.ts";


interface Patient {
    id:number;
    name: string;
    age:number;
    medicalStory:string;
};

interface Prescription {
    id:number;
    medicineId:number;
    dosis:string;
    frequency:string;
    duration:string;
}

export class patientsRegistry {
    static async registerPatient(patient:Patient) {
        try {
            const { name, age, medicalStory } = patient;
            const pool = await initializeConnection();
            const [rows] = await pool.execute(
              "INSERT INTO patient (name, age, medical_history) VALUES (?, ?, ?)",
              [name, age, medicalStory ]
            );

            const { insertId } =  (rows as any);

            const connection = await initializeConnection();
            const [result] =  await connection.execute('SELECT * FROM patient WHERE id = ?', [insertId])
            return result
          } catch (error) {
            throw new Error(`Error registering data: ${(error as Error).message}`);
          }
    };

    static async insertPrescriptionIntoPatient(patient_id: number, prescription:Prescription) {
        try {
            const { medicineId, dosis, frequency, duration } = prescription;
            const pool = await initializeConnection();
            const [rows] = await pool.execute(
              "INSERT INTO prescription (medicine_id, dosis, frequency, duration, patient_id) VALUES (?, ?, ?, ?, ?)",
              [medicineId, dosis, frequency, duration, patient_id ]
            );

            const { insertId } =  (rows as any);

            const connection = await initializeConnection();
            const [result] =  await connection.execute('SELECT * FROM prescription WHERE id = ?', [insertId])
            return result
          } catch (error) {
            throw new Error(`Error registering data: ${(error as Error).message}`);
          }
    };

    static async listAllPrescriptions(id:number) {
        try {

            const pool = await initializeConnection();
            const [rows] = await pool.execute(
              "SELECT * FROM prescription WHERE patient_id = ?", [id]
            );
            return rows
        } catch (error) {
            throw new Error(`Error registering data: ${(error as Error).message}`);
        }
    };

    static async isMedicineAvailable(id:number) {
        try {

            const pool = await initializeConnection();
            const [rows] = await pool.execute(
              "SELECT quantity FROM medicine WHERE id = ?", [id]
            );
            
            if ((rows as any).length > 0) {
                return (rows as any)[0].quantity > 0;
            } else {
                throw new Error('Medicamento no encontrado en el inventario');
            }

        } catch (error) {
            throw new Error(`no medicine available apparently: ${(error as Error).message}`);
        }
    }
}