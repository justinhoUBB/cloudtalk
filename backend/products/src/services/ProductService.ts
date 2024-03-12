import  { mongo } from "../helpers/MongoHelper.js";
import { ObjectId } from "mongodb";
import { IProduct } from "../models/Product.js";

export class ProductService {

    private static instance: ProductService;
    
    static getInstance() {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }

    async createProduct(product: IProduct) {
        const result = await mongo.products.insertOne(product);
        return result.insertedId;
    }

    async getProductById(id: string) {
        return mongo.products.findOne({_id: new ObjectId(id)});
    }

    async updateProduct(id: string, updateProduct: IProduct) {
        const result = await mongo.products.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateProduct }
        );
        return result.modifiedCount;
    }

    async deleteProduct(id: string) {
        const result = await mongo.products.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }

    async listAllProducts() {
        const products = await mongo.products.find({}).toArray();
        return products;
    }
}