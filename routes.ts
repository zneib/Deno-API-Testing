import { Router } from "https://deno.land/x/oak/mod.ts";
import { addTodo, getTodos, getTodo, updateTodo, deleteTodo, getIncompleteTodos } from "./controllers/todos.ts"; // Import controller methods
import { addBook, getBooks, getBook, updateBook, deleteBook } from "./controllers/books.ts"; // Import controller methods
import { addRating } from "./controllers/ratings.ts"; // Import controller methods
import { addView, getViews } from "./controllers/views.ts"; // Import controller methods
import { addCough, getCoughs, getCough, deleteCough } from "./controllers/coughs.ts"; // Import controller methods

const router = new Router();

// Implement routes
router
  .post("/api/todos", addTodo) // Add a todo
  .post("/api/books", addBook) // Add a book
  .post("/api/ratings", addRating) // Add a rating
  .post("/api/views", addView) // Add a view
  .post("/api/coughs", addCough) // Add a cough
  .get("/api/views", getViews) // Get all views
  .get("/api/todos", getTodos) // Get all todos
  .get("/api/books", getBooks) // Get all books
  .get("/api/coughs", getCoughs) // Get all coughs
  .get("/api/todos/:id", getTodo) // Get one todo
  .get("/api/books/:id", getBook) // Get one book
  .get("/api/coughs/:id", getCough) // Get one cough
  .get("/api/todos/incomplete/count", getIncompleteTodos) // Find all incomplete todos
  .put("/api/todos/:id", updateTodo) // Update one todo
  .put("/api/books/:id", updateBook) // Update one book
  .delete("/api/todos/:id", deleteTodo) // Delete one todo
  .delete("/api/books/:id", deleteBook) // Delete one book
  .delete("/api/coughs/:id", deleteCough); // Delete one cough

export default router;
