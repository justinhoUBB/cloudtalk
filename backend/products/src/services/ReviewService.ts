import  { mongo } from "../helpers/MongoHelper.js";
import { ObjectId } from "mongodb";
import { IReview } from "../models/Review.js";
import { IProduct } from "../models/Product.js";

export class ReviewService {

    private static instance: ReviewService;

    static getInstance(): ReviewService {
        if (!ReviewService.instance) {
            ReviewService.instance = new ReviewService();
        }
        return ReviewService.instance;
    }

    async createReview(review: IReview): Promise<number> {
        const associatedProduct: IProduct = await mongo.products.findOne({_id: new ObjectId(review.productId)});
        if (associatedProduct) {
            const result = await mongo.reviews.insertOne(review);
            await mongo.products.updateOne(
                { _id: new ObjectId(review.productId) },
                { $push: { "reviewList": result.insertedId }}
            );
            return result.insertedId;
        }
    }

    async updateReview(id: string, updateReview: IReview) {
        const idObject = new ObjectId(id);
        const reviewToBeUpdated: IReview = await mongo.reviews.findOne({ _id: idObject });
        if (reviewToBeUpdated) {
            const result = await mongo.reviews.updateOne(
                { _id: idObject },
                { $set: updateReview }
            );
            return { modifiedCount: result.modifiedCount, oldRating: reviewToBeUpdated.rating };
        }
    }

    async deleteReview(id: string) {
        const reviewId = new ObjectId(id);
        const reviewToBeDeleted: IReview = await mongo.reviews.findOne({ _id: reviewId });
        const result = await mongo.reviews.deleteOne({ _id: reviewId });
        await mongo.products.updateOne(
            { _id: new ObjectId(reviewToBeDeleted.productId) },
            { $pull: { 'reviewList': reviewId }} 
        );
        return { deletedCount: result.deletedCount, review: reviewToBeDeleted };
    }

    async listAllReviewsForProductId(productId: string): Promise<IReview[]> {
        const reviews = await mongo.reviews.find(({productId})).toArray();
        return reviews;
    }
}