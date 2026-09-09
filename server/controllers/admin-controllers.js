const User = require("../models/user-model");
const Task = require("../models/task-model");

const getEmployee = async (req, res) => {
  try {
    const empData = await User.find({ isAdmin: false }, { password: 0 });

    if (!empData || empData.length === 0) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json(empData);
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, date, employee, priority, description } = req.body;

    const userExist = await User.findOne({
      _id: employee,
      isAdmin: false,
    });

    if (!userExist) {
      return res.status(400).json({ message: "Employee Not Exist" });
    }

    const newTask = new Task({
      title,
      date,
      employee: userExist._id,
      priority,
      description,
    });

    await newTask.save();

    res.status(200).json({ message: "Task Created successfully" });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getTask = async (req, res) => {
  try {
    const taskData = await Task.find({}).populate("employee", "name email");

    if (!taskData || taskData.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    } else {
      return res.status(200).json(taskData);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getEmployee, createTask, getTask, deleteUser };
