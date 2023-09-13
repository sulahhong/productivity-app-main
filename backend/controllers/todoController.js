const asyncHandler = require('express-async-handler')

const Todo = require('../model/todoModel')

const getTodos =  asyncHandler(async (req, res) => {
    const todos = await Todo.find()
    res.status(200).json(todos)
})

const setTodo = asyncHandler(async (req, res) => {
    if  (!req.body.text) {
        res.status(400)
        throw new Error('please add a text field')
    }
    const todo = await Todo.create({
        text: req.body.text,
    })

    res.status(200).json(todo)
})

const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(400)
        throw new Error('Todo not Found')
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
    })

    res.status(200).json(updatedTodo)
})

const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(400)
        throw new Error('Todo not Found')
    }

    await Todo.remove()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getTodos, 
    setTodo, 
    updateTodo, 
    deleteTodo
}