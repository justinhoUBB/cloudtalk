import { ObjectId } from "mongodb";
import { mongo } from "../helpers/MongoHelper.js";

export class ProductService {

    async removeRating(productId: string, rating: number) {
        const result = await mongo.products.updateOne(
            { _id: new ObjectId(productId) },
            { $inc: { 'ratingSum': -rating, 'ratingCount': -1 }} 
        );
        return result;
    }

    async addRating(productId: string, rating: number) {
        const result = await mongo.products.updateOne(
            { _id: new ObjectId(productId) },
            { $inc: { 'ratingSum': rating, 'ratingCount': 1 }} 
        );
        return result;
    }

    async updateRating(productId: string, oldRating: number, newRating: number) {
        if (newRating === oldRating) {
            return;
        }
        const ratingDifference = newRating - oldRating;
        const result = await mongo.products.updateOne(
            { _id: new ObjectId(productId) },
            { $inc: { 'ratingSum': ratingDifference }} 
        );
        return result;
    }
}