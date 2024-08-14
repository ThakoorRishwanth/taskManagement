const Task = require("../models/Task");




const createTask = async(req, res)=>{
    try{
        const{title, description, priority, deadline, status, assignee} = req.body;

        if(!title || !description || !deadline){

            return res.status(400).json({message:"Titile, description, and deadline are required"});
        }

        const task = new Task({title, description, priority, deadline, status, assignee});

        await task.save();

        res.status(201).json(task)
    }
    catch(err){
        console.log(err);

        res.status(500).json({message:"Internal server error"});
    }
};

const getTasks = async (req, res)=>{
    try{
        const tasks = await Task.find();
        
        res.status(200).json(tasks);

    }catch(err){

        console.log(err);

        res.status(500).json({message:'Internal server error'})
    }
};

const getTaskById = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const updateTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
  };