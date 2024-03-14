import { expect, describe, it } from 'vitest'
import { Review } from '../../models/Review.js'

describe('Review class', () => {
  const reviewData = {
    rating: 5,
    firstName: 'John',
    lastName: 'Doe',
    text: 'This is a great product!',
    productId: '1'
  };

  const review = new Review(reviewData);

  describe('constructor', () => {
    it('should correctly assign values', () => {
      expect(review.rating).toBe(reviewData.rating);
      expect(review.firstName).toBe(reviewData.firstName);
      expect(review.lastName).toBe(reviewData.lastName);
      expect(review.text).toBe(reviewData.text);
      expect(review.productId).toBe(reviewData.productId);
    })
  })
})
