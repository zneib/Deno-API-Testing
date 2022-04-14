import { Router } from "https://deno.land/x/oak/mod.ts";
import { addTodo, getTodos, getTodo, updateTodo, deleteTodo, getIncompleteTodos } from "./controllers/todos.ts"; // Import controller methods

const router = new Router();

// Implement routes
router
  .post("/api/todos", addTodo) // Add a todo
  .get("/api/todos", getTodos) // Get all todos
  .get("/api/todos/:id", getTodo) // Get one todo
  .get("/api/todos/incomplete/count", getIncompleteTodos) // Find all incomplete todos
  .put("/api/todos/:id", updateTodo) // Update one todo
  .delete("/api/todos/:id", deleteTodo); // Delete one todo

export default router;