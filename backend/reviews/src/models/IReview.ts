export interface IReview {
    rating: number;
    oldRating: number;
    firstName: string;
    lastName: string;
    text: string;
    _id?: string;
    productId?: string;
}
