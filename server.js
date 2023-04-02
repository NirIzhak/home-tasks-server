const express = require('express');
const mongoose = require('mongoose');
const TaskModel = require('./models/Task')
const cors = require('cors')
const PORT = process.env.PORT | 8000;

const app = express();
app.use(express.json())
app.use(cors());

mongoose.connect('mongodb+srv://nir676676:uinJVDaRVwxqiCNX@cluster0.gurtaf5.mongodb.net/HomeTasks?retryWrites=true&w=majority')


app.get('/tasks', async (req, res) => {
    try {
        const result = await TaskModel.find({});
        res.json(result);
    } catch (err) {
        res.json(err);
    }
})


app.post('/addTask', async (req, res) => {
    const task = req.body;
    const newTask = new TaskModel(task);
    await newTask.save();
    res.json(task)
})


app.get('/doneTasks', async (req, res) => {
    try {
      const result = await TaskModel.find({done: true});
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  });


  app.get('/unDoneTasks', async (req, res) => {
    try {
      const result = await TaskModel.find({done: true});
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  });
  


app.delete('/deleteTask/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const result = await TaskModel.findByIdAndDelete(taskId);
        if (!result) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
        res.json({
            message: 'Task deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


app.put('/updateTask/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const update = req.body;
        const result = await TaskModel.findByIdAndUpdate(taskId, update, {
            new: true
        });
        if (!result) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});



app.listen(PORT, () => {
    console.log('Server Is Running On => ' + PORT)
})
