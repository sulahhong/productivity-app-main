const asyncHandler = require('express-async-handler')

const Project = require('../model/projectModel')
const Workspace = require('../model/workspaceModel')
const User = require('../model/userModel')

const setProject = asyncHandler(async (req, res) => { 
    console.log("SLUG", req.params)
    const slugExists = await Workspace.findOne({slug: req.params.slug})
        if(!slugExists) {
        res.status(400)
        throw new Error ('Workspace invalid')
    }

    if  (!req.body.title) {
        res.status(400)
        throw new Error('please add a title field')
    }
    if  (!req.body.description) {
        res.status(400)
        throw new Error('please add a description field')
    }
    if  (!req.body.identifier) {
        res.status(400)
        throw new Error('please add a identifier field')
    }


    // console.log("USER: ", req.user.id)
    const project = await Project.create({
        title: req.body.title,
        description: req.body.description,
        identifier:req.body.identifier,
        workspace: slugExists,
        projectLead: null,
        createdBy: req.user.id,
        updatedBy: req.user.id,
    })


    res.status(200).json({status: "success", project})
})

const getProject =  asyncHandler(async (req, res) => {
console.log("GET PROJECT", req.params.slug)
    const workspace = await Workspace.findOne({slug: req.params.slug})
    if(!workspace) {
        res.status(400)
        throw new Error ('Workspace invalid')
    }
    console.log("Workspace", workspace)

    const projects = await Project.find({ workspace: workspace})
    res.status(200).json(projects)
})

const updateProject=  asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    if (!project) {
        res.status(400)
        throw new Error('project not Found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the todo user
    if(project.createdBy.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
    })

    res.status(200).json(updatedProject)

})

const deleteProject =  asyncHandler(async (req, res) => {

})

module.exports = {
    getProject, 
    setProject, 
    updateProject, 
    deleteProject
}