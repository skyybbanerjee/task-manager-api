import express from "express";
const app = express();
import dotenv from "dotenv";
import taskRoutes from "./routes/tasks.routes.js";
import connectDb from "./db/connectDb.js";
import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
dotenv.config();

const PORT = process.env.PORT;

// Connect to MongoDB
connectDb();

// Middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", taskRoutes);
app.use(notFound); //404 Err.
app.use(errorHandler); //custom Error Handler

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🛜`);
});
