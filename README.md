# Book Management API

A RESTful CRUD API for managing books built with TypeScript, Express, and MongoDB using OOP principles.

## Architecture

The project follows a layered architecture:

```
Controllers → Services → Repositories → Database
```

- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic and validation
- **Repositories**: Database operations
- **Models**: Mongoose schemas
- **Exceptions**: Custom error classes

## Tech Stack

- Node.js with TypeScript
- Express.js
- MongoDB with Mongoose
- OOP Design Patterns

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
```

4. Run the server:
```bash
npm run dev
```

Server runs on `http://localhost:8080`

## API Endpoints

### Create Book
```
POST /books
```
Body:
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "year": 1925,
  "isbn": "978-0743273565",
  "description": "A story about the American Dream",
  "pages": 180
}
```

### Get All Books
```
GET /books
```
Query Parameters:
- `search` - Search in title, author, description
- `author` - Filter by author
- `genre` - Filter by genre
- `year` - Filter by year
- `sortBy` - Sort field (title, author, year, createdAt)
- `order` - Sort order (asc, desc)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

Example:
```
GET /books?search=gatsby&sortBy=year&order=desc&page=1&limit=10
```

### Get Single Book
```
GET /books/:id
```

### Update Book
```
PUT /books/:id
```
Body (any fields to update):
```json
{
  "available": false
}
```

### Delete Book
```
DELETE /books/:id
```

## Response Format

Success:
```json
{
  "success": true,
  "data": { ... }
}
```

Paginated:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

Error:
```json
{
  "success": false,
  "message": "Error message"
}
```

## Project Structure

```
src/
├── controllers/      # Request handlers
├── services/         # Business logic
├── repositories/     # Database operations
├── models/           # Mongoose schemas
├── routes/           # Route definitions
├── interfaces/       # TypeScript interfaces
├── exceptions/       # Custom error classes
├── utils/            # Utility interfaces
├── app.ts            # Express app setup
└── server.ts         # Entry point
```

## Author

Sameer Pawar
