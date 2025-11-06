# Mock E-Commerce Cart Application

This project is a full-stack shopping cart web application built as part of the Nexora Internship Assignment. It demonstrates a complete e-commerce flow, including product listing, cart management, checkout, and mock order handling using React, Node.js, Express, and MongoDB.

## Overview

The purpose of this assignment is to build a basic online shopping cart that covers core full-stack concepts including:

1. RESTful API design
2. Frontend data fetching and state management
3. CRUD operations (Create, Read, Update, Delete)
4. Database integration
5. Responsive UI and clean user experience

The backend handles all data operations while the frontend manages the UI for browsing products, adding/removing items, and performing a mock checkout.

## Tech Stack

**Frontend:** React, Tailwind CSS, Framer Motion, Lucide Icons
**Backend:** Node.js, Express.js
**Database:** MongoDB with Mongoose ORM
**API Architecture:** REST

## Features

### Backend APIs

The backend provides several RESTful endpoints for handling e-commerce operations.

**1. GET /api/products**
Returns a list of available mock products.
Each product includes:

* id
* name
* price
* imageUrl
* rating
* available colors and sizes

**2. POST /api/cart**
Adds a product to the shopping cart.
Request body format:

```json
{
  "productId": "abc123",
  "quantity": 1
}
```

**3. DELETE /api/cart/:id**
Removes a product from the cart based on its cart item ID.

**4. GET /api/cart**
Retrieves the current cart with all items and the total amount.

**5. POST /api/checkout**
Accepts cart items and returns a mock receipt including:
* purchased items
* total price
* timestamp
* confirmation ID

**6. PATCH /api/cart/:id/decrease**
Decreases quantity of a cart item by 1, or remove if no such item exists.

### Frontend Functionality

The frontend is built with React and offers a clean and responsive interface.
It connects to the backend through REST APIs to handle all operations.

**Features include:**

1. Product listing page displaying available items in a responsive grid layout
2. Add to Cart functionality for each product
3. Cart view with

   * product details
   * quantity controls (+ and -)
   * total amount calculation
   * remove button for deleting an item
4. Checkout form where the user enters

   * full name
   * email address
   * mock payment confirmation
5. Receipt modal that appears after a successful checkout
6. Fully responsive layout working on both mobile and desktop screens

## Bonus Implementations

1. MongoDB-based persistence for products and cart items
2. Error handling for invalid requests and server responses

## Folder Structure

```
root
 ┣ /backend
 ┃ ┣ /models
 ┃ ┣ /routes
 ┃ ┣ /config
 ┃ ┣ seed-data.js
 ┃ ┗ server.js
 ┣ /frontend
 ┃ ┣ /src
 ┃ ┣ /components
 ┃ ┣ /context
 ┃ ┣ /services
 ┃ ┗ App.jsx
 ┗ README.md
```

## Setup Instructions

### Prerequisites

* Node.js and npm installed
* MongoDB installed locally or a MongoDB Atlas connection string
* Git installed

### Step 1: Clone the repository

```bash
git clone https://github.com/hocuspocus07/nexora-assignment.git
cd nexora-assignment
```

### Step 2: Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and add the following:

```
MONGO_URI=<YOUR-MONGO-URI>
DB_NAME=<YOUR-DB-NAME>
```

Run the backend:

```bash
npm start
```

The backend server will start on `http://localhost:5000`.

### Step 3: Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`.

## API Documentation Summary

| Method | Endpoint               | Description                 |
| ------ | ---------------------- | --------------------------- |
| GET    | /api/products          | Get list of products        |
| POST   | /api/cart              | Add an item to cart         |
| DELETE | /api/cart/:id          | Remove an item from cart    |
| GET    | /api/cart              | Get current cart + total    |
| POST   | /api/checkout          | Process mock checkout       |
| PATCH  | /api/cart/:id/decrease | Decreases qty               |

## Screenshots

## Demo Video

