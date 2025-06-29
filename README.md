# Simple Express.js REST API

A simple REST API built with Express.js that allows CRUD operations on an in-memory collection of items.

---

## 📦 Features

- GET `/items` – Retrieve all items
- GET `/items/:id` – Retrieve a single item by ID
- POST `/items` – Create a new item
- PUT `/items/:id` – Update an item by ID
- DELETE `/items/:id` – Delete an item by ID
- GET `/` – Root route returns Hello, World!
- Global error handling with express-validator
- Modular routes and error middleware

---

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed

### Installation

```bash
git clone https://github.com/yourusername/simple-express-api.git
cd simple-express-api
npm install
```

### Running the API

```bash
node index.js
```

Server will run on `http://localhost:3000`.

---

## 📋 API Endpoints

### ➕ Create Item

**POST** `/items`

**Request Body:**
```json
{
  "name": "Sample Item",
  "description": "This is a sample item"
}
```

**Responses:**
- ✅ `201 Created` – Returns the newly created item
- ❌ `400 Bad Request` – If validation fails

---

### 📖 Get All Items

**GET** `/items`

**Responses:**
- ✅ `200 OK` – Returns array of all items

---

### 🔍 Get Item by ID

**GET** `/items/:id`

**Responses:**
- ✅ `200 OK` – Item found
- ❌ `404 Not Found` – Item not found

---

### ✏️ Update Item

**PUT** `/items/:id`

**Request Body:**
```json
{
  "name": "Updated Item",
  "description": "Updated description"
}
```

**Responses:**
- ✅ `200 OK` – Updated item returned
- ❌ `400 Bad Request` – If validation fails
- ❌ `404 Not Found` – If item does not exist

---

### ❌ Delete Item

**DELETE** `/items/:id`

**Responses:**
- ✅ `200 OK` – Deletion confirmation
- ❌ `404 Not Found` – If item does not exist

---

## ⚠️ Error Handling

| Status | Description         |
|--------|---------------------|
| 400    | Validation errors   |
| 404    | Route or item not found |
| 500    | Internal server error |

---

## 🧪 Testing the API

### Using Postman

1. Import the collection file: `simple-express-api.postman_collection.json`
2. Test all CRUD operations
3. Example request for POST:

```http
POST /items
Content-Type: application/json

{
  "name": "Chair",
  "description": "Plastic chair"
}
```

---

## ✅ Project Structure

```
simple-express-api/
│
├── index.js
├── package.json
├── README.md
├── .gitignore
├── routes/
│   └── items.js
├── middleware/
│   └── errorHandler.js
└── simple-express-api.postman_collection.json
```

---

## 🧠 Internal Logic Description

### 📌 `routes/items.js`
This file defines all CRUD routes for `/items`, including:
- In-memory array `items[]`
- Express-validator usage on `POST` and `PUT`
- Route logic for GET, POST, PUT, DELETE with proper 404 and 400 error handling

### 📌 `middleware/errorHandler.js`
Global error handling middleware that returns:
- `500 Internal Server Error` with optional message in development

---

## 🧹 Submission Notes

- ✔️ All CRUD logic implemented in `/routes/items.js`
- ✔️ Validation using `express-validator`
- ✔️ Modular structure and centralized error handler

---

## 👨‍💻 Author

Oluseyi Samuel Olalere

---