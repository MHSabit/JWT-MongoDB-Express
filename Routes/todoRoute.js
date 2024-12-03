const express = require('express');
const toDoController = require('../routeController/todoController');
const CheckLogin = require('../Middleware/CheckLogin');
const router = express.Router();


//get all todos
router.get('/', toDoController.getAllToDO);

//get todo by id
router.get('/:id', toDoController.getIDbyToDO);

// create a todos
router.post('/', toDoController.createToDo);

// create multiple todos
router.post('/all', toDoController.createMultipleToDo);

// update a todo
router.put('/:id', toDoController.updatebyIdTodo)

// delete a todos
router.delete('/:id', toDoController.DEletebyTodo);

module.exports = router;