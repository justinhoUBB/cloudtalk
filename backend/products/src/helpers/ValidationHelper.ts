import { validateOrReject } from "class-validator";
import { HTTPCodesEnum } from "../models/enums/HttpCodes.js";

export async function validate (object: any, res) {
    try {
        await validateOrReject(object);
    } catch (e) {
        const errorMessage = e.message || "Invalid payload";
        res.status(HTTPCodesEnum.BAD_REQUEST).json({ message: errorMessage });
        throw new Error(errorMessage);
    }
}