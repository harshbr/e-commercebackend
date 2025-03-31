# E-Commerce API

This is a Node.js-based REST API for an e-commerce application. It provides functionalities such as user registration, login, product and category management, and order placement.

## Features

- User Authentication (Register & Login)
- Category Management (Add & Fetch Categories)
- Product Management (Add, Fetch, Single Product Fetch)
- Order Management (Place Order, Fetch Orders by Email)

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for authentication
- Bcrypt for password hashing
- CORS for handling cross-origin requests

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/ecommerce-api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd ecommerce-api
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add the following:
   ```env
   DATABASEURL=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

## Running the Server

```sh
node index.js
```

The server will run on `http://localhost:3000/`.

## API Endpoints

### User Authentication

- **Register User**: `POST /registeruser`
- **Login User**: `POST /loginuser`

### Category Management

- **Add Category**: `POST /product/category`
- **Get Categories**: `GET /product/categoryget`

### Product Management

- **Add Product**: `POST /product/productspost`
- **Get Products by Category**: `GET /product/getproduct/:categoryId`
- **Get Single Product**: `GET /product/getsingleproduct/:productId`

### Order Management

- **Place Order**: `POST /orderpost`
- **Get Orders by Email**: `GET /orderget?email=user@example.com`

## Dependencies

- `express`
- `mongoose`
- `dotenv`
- `bcrypt`
- `jsonwebtoken`
- `cors`
- `body-parser`

## License

This project is licensed under the MIT License.
