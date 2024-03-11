# Product Review System (cloudtalk take home assignment - [requirements](https://shorturl.at/erDZ9))
This is a take-home test application created as part of the recruiting process.

## Table of Contents
1. Introduction
2. Design
3. Design Decisions
4. Setup
5. Usage
6. Testing

## Introduction
This project is a two-service system for product reviews. The Product Service exposes RESTful API interfaces for manipulation with products and reviews. The Review Processing Service handles the calculation of average review product ratings.

## Design
### Service 1: Product Service
The Product Service is a RESTful API built with Express.js and MongoDB. It provides CRUD operations for products and reviews, and it caches the product reviews using Redis. It also notifies the Review Processing Service when a review is added, modified, or deleted using RabbitMQ. 

### Service 2: Review Processing Service
The Review Processing Service listens for events from the Product Service. Upon receiving a review event, it calculates the average rating and stores it in MongoDB. It also caches the average product ratings using Redis.

## Design Decisions
### Use of MongoDB
MongoDB, a NoSQL database, was chosen for its flexibility and scalability. It allows us to easily store and retrieve complex, hierarchical data structures, which is ideal for our product and review data.

In our case, each product document contains a `reviewList` field which is an array of review IDs. Each review document then contains a `productId` field to associate it with a product. This Reference IDs model allows us to access reviews independently of products and is more suitable for large amounts of data. This model is the best suited one for our case, as the endpoint for retrieving product information should not include reviews data.

### Use of RabbitMQ
RabbitMQ, a messaging broker, was used to implement a publish-subscribe pattern for communication between the services. This ensures that the services are loosely coupled and can scale independently.

### Use of Redis
Redis, an in-memory data structure store, was used as a caching mechanism to improve the performance of our services. It stores the product reviews and average product ratings, reducing the need for expensive database queries.

## Setup
1. Install Docker and Docker Compose.
2. Clone this repository.
3. Run `docker-compose up` in the `backend` directory.

## Usage
The API for CRUD operations (the Product Service) can be accessed at `http://localhost:3000`, while the Review Processing Service runs on port `3001`.

## Testing
Unit tests can be run with the `npm run test` command in each service's directory.