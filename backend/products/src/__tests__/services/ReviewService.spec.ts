import { describe, expect, it, vi } from 'vitest'
import { ReviewService } from '../../services/ReviewService.js';
import { IReview } from '../../models/Review.js'
import { mongo } from '../../helpers/MongoHelper.js';

vi.mock('../../helpers/MongoHelper.js', () => ({
    mongo: {
      products: {
        findOne: vi.fn(),
        updateOne: vi.fn(),
      },
      reviews: {
        insertOne: vi.fn(),
        findOne: vi.fn(),
        updateOne: vi.fn(),
        deleteOne: vi.fn(),
        find: vi.fn()
      },
    },
  })
);

describe('ReviewService class', () => {
  const reviewService = ReviewService.getInstance();
  const id = '3fa85f64c2f861969eaf3fe8';

  describe('createReview', () => {
    it('should create a review and return its id', async () => {
      const review: IReview = {
        rating: 5,
        firstName: 'Test',
        lastName: 'User',
        text: 'This is a test review',
        productId: id
      };

      mongo.products.findOne.mockResolvedValue({ _id: id });
      mongo.reviews.insertOne.mockResolvedValue({ insertedId: id });

      const reviewId = await reviewService.createReview(review);
      expect(reviewId).toBe(id);
    });
  })

  describe('updateReview', () => {
    it('should update a review and return the modified count and old rating', async () => {
      const review: IReview = {
        _id: id,
        rating: 5,
        firstName: 'Test',
        lastName: 'User',
        text: 'This is a test review',
        productId: id
      };

      mongo.reviews.findOne.mockResolvedValue(review);
      mongo.reviews.updateOne.mockResolvedValue({ modifiedCount: 1 });

      const result = await reviewService.updateReview(id, review);
      expect(result).toEqual({ modifiedCount: 1, oldRating: review.rating });
    })
  })

  describe('deleteReview', () => {
    it('should delete a review and return the deleted count and the deleted review', async () => {
      const review: IReview = {
        _id: id,
        rating: 5,
        firstName: 'Test',
        lastName: 'User',
        text: 'This is a test review',
        productId: id
      };

      mongo.reviews.findOne.mockResolvedValue(review);
      mongo.reviews.deleteOne.mockResolvedValue({ deletedCount: 1 });

      const result = await reviewService.deleteReview(id);
      expect(result).toEqual({ deletedCount: 1, review });
    })
  })

  describe('listAllReviewsForProductId', () => {
    it('should return a list of all reviews for a product id', async () => {
      const reviews: IReview[] = [{
        _id: id,
        rating: 5,
        firstName: 'Test',
        lastName: 'User',
        text: 'This is a test review',
        productId: id
      }];

      mongo.reviews.find.mockReturnValue({
        toArray: vi.fn().mockResolvedValue(reviews)
      });

      const result = await reviewService.listAllReviewsForProductId('1');
      expect(result).toEqual(reviews);
    })
  })
})
