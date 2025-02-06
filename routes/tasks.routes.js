import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getSingleTask,
  updateTask,
} from "../controllers/tasks.controllers.js";
const router = express.Router();

//endpoints
router.get("/", getAllTasks);
router.post("/create-task", createTask);
router.get("/:id", getSingleTask);
router.patch("/update-task/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
