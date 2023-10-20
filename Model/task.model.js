const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Task Schema
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium', // Default priority if not specified
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do', // Default status if not specified
  },
  assignedTeamMembers: [{
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for assigned team members
  }],
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project', // Reference to the Project model for the associated project
  },
});

// Create and export the Task model
const TaskModel = mongoose.model('Task', taskSchema);

module.exports = {TaskModel};
