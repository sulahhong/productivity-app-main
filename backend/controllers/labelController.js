const asyncHandler = require('express-async-handler')

const Project = require('../model/projectModel')
const Label = require('../model/labelModel')
const User = require('../model/userModel')
const Priority = require('../model/priorityModel')
const Status = require('../model/statusModel')

const getLabel =  asyncHandler(async (req, res) => {

const priorityAll = await Priority.find({sid: "1"})

console.log("SUPER TEST", priorityAll)

const status = await Status.find({sid: "1"})
console.log("STATUS TEST :", status)

    const labels = await Label.find({ createdBy: req.user.id})
    res.status(200).json(labels)
})

const setLabel = asyncHandler(async (req, res) => {
    const projectExists = await Project.findById(req.params.projectId)
    if(!projectExists) {
    res.status(400)
    throw new Error ('Project invalid')
}
    if  (!req.body.name) {
        res.status(400)
        throw new Error('please add a label name field')
    }
    if  (!req.body.color) {
        res.status(400)
        throw new Error('please select a label color')
    }
    console.log("USER: ", req.user.id)
    const label = await Label.create({
        createdBy: req.user.id,
        name: req.body.name,
        color: req.body.color, 
        project: projectExists
    })

    res.status(200).json(label)
})



const updateLabel = asyncHandler(async (req, res) => {
    const label = await Label.findById(req.params.id)

    if (!label) {
        res.status(400)
        throw new Error('Label not Found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the todo user
    if(label.createdBy.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedLabel = await Label.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
    })

    res.status(200).json(updatedLabel)

})

const deleteLabel = asyncHandler(async (req, res) => {
    const label = await Label.findById(req.params.id)

    if (!label) {
        res.status(400)
        throw new Error('Label not Found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the todo user
    if(label.createdBy.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await label.deleteOne()

    res.status(200).json({ status: "delete success", id: req.params.id})
})

module.exports = {
    getLabel, 
    setLabel, 
    updateLabel, 
    deleteLabel
}