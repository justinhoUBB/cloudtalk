import { describe, it, vi, beforeEach, expect } from 'vitest'
import { ProductController } from '../../controllers/ProductController.js'
import { ProductService } from '../../services/ProductService.js'
import { IReview } from '../../models/IReview.js'

vi.mock('../../helpers/MongoHelper.js', () => ({
    mongo: {
      products: {
        updateOne: vi.fn(),
      },
    },
  })
);

class MockProductService extends ProductService {
  addRating = vi.fn()
  updateRating = vi.fn()
  removeRating = vi.fn()
}

describe('ProductController', () => {
  let productController: ProductController;

  beforeEach(() => {
    productController = new ProductController();
    productController.productService = new MockProductService();
  })

  it('should create review', async () => {
    const review = { productId: 'productId', rating: 5 } as IReview;
    await productController.createReview(review);
    expect(productController.productService.addRating).toHaveBeenCalledWith(review.productId, review.rating);
  })

  it('should update review', async () => {
    const review = { productId: 'productId', oldRating: 3, rating: 5 } as IReview;
    await productController.updateReview(review);
    expect(productController.productService.updateRating).toHaveBeenCalledWith(review.productId, review.oldRating, review.rating);
  })

  it('should delete review', async () => {
    const review = { productId: 'productId', rating: 5 } as IReview;
    await productController.deleteReview(review);
    expect(productController.productService.removeRating).toHaveBeenCalledWith(review.productId, review.rating);
  })
})
