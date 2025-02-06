import express from "express";
const app = express();
import dotenv from "dotenv";
import taskRoutes from "./routes/tasks.routes.js";
import connectDb from "./db/connectDb.js";
import notFound from "./middlewares/notFound.middleware.js";
dotenv.config();

const PORT = process.env.PORT;

// Connect to MongoDB
connectDb();

// Middleware
app.use(express.static("./public"));
app.use(express.json());

// Routes
// app.get("/", (_, res) => {
//   res.send("Hello World from TASK API Home 🏠");
// });
app.use("/api/v1/tasks", taskRoutes);
app.use(notFound); //404 Err.

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🛜`);
});
