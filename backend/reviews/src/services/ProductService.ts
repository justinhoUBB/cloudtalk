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

    async deleteReview(productId: string, reviewId: string) {
        const result = await mongo.products.updateOne(
            { _id: new ObjectId(productId) },
            { $pull: { 'reviewList': new ObjectId(reviewId) }} 
        );
        return result;
    }
}