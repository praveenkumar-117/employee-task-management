const User = require("../models/user-model")
const Task = require("../models/task-model")



const getEmployee = async (req, res, next) => {
  try {
    const empData = await User.find({}, { password: 0 })

    if (!empData || User.length === 0) {
      return res.status(404).json({ message: "User not found" })
    } else {
      return res.status(200).json(empData)
    }
  } catch (error) {
    console.error("Error fetching employees:", error); return res.status(500).json({ message: "Internal server error" });
  }

}



const createTask = async (req, res, next) => {
  try {

    const { title, date, employee, priority, description, status } = req.body;
    const userExist = await User.findOne({ name: employee });
    if (!userExist) {
      return res.status(400).json({ message: "Employee Not Exist" });
    }


    // Create the task 
    const newTask = new Task
      ({
        title,
        date,
        employee,
        priority,
        description,
        status,
      });
    await newTask.save();

    res.status(200).json({ message: " Task Created succeffully" })
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: "Internal server error" })
  }

}

const getTask = async (req, res, next) => {
  try {
    const taskData = await Task.find({})

    if (!taskData || taskData.length === 0) {
      return res.status(404).json({ message: "Task not found" })
    } else {
      return res.status(200).json(taskData)
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

}

const deleteUser = async (req, res , next) =>{
try {
  const {userId} = req.params;
 const user= await User.findByIdAndDelete(userId);

  if(!user){
    return res.status(404).json({ message: "User not found" });
  }

  await Task.deleteMany({employee: user.name})

  res.status(200).json({ message: "User and associated tasks deleted successfully" });


} catch (error) {
  console.error("Error deleting user and tasks:", error); res.status(500).json({ message: "Internal server error" });
}
}




module.exports = { getEmployee, createTask, getTask, deleteUser }