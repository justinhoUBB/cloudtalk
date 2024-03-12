import express from "express";
import { ProductController } from "./controllers/ProductController.js";
import { ReviewController } from "./controllers/ReviewController.js";

const app = express();
const reviewController = new ReviewController();
const productController = new ProductController();

app.listen(3000);;
app.use(express.json());

// Product Routes
app.post('/products',  productController.createProduct);
app.get('/products/:id', productController.getProductById);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);
app.get('/products', productController.listAllProducts);

// Review routes
app.post('/reviews', reviewController.createReview);
app.get('/reviews/:productId', reviewController.getReviewsByProductId);
app.put('/reviews/:id', reviewController.updateReview);
app.delete('/reviews/:id', reviewController.deleteReview);