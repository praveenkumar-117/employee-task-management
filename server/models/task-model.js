const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  isAccepted: {
    type: Boolean,
    default: false,
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },

  isFailed: {
    type: Boolean,
    default: false,
  },

});

const Task = new mongoose.model("Task", taskSchema);

module.exports = Task;