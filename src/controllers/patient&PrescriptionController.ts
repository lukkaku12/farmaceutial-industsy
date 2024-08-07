import { Request, Response } from "express";
import { patientsRegistry } from "../models/patientModel.ts";


export const createPatient = async (req: Request, res: Response) => {
  try {
    const rows = await patientsRegistry.registerPatient(req.body);
    res.status(201).json({
      status: 201,
      response: rows,
    });
  } catch (error) {
    throw new Error(`paciente no creado ${error}`);
  }
};


export const createPrescription = async (req:Request, res:Response) => {
    try {
        const { medicineId } = req.body;
        const isAvailable = await patientsRegistry.isMedicineAvailable(medicineId);
    
        if (!isAvailable) {
          return res.status(400).json({
            status: 400,
            error: 'Medicamento no disponible en el inventario',
          });
        }
    

        const rows = await patientsRegistry.insertPrescriptionIntoPatient(parseInt(req.params.id), req.body);
        res.status(201).json({
          status: 201,
          response: rows,
        });
      } catch (error) {
        throw new Error(`prescripcion no creada ${error}`);
      }
};

export const listAllPrescription = async (req:Request, res:Response) => {
    try {

        const rows = await patientsRegistry.listAllPrescriptions(parseInt(req.params.id));
        res.status(200).json({
          status: 200,
          response: rows,
        });
      } catch (error) {
        throw new Error(`error al mostrar las prescripciones ${error}`);
      }
}
