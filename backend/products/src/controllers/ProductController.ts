import { validate } from "../helpers/ValidationHelper.js";
import { Product } from "../models/Product.js";
import { ProductService } from "../services/ProductService.js";

export class ProductController {
    
    async createProduct(request, response) {
        const product = new Product(request.body);
        try {
            await validate(product, response);
        } catch (e) {
            return;
        }
        const productId = await ProductService.getInstance().createProduct(product);
        response.json({ id: productId, message: "New product created successfully"})
    }

    async getProductById(request, response) {
        const product = await ProductService.getInstance().getProductById(request.params.id);
        response.json(new Product(product).getProductData());
    }

    async updateProduct(request, response) {
        const product = new Product(request.body);
        try {
            await validate(product, response);
        } catch (e) {
            return;
        }        
        const updatedCount = await ProductService.getInstance().updateProduct(request.params.id, new Product(product));
        response.json({ updatedCount })
    }

    async deleteProduct(request, response) {
        const deletedCount = await ProductService.getInstance().deleteProduct(request.params.id);
        response.json({ deletedCount });
    }

    async listAllProducts(request, response) {
        const products = await ProductService.getInstance().listAllProducts();
        const publicProductsData = products.map(product => new Product(product).getProductData());
        response.json(publicProductsData);
    }
}