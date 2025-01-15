const User = require("../models/user-model")
const Task = require("../models/task-model")


const getEmployeeTask = async (req, res, next) => {
  try {
    const { name } = req.body;
    const empTask = await Task.find({ employee: name })
    if (!empTask) {
      return res.status(404).json({ message: "Task Not Assigned" });
    } else {
      return res.status(200).json(empTask)
    }

  } catch (error) {
    console.error("Error fetching employee tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}



const setTaskStatus = async (req, res, next) => {
  try {
    const { taskId, status } = req.body;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update specific status field 
    if (status === 'Accepted') {
      task.isAccepted = true;
    }
    else if (status === 'Completed') {
      task.isCompleted = true;
    } else if (status === 'Failed') {
      task.isFailed = true;
    }

    await task.save();

    const user = await User.findOne({ name: task.employee });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Increment the counter for the new status
    if (status === 'Accepted') user.acceptedTasks++;
    else if (status === 'Completed') user.completedTasks++;
    else if (status === 'Failed') user.failedTasks++;
    await user.save();

    return res.status(200).json({ message: "Task status updated successfully", task });
  } catch (error) {
    console.error("Error updating task status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }


}

  module.exports = { getEmployeeTask, setTaskStatus }