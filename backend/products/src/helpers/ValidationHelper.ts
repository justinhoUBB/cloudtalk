import { validateOrReject } from "class-validator";
import { HTTPCodesEnum } from "../models/enums/HttpCodes.js";
import { Review } from "../models/Review.js";
import { Product } from "../models/Product.js";
import { Response } from "express";

export async function validate(object: Product | Review, response: Response): Promise<void> {
    try {
        await validateOrReject(object);
    } catch (e) {
        const errorMessage = e.message || "Invalid payload";
        response.status(HTTPCodesEnum.BAD_REQUEST).json({ message: errorMessage });
        throw new Error(errorMessage);
    }
}