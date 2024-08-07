import { Request, Response } from "express";
import { dataAnalysis } from "../models/dataAnalysisModel.ts";


export const getByMedicineName = async (req:Request, res:Response) => {
    try {
        const response = await dataAnalysis.getByMedicine(req.params.medicine);

        res.json({
            status:200,
            response:response
        })
    } catch (error) {
        throw new Error(`error consiguiendo por medicina ${(error as Error).message}`)
    }
};

export const getByPrescriptionFrequency = async (req:Request, res:Response) => {
    try {
        const response = await dataAnalysis.getByFrequency(req.params.frequency);

        res.json({
            status:200,
            response:response
        })
    } catch (error) {
        throw new Error(`error consiguiendo por medicina ${(error as Error).message}`)
    }
};

export const getByPrescriptionDuration = async (req:Request, res:Response) => {
    const response = await dataAnalysis.getByDuration(req.params.duration);
    
}