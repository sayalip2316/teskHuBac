const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Project Schema
const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  projectManager: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the project manager
  },
  teamMembers: [{
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for team members
  }],
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task', // Reference to the Task model for project tasks
  }],
});

// Create and export the Project model
const ProjectModel = mongoose.model('Project', projectSchema);

module.exports = {ProjectModel};
