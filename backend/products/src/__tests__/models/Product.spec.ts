import { expect, describe, it } from 'vitest'
import { Product } from '../../models/Product.js'

describe('Product class', () => {
  const productData = {
    _id: '1',
    name: 'Test Product',
    description: 'This is a test product',
    price: 100,
    listOfReviews: ['2', '3'],
    ratingSum: 8,
    ratingCount: 2
  };

  const product = new Product(productData);

  describe('constructor', () => {
    it('should correctly assign values', () => {
      expect(product.id).toBe(productData._id);
      expect(product.name).toBe(productData.name);
      expect(product.description).toBe(productData.description);
      expect(product.price).toBe(productData.price);
      expect(product.listOfReviews).toEqual(productData.listOfReviews);
      expect(product.ratingSum).toBe(productData.ratingSum);
      expect(product.ratingCount).toBe(productData.ratingCount);
    })
  })

  describe('getProductData', () => {
    it('should return correct product data', () => {
      const productData = product.getProductData();
      expect(productData._id).toBe(product.id);
      expect(productData.name).toBe(product.name);
      expect(productData.description).toBe(product.description);
      expect(productData.price).toBe(product.price);
      expect(productData.averageRating).toBe(product.averageRating);
    })
  })
})
