import { ProductService } from '../../services/ProductService.js';
import { mongo } from '../../helpers/MongoHelper.js';
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../../helpers/MongoHelper.js', () => ({
    mongo: {
      products: {
        updateOne: vi.fn(),
      },
    },
  })
);

describe('ProductService', () => {
  let productService: ProductService;
  const productId = '3fa85f64c2f861969eaf3fe8';

  beforeEach(() => {
    productService = new ProductService();
    mongo.products.updateOne.mockReset();
  });

  it('should remove rating', async () => {
    await productService.removeRating(productId, 5);
    expect(mongo.products.updateOne).toHaveBeenCalledWith(
      { _id: expect.anything() },
      { $inc: { 'ratingSum': -5, 'ratingCount': -1 }}
    );
  })

  it('should add rating', async () => {
    await productService.addRating(productId, 5);
    expect(mongo.products.updateOne).toHaveBeenCalledWith(
      { _id: expect.anything() },
      { $inc: { 'ratingSum': 5, 'ratingCount': 1 }}
    );
  })

  it('should update rating', async () => {
    await productService.updateRating(productId, 3, 5);
    expect(mongo.products.updateOne).toHaveBeenCalledWith(
      { _id: expect.anything() },
      { $inc: { 'ratingSum': 2 }}
    );
  })

  it('should not update rating if new rating is same as old rating', async () => {
    await productService.updateRating(productId, 5, 5);
    expect(mongo.products.updateOne).not.toHaveBeenCalled();
  })
})
