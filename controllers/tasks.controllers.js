import mongoose from "mongoose"; // for Cast-Error fix
import TaskModel from "../models/task.model.js";
import asyncWrapper from "../middlewares/asyncWrapper.middlewares.js";
import { createCustomError } from "../errors/customError.js";

// CRUD Ops.

export const createTask = asyncWrapper(async function (req, res, next) {
  const { name, completed } = req.body;
  const task = await TaskModel.create({ name, completed });
  if (!task) {
    return next(createCustomError("Task creation failed ❌", 500));
  }
  res.status(201).json({ success: true, message: "Task created ☑️", task });
  console.log("Task created successfully ☑️");
});

export const getAllTasks = asyncWrapper(async function (_, res, next) {
  const tasks = await TaskModel.find({});
  if (!tasks) {
    return next(createCustomError("Failed to fetch tasks ❌", 500));
  }
  res.status(200).json({
    success: true,
    message: "Tasks fetched successfully ☑️",
    tasks,
  });
});

export const getSingleTask = asyncWrapper(async function (req, res, next) {
  const { id: taskID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskID)) {
    return next(
      createCustomError(`Invalid Task ID format: '${taskID}' ⚠️`, 400)
    );
  }

  const task = await TaskModel.findOne({ _id: taskID });

  if (!task) {
    return next(
      createCustomError(`Task with ID '${taskID}' not found ⚠️`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: `Task with ID '${taskID}' fetched successfully ☑️`,
    task,
  });
  console.log(`Task with ID '${taskID}' fetched successfully ☑️`);
});

export const updateTask = asyncWrapper(async function (req, res, next) {
  const { id: taskID } = req.params;
  const { name, completed } = req.body;

  if (!mongoose.Types.ObjectId.isValid(taskID)) {
    return next(
      createCustomError(`Invalid Task ID format: '${taskID}' 🔴`, 400)
    );
  }

  const updatedTask = await TaskModel.findByIdAndUpdate(
    taskID,
    { name, completed },
    { new: true, runValidators: true }
  );

  if (!updatedTask) {
    return next(
      createCustomError(`Task with ID '${taskID}' not found 🔴`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: `Task with ID '${taskID}' updated successfully ☑️`,
    updatedTask,
  });
  console.log(`Task with ID '${taskID}' updated successfully ☑️`);
});

export const deleteTask = asyncWrapper(async function (req, res, next) {
  const { id: taskID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskID)) {
    return next(
      createCustomError(`Invalid Task ID format: '${taskID}' 🔴`, 400)
    );
  }

  const task = await TaskModel.findOneAndDelete({ _id: taskID });

  if (!task) {
    return next(
      createCustomError(`Task with ID '${taskID}' not found ⚠️`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: `Task with ID '${taskID}' deleted successfully ☑️`,
    task,
  });
  console.log(`Task with ID '${taskID}' deleted successfully ☑️`);
});
