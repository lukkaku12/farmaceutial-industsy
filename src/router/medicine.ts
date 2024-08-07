import express from "express"
import { getAllMedicines, createMedicine, updateQuantity, deleteExpiratedMedicines } from "../controllers/medicineController.ts";


const medicineRouter = express.Router()

medicineRouter.get('/', getAllMedicines);

medicineRouter.post('/', createMedicine);

medicineRouter.put('/:id', updateQuantity);

medicineRouter.delete('/', deleteExpiratedMedicines);

export default medicineRouter;