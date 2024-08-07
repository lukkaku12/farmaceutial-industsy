import { Router } from "express";
import { createPatient, createPrescription, listAllPrescription } from "../controllers/patient&prescriptionController.ts";

const patientRouter = Router();

patientRouter.get('/:id',listAllPrescription );
patientRouter.post('/:id/prescriptions', createPrescription );
patientRouter.post('/', createPatient );




export default patientRouter;