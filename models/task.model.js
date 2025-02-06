import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "must provide the task-name"],
    maxlength: [30, "name cannot be more than 30 characters"],
  },
  completed: { type: Boolean, default: false },
});

// Model initialization
const TaskModel = mongoose.models.Task || mongoose.model("Task", TaskSchema);
export default TaskModel;
