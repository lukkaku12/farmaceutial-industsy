import { Router } from "express";
import { getByMedicineName, getByPrescriptionFrequency } from "../controllers/dataAnalysisController.ts";

const dataAnalysisRouter = Router();

dataAnalysisRouter.get('/:medicine', getByMedicineName);
dataAnalysisRouter.get('/:frequency', getByPrescriptionFrequency);



export default dataAnalysisRouter;



