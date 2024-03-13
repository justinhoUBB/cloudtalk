import { validateOrReject } from "class-validator";
import { HTTPCodesEnum } from "../models/enums/HttpCodes.js";

export async function validate (object: any, response: any) {
    try {
        await validateOrReject(object);
    } catch (e) {
        const errorMessage = e.message || "Invalid payload";
        response.status(HTTPCodesEnum.BAD_REQUEST).json({ message: errorMessage });
        throw new Error(errorMessage);
    }
}