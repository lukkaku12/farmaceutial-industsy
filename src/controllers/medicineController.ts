import { Request, Response } from "express";
import Inventory from "../models/medicineModel.ts";

export const getAllMedicines = async (_req: Request, res: Response) => {
  const response = await Inventory.getAllMedicines();
  res.json({ result: response });
};

export const createMedicine = async (req: Request, res: Response) => {
  const response = await Inventory.postMedicine(req.body);
  res.json({ result: response });
};

export const updateQuantity = async (req: Request, res: Response) => {
  const { quantity } = req.body;

  const response = await Inventory.updateMedicine(
    quantity,
    parseInt(req.params.id)
  );
  res.json({ result: response });
};

export const deleteExpiratedMedicines = async (req: Request, res: Response) => {
  const response = await Inventory.deleteExpiratedMedicine();
  res.json({ result: response });
};
