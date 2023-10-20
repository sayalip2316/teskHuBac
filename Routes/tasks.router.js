const express = require('express');
const taskRouter = express.Router();
const {TaskModel} = require('../Model/task.model');

// Create a new task
taskRouter.post('/add', async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, assignedTeamMembers, subTasks, project } = req.body;
    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      assignedTeamMembers,
      subTasks,
      project,
    });
    const savedTask = await task.save();
    res.status(201).send({msg:"Task created successfully!"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all tasks
taskRouter.get('/all', async (req, res) => {
  try {
    const tasks = await TaskModel.find().populate('assignedTeamMembers').populate('project');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





// // Get a specific task by ID
taskRouter.get('/:id', async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id).populate('assignedTeamMembers').populate('project');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// // Update a task by ID
taskRouter.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Delete a task by ID
taskRouter.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {taskRouter};
