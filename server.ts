import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import router from "./routes.ts"; // Import our router

const app = new Application();
app.use(oakCors());
app.use(router.routes()); // Implement our router
app.use(router.allowedMethods()); // Allow router HTTP methods

addEventListener("fetch", app.fetchEventHandler());