import { validate } from "../helpers/ValidationHelper.js";
import { Product } from "../models/Product.js";
import { ProductService } from "../services/ProductService.js";

export class ProductController {
    
    async createProduct(req, res) {
        const product = new Product(req.body);
        try {
            await validate(product, res);
        } catch (e) {
            return;
        }
        const productId = await ProductService.getInstance().createProduct(product);
        res.json({ id: productId, message: "New product created successfully"})
    }

    async getProductById(req, res) {
        const product = await ProductService.getInstance().getProductById(req.params.id);
        res.json(new Product(product).getProductData());
    }

    async updateProduct(req, res) {
        const product = new Product(req.body);
        try {
            await validate(product, res);
        } catch (e) {
            return;
        }        
        const updatedCount = await ProductService.getInstance().updateProduct(req.params.id, new Product(product));
        res.json({ updatedCount })
    }

    async deleteProduct(req, res) {
        const deletedCount = await ProductService.getInstance().deleteProduct(req.params.id);
        res.json({ deletedCount });
    }

    async listAllProducts(req, res) {
        const products = await ProductService.getInstance().listAllProducts();
        const publicProductsData = products.map(product => new Product(product).getProductData());
        res.json(publicProductsData);
    }
}