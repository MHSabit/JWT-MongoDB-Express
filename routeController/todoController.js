// package required
const mongoose = require('mongoose');

// internal required
const todoSchema = require('../Schema/todoSchema');

// model
const TodoModel = require("../Schema/todoSchema")

const toDoController = {};

//get all todos
toDoController.getAllToDO = async (req, res) => {
    try{
        const data = await TodoModel.find();
        // console.log('data :', data);
        res.status(200).send(data);
    }
    catch(err) {
        res.send(err);
    }
}

//get todo by id
toDoController.getIDbyToDO = async (req, res) => {
    try{
    const data = await TodoModel.findById(req.params.id)
    // console.log(req.params);
    res.send(data);
    }
    catch(err) {
        throw new Error;
    }
}

// create a todos
toDoController.createToDo = async (req, res) => {
    try {
        const data = await TodoModel.create(req.body);
        // console.log(`Created a Todo:`, data);
        res.status(201).json({
            success: true,
            data: data
        });
    }
    catch(err) {
        console.error('Error creating todo:', err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

// create multiple todos
toDoController.createMultipleToDo = async (req, res) => {
    try {
        // req.body should be an array of todos
        const data = await TodoModel.insertMany(req.body);
        // console.log('Created multiple todos:', data);
        
        res.status(201).json({
            success: true,
            data: data
        });
    }
    catch(err) {
        console.error('Error creating multiple todos:', err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

// update a todo by ID
toDoController.updatebyIdTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const updatePayload = req.body;
        
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            id,
            updatePayload,
            { new: true }  // This returns the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({
                success: false,
                message: 'ID not found'
            });
        }

        // console.log('Updated todo:', updatedTodo);
        res.status(200).json({
            success: true,
            data: updatedTodo
        });
    }
    catch (err) {
        // console.error('Error updating todo:', err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

// delete a todos
toDoController.DEletebyTodo = async (req, res) => {
    try{
        const data = await TodoModel.findOneAndDelete(req.params.id);
        console.log(data);
        res.send(data);
    }
    catch(err) {
        res.status(500).send(err);
    }   
}

module.exports = toDoController;