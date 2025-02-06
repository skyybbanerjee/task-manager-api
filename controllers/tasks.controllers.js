import mongoose from "mongoose"; //for Cast-Error fix
import TaskModel from "../models/task.model.js";

//CRUD Ops.
export async function createTask(req, res) {
  try {
    const { name, completed } = req.body;
    const task = await TaskModel.create({ name, completed });
    res.status(201).json({ success: true, message: "Task created ☑️", task });
    console.log("Task created successfully ☑️");
  } catch (error) {
    console.error(error + "🔴");
    res.status(500).json({ success: false, message: error.message + " ⚠️" });
  }
}

export async function getAllTasks(_, res) {
  try {
    const tasks = await TaskModel.find({});
    res.status(201).json({
      success: true,
      message: "Tasks fetched successfully ☑️",
      tasks,
    });
    console.log("Tasks fetched successfully ☑️");
  } catch (error) {
    console.error(error + "🔴");
    res.status(500).json({ success: false, message: error.message + " ⚠️" });
  }
}

export async function getSingleTask(req, res) {
  try {
    const { id: taskID } = req.params;

    // Check if taskID is a valid MongoDB ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(taskID)) {
      console.log(`Invalid Task ID format ❌`);
      return res.status(400).json({
        success: false,
        message: `Invalid Task ID format: '${taskID}' ⚠️`,
      });
    }

    // Fetch the task
    const task = await TaskModel.findOne({ _id: taskID });

    // If task not found, return 404
    if (!task) {
      console.log(`Task with ID '${taskID}' not found ❌`);
      return res.status(404).json({
        success: false,
        message: `Task with ID '${taskID}' not found ⚠️`,
      });
    }

    // Task found, return it
    res.status(200).json({
      success: true,
      message: `Task with ID '${taskID}' fetched successfully ☑️`,
      task,
    });

    console.log(`Task with ID '${taskID}' fetched successfully ☑️`);
  } catch (error) {
    console.error(`Server Error: ${error} 🔴`);
    res.status(500).json({ success: false, message: error.message + "🔴" });
  }
}

export async function updateTask(req, res) {
  try {
    const { id: taskID } = req.params;
    const { name, completed } = req.body;

    // Check if taskID is a valid MongoDB ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(taskID)) {
      return res.status(400).json({
        success: false,
        message: `Invalid Task ID format: '${taskID}' 🔴`,
      });
    }

    // Update the task
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskID,
      { name, completed },
      { new: true, runValidators: true }
    );

    // If task not found, return 404
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: `Task with ID '${taskID}' not found🔴`,
      });
    }

    // Task found, return it
    res.status(200).json({
      success: true,
      message: `Task with ID '${taskID}' updated successfully ☑️`,
      updatedTask,
    });
    console.log(`Task with ID '${taskID}' updated successfully ☑️`);
  } catch (error) {
    console.error(error + "🔴");
    res.status(500).json({ success: false, message: error.message + " ⚠️" });
  }
}

export async function deleteTask(req, res) {
  try {
    const { id: taskID } = req.params;

    // Check if taskID is a valid MongoDB ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(taskID)) {
      console.log(`Invalid Task ID format ❌`);
      return res.status(400).json({
        success: false,
        message: `Invalid Task ID format: '${taskID}' 🔴`,
      });
    }

    // Fetch the task
    const task = await TaskModel.findOneAndDelete({ _id: taskID });

    // If task not found, return 404
    if (!task) {
      console.log(`Task with ID '${taskID}' not found ⚠️`);
      return res.status(404).json({
        success: false,
        message: `Task with ID '${taskID}' not found ⚠️`,
      });
    }

    // Task found, return it
    res.status(200).json({
      success: true,
      message: `Task with ID '${taskID}' deleted successfully ☑️`,
      task,
    });
    //res.status(200).send(); - Alt. way
    console.log(`Task with ID '${taskID}' deleted successfully ☑️`);
  } catch (err) {
    console.error(`Server Error: ${err} 🔴`);
    res.status(500).json({ success: false, message: err.message + "🔴" });
  }
}
