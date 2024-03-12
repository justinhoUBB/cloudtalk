# API Documentation
This postman collection can be used in order to facilitate testing the API.

## Product Routes

### POST /products

- **Description**: Creates a new product.
- **Request body**:  `name`, `description`, `price`, all fields are mandatory.

### GET /products/:id

- **Description**: Retrieves a product by its ID.
- **Path parameter**: `id` - The ID of the product to retrieve.

### PUT /products/:id

- **Description**: Updates a product by its ID.
- **Path parameter**: `id` - The ID of the product to update.
- **Request body**: `name`, `description` & `price`, all fields are mandatory.

### DELETE /products/:id

- **Description**: Deletes a product by its ID.
- **Path parameter**: `id` - The ID of the product to delete.

### GET /products

- **Description**: Lists all products.

## Review Routes

### POST /reviews

- **Description**: Creates a new review. Sends a message to RabbitMQ.
- **Request body**: `productId`, `rating`, `text`, `firstName`, `lastName`, all fields are mandatory.

### GET /reviews/:productId

- **Description**: Retrieves reviews by product ID.
- **Path parameter**: `productId` - The ID of the product to retrieve reviews for.

### PUT /reviews/:id

- **Description**: Updates a review by its ID. Sends a message to RabbitMQ.
- **Path parameter**: `id` - The ID of the review to update.
- **Request body**: `productId`, `rating`, `text`, `firstName`, `lastName`, all fields are mandatory.

### DELETE /reviews/:id

- **Description**: Deletes a review by its ID. Sends a message to RabbitMQ.
- **Path parameter**: `id` - The ID of the review to delete.