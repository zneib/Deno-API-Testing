import { Router } from "https://deno.land/x/oak/mod.ts";
import { addTodo } from "./controllers/todos.ts"; // Import controller methods

const router = new Router();

// Implement routes
router
  .post("/api/todos", addTodo); // Add a todo
  .get("/api/todos", getTodos); // Get all todos

export default router;