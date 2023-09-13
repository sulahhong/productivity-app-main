const asyncHandler = require('express-async-handler')


const getTodos =  asyncHandler(async (req, res) => {
    res.status(200).json({message : 'Get Todos'})
})

const setTodo = asyncHandler(async (req, res) => {
    if  (!req.body.text) {
        res.status(400)
        throw new Error('please add a text field')
    }
    res.status(200).json({message : 'Set Todo'})
})

const updateTodo = asyncHandler(async (req, res) => {
    res.status(200).json({message : `Update Todo ${req.params.id}`})
})

const deleteTodo = asyncHandler(async (req, res) => {
    res.status(200).json({message : `Delete Todo ${req.params.id}`})
})

module.exports = {
    getTodos, 
    setTodo, 
    updateTodo, 
    deleteTodo
}