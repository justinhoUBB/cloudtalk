import { Review } from "../models/Review.js";
import { ReviewService } from "../services/ReviewService.js";
import { ReviewStatus } from "../models/enums/ReviewStatus.js"
import { validate } from "../helpers/ValidationHelper.js";
import { Redis } from "ioredis";
import { sendToRabbitMQ } from "../helpers/RabbitHelper.js";

export class ReviewController {

    async createReview(req, res) {
        const review = new Review(req.body);
        try {
            await validate(review, res);
        } catch(e) {
            return;
        }
        const reviewId = await ReviewService.getInstance().createReview(review);
        sendToRabbitMQ('reviewExchange', JSON.stringify({ status: ReviewStatus.CREATED, review }));
        res.json({ id: reviewId, message: "Review created successfully" });
    }

    async getReviewsByProductId(req, res) {
        const { productId } = req.params;
        const cacheKey = `reviews:${productId}`;
        const redisClient = new Redis({
            host: "redis",
            port: 6379
        });
        const cachedReviews = await redisClient.get(cacheKey);
        if (cachedReviews) {
            res.json({ reviews: JSON.parse(cachedReviews), retrievedFrom: "Redis Cache" });
        }
        else {
            const reviews = await ReviewService.getInstance().listAllReviewsForProductId(productId);
            await redisClient.set(cacheKey, JSON.stringify(reviews), "EX", 100);
            res.json({ reviews, retrievedFrom: "MongoDB" });
        }
    }

    async updateReview(req, res) {
        const review = new Review(req.body);
        try {
            await validate(review, res);
        } catch(e) {
            return;
        }
        const { oldRating, modifiedCount } = await ReviewService.getInstance().updateReview(req.params.id, review);
        if (modifiedCount) {
            sendToRabbitMQ('reviewExchange', JSON.stringify({ status: ReviewStatus.UPDATED, review: { ...review, oldRating } }));
        }
        res.json({ modifiedCount });
    }

    async deleteReview(req, res) {
        const { deletedCount, review } = await ReviewService.getInstance().deleteReview(req.params.id);
        if (deletedCount) {
            sendToRabbitMQ('reviewExchange', JSON.stringify({ status: ReviewStatus.DELETED,  review }));
        }
        res.json({ deletedCount });
    }
}