import { IReview } from "../models/IReview.js";
import { ProductService } from "../services/ProductService.js";

export class ProductController {
    productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    async createReview(review: IReview) {
        await this.productService.addRating(review.productId, review.rating);
    }

    async updateReview(review: IReview) {
       await this.productService.updateRating(review.productId, review.oldRating, review.rating);
    }

    async deleteReview(review: IReview) {
        await this.productService.removeRating(review.productId, review.rating);
    }
}