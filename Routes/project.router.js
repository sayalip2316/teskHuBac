const express = require('express');
const projectRouter = express.Router();
const {ProjectModel} = require('../Model/project.model');
const {UserModel}=require("../Model/user.model")
const {TaskModel} = require('../Model/task.model');
const {checkUserRoles}=require("../middleware/auth.middleware")

// Create a new project
projectRouter.post('/add', async (req, res) => {
  try {
    const { name, description, startDate, endDate, projectManager, teamMembers } = req.body;
    const project = new ProjectModel({
      name,
      description,
      startDate,
      endDate,
      projectManager,
      teamMembers,
    });
    const savedProject = await project.save();
    res.status(201).send({msg:"Project created successfully"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all projects
projectRouter.get('/all', async (req, res) => {
  try {
    const projects = await ProjectModel.find().populate('projectManager').populate('teamMembers').populate('tasks');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific project by ID
projectRouter.get('/projects/:id', async (req, res) => {
    const{id}=req.params
  try {
    const project = await ProjectModel.findById(id).populate('projectManager').populate('teamMembers');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a project by ID
projectRouter.put('/projects/:id', async (req, res) => {
    const{id}=req.params
  try {
    const { name, description, startDate, endDate, projectManager, teamMembers } = req.body;
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        startDate,
        endDate,
        projectManager,
        teamMembers,
      },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a project by ID
projectRouter.delete('/projects/:id', async (req, res) => {
    const{id}=req.params
  try {
    const deletedProject = await ProjectModel.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get team members allotted for a specific project
projectRouter.get('/:projectId/teamMembers', async (req, res) => {
  try {
    const { projectId } = req.params;
    const team=await ProjectModel.find({_id:projectId}).populate('projectManager').populate('teamMembers')
    res.status(200).send(team[0].teamMembers)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get team members and their tasks for a specific project
projectRouter.get('/:projectId/teamMembersWithTasks', async (req, res) => {
  try {
    const { projectId } = req.params;

    // Find the project by its ID and populate the projectManager and teamMembers
    const project = await ProjectModel.findById({_id:projectId})
      .populate('projectManager')
      .populate('teamMembers');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Create an array to store team members with their assigned tasks
    const teamMembersWithTasks = [];

    for (const teamMember of project.teamMembers) {
      // Find tasks for each team member in the project
      const tasks = await TaskModel.find({
        project: projectId,
        assignedTeamMembers: teamMember._id,
      });

      teamMembersWithTasks.push({
        teamMember,
        tasks,
      });
    }

    res.status(200).json(teamMembersWithTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = {projectRouter};
