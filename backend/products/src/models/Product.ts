import { IsString, IsInt, IsPositive, IsArray, IsNumber, IsOptional } from "class-validator";

export interface IProduct {
    _id?: string;
    name: string;
    description: string;
    price: number;
    listOfReviews?: string[];
    ratingSum?: number;
    ratingCount?: number;
}

export class Product {
    constructor(product: IProduct) {
        this.id = product._id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.listOfReviews = product.listOfReviews;
        this.ratingSum = product.ratingSum || 0;
        this.ratingCount = product.ratingCount || 0;
        this.averageRating = product.ratingSum ? product.ratingSum / product.ratingCount : undefined;
    }

    getProductData() {
        console.log(`Rating sum ${this.ratingSum}, rating count ${this.ratingCount}`);
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            averageRating: this.averageRating
        }
    }

    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    name: string;
    
    @IsString()
    description: string;
    
    @IsNumber()	
    @IsPositive()
    price: number;

    @IsArray()
    @IsOptional()	
    listOfReviews: string[];

    @IsInt()
    @IsOptional()
    ratingSum: number;

    @IsInt()
    @IsOptional()
    ratingCount: number;

    averageRating: number;
}