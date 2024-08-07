import express from "express";
import medicineRouter from "../router/medicine.ts"; //PUEDE ESTALLAR POR ESTO.
import patientRouter from "../router/patient.ts";
import dataAnalysisRouter from "../router/dataAnalysis.ts";

const Routes = express();

Routes.use('/medicine-inventory', medicineRouter);
Routes.use('/patients', patientRouter);
Routes.use('/data-analysis', dataAnalysisRouter)

export default Routes;