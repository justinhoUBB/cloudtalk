import { IsOptional, IsString, Min, Max, IsInt } from "class-validator";

export interface IReview {
    rating: number;
    firstName: string;
    lastName: string;
    text: string;
    _id?: string;
    productId?: string;
}

export class Review {
    constructor(review: IReview) {
        this.rating = review.rating;
        this.firstName = review.firstName;
        this.lastName = review.lastName;
        this.text = review.text;
        this.productId = review.productId;
    }

    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    text: string;

    @IsString()
    @IsOptional()
    productId: string;
}