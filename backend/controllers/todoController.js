const asyncHandler = require('express-async-handler')

const Todo = require('../model/todoModel')
const User = require('../model/userModel')

const getTodos =  asyncHandler(async (req, res) => {
    const todos = await Todo.find({ createdBy: req.user.id})
    res.status(200).json(todos)
})

const setTodo = asyncHandler(async (req, res) => {
    if  (!req.body.text) {
        res.status(400)
        throw new Error('please add a text field')
    }
    console.log("USER: ", req.user.id)
    const todo = await Todo.create({
        text: req.body.text,
        createdBy: req.user.id,
    })

    res.status(200).json(todo)
})



const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(400)
        throw new Error('Todo not Found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the todo user
    if(todo.createdBy.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
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

    const user = await User.findById(req.user.id)

    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the todo user
    if(todo.createdBy.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await todo.deleteOne()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getTodos, 
    setTodo, 
    updateTodo, 
    deleteTodo
}