# Task Manager CRUD Application

A RESTful API for managing tasks built with Express.js and MongoDB.

## Features

- Create, Read, Update, Delete (CRUD) operations for tasks
- Task properties: title, description, status, priority, due date
- MongoDB integration with Mongoose ODM
- RESTful API endpoints
- CORS enabled for frontend integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   PORT=3000
   ```

4. Make sure MongoDB is running on your system

## Running the Application

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on port 3000 (or the port specified in your .env file).

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Task Schema

```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "status": "pending | in-progress | completed (default: pending)",
  "priority": "low | medium | high (default: medium)",
  "dueDate": "date (optional)",
  "createdAt": "date (auto-generated)",
  "updatedAt": "date (auto-updated)"
}
```

## Example Usage

### Create a new task:
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the task manager application",
    "priority": "high",
    "status": "in-progress"
  }'
```

### Get all tasks:
```bash
curl http://localhost:3000/api/tasks
```

### Update a task:
```bash
curl -X PUT http://localhost:3000/api/tasks/[task-id] \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

### Delete a task:
```bash
curl -X DELETE http://localhost:3000/api/tasks/[task-id]
```

## Database Connection

The application connects to MongoDB using the connection string specified in the `.env` file. If no connection string is provided, it defaults to `mongodb://localhost:27017/taskmanager`.

## Error Handling

The API includes comprehensive error handling for:
- Invalid MongoDB ObjectIDs
- Missing required fields
- Database connection issues
- General server errors

All errors return appropriate HTTP status codes and error messages.
