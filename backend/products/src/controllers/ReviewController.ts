import { Review } from "../models/Review.js";
import { ReviewService } from "../services/ReviewService.js";
import { ReviewStatus } from "../models/enums/ReviewStatus.js"
import { validate } from "../helpers/ValidationHelper.js";
import { Redis } from "ioredis";
import { sendToRabbitMQ } from "../helpers/RabbitHelper.js";

export class ReviewController {

    async createReview(request, response) {
        const review = new Review(request.body);
        try {
            await validate(review, response);
        } catch(e) {
            return;
        }
        const reviewId = await ReviewService.getInstance().createReview(review);
        sendToRabbitMQ('reviewExchange', JSON.stringify({ status: ReviewStatus.CREATED, review }));
        response.json({ id: reviewId, message: "Review created successfully" });
    }

    async getReviewsByProductId(request, response) {
        const { productId } = request.params;
        const cacheKey = `reviews:${productId}`;
        const redisClient = new Redis({
            host: "redis",
            port: 6379
        });
        const cachedReviews = await redisClient.get(cacheKey);
        if (cachedReviews) {
            response.json({ reviews: JSON.parse(cachedReviews), retrievedFrom: "Redis Cache" });
        }
        else {
            const reviews = await ReviewService.getInstance().listAllReviewsForProductId(productId);
            await redisClient.set(cacheKey, JSON.stringify(reviews), "EX", 100);
            response.json({ reviews, retrievedFrom: "MongoDB" });
        }
    }

    async updateReview(request, response) {
        const review = new Review(request.body);
        try {
            await validate(review, response);
        } catch(e) {
            return;
        }
        const { oldRating, modifiedCount } = await ReviewService.getInstance().updateReview(request.params.id, review);
        if (modifiedCount) {
            sendToRabbitMQ('reviewExchange', JSON.stringify({ status: ReviewStatus.UPDATED, review: { ...review, oldRating } }));
        }
        response.json({ modifiedCount });
    }

    async deleteReview(request, response) {
        const { deletedCount, review } = await ReviewService.getInstance().deleteReview(request.params.id);
        if (deletedCount) {
            sendToRabbitMQ('reviewExchange', JSON.stringify({ status: ReviewStatus.DELETED,  review }));
        }
        response.json({ deletedCount });
    }
}