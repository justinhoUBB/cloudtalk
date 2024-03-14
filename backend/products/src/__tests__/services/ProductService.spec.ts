import { describe, expect, it, vi } from 'vitest'
import { ProductService } from '../../services/ProductService.js';
import { IProduct } from '../../models/Product.js'
import { mongo } from '../../helpers/MongoHelper.js';

vi.mock('../../helpers/MongoHelper.js', () => ({
    mongo: {
      products: {
        insertOne: vi.fn(),
        updateOne: vi.fn(),
        findOne: vi.fn(),
        deleteOne: vi.fn(),
        find: vi.fn()
      },
    },
  })
);

describe('ProductService class', () => {
  const productService = ProductService.getInstance();
  const id = '3fa85f64c2f861969eaf3fe8';

  describe('createProduct', () => {
    it('should create a product and return its id', async () => {
      const product: IProduct = {
        name: 'Test Product',
        description: 'This is a test product',
        price: 100
      };

      mongo.products.insertOne.mockResolvedValue({ insertedId: id });

      const productId = await productService.createProduct(product);
      expect(productId).toBe(id);
    });
  })

  describe('getProductById', () => {
    it('should return a product by its id', async () => {
      const product: IProduct = {
        _id: id,
        name: 'Test Product',
        description: 'This is a test product',
        price: 100
      };

      mongo.products.findOne.mockResolvedValue(product);

      const result = await productService.getProductById(id);
      expect(result).toEqual(product);
    })
  })

  describe('updateProduct', () => {
    it('should update a product and return the modified count', async () => {
      const updateProduct: IProduct = {
        name: 'Updated Product',
        description: 'This is an updated product',
        price: 200
      };

      mongo.products.updateOne.mockResolvedValue({ modifiedCount: 1 });

      const modifiedCount = await productService.updateProduct(id, updateProduct);
      expect(modifiedCount).toBe(1);
    })
  })

  describe('deleteProduct', () => {
    it('should delete a product and return the deleted count', async () => {
      mongo.products.deleteOne.mockResolvedValue({ deletedCount: 1 });

      const deletedCount = await productService.deleteProduct(id);
      expect(deletedCount).toBe(1);
    })
  })

  describe('listAllProducts', () => {
    it('should return a list of all products', async () => {
      const products: IProduct[] = [{
        _id: id,
        name: 'Test Product',
        description: 'This is a test product',
        price: 100
      }];

      mongo.products.find.mockReturnValue({
        toArray: vi.fn().mockResolvedValue(products)
      });

      const result = await productService.listAllProducts();
      expect(result).toEqual(products);
    })
  })
})
