const express  = require("express");
const { AddTaskModel } = require("../models/addtask.model");
const todo = express.Router();

todo.get("/todo",async(req,res)=>{
    try {
        const todoList =await AddTaskModel.find()
        res.send(todoList)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})
// ADD a New Task
todo.post("/addtask",async(req,res)=>{
    try {
        const newTask = new AddTaskModel(req.body);
        await newTask.save()
        res.json({ msg: "New Task Has been Added" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// Edit the Task
todo.patch("/edit/:id",async(req,res)=>{
    try {
        const editedTask = await AddTaskModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json({ msg: `Task Has been edited to ${editedTask}` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})
// Delete the Task
todo.delete("/delete/:id",async(req,res)=>{
    try {
        const DeletedTask = await AddTaskModel.findByIdAndDelete(req.params.id);
        res.json({ msg: `Task Has been Deleted ${DeletedTask}` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


module.exports={
    todo
}