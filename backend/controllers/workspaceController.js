const asyncHandler = require('express-async-handler')

const Workspace = require('../model/workspaceModel')
const User = require('../model/userModel')


const setWorkspace = asyncHandler(async (req, res) => {
    if  (!req.body.name) {
        res.status(400)
        throw new Error('please add a name field')
    }
    if  (!req.body.slug) {
        res.status(400)
        throw new Error('please add a slug')
    }

    const slugExists = await Workspace.findOne({slug: req.body.slug})

    if(slugExists) {
        res.status(400)
        throw new Error ('Slug already exists')
    }

    console.log("USER: ", req.user.id)
    const workspace = await Workspace.create({
        name: req.body.name,
        slug: req.body.slug,
        owner: req.user.id,
        createdBy: req.user.id,
        updatedBy: req.user.id,
    })


    res.status(200).json({status: "success",workspace})
})

const getWorkspace =  asyncHandler(async (req, res) => {
    const workspaces = await Workspace.find({ createdBy: req.user.id}).populate({ path: 'owner', select: '-password -createdAt -updatedAt -__v' });
    res.status(200).json(workspaces)
})

const updateWorkspace =  asyncHandler(async (req, res) => {
    const workspace = await Workspace.findById(req.params.id)

    if (!workspace) {
        res.status(400)
        throw new Error('Workspace not Found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the todo user
    if(workspace.createdBy.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedWorkspace = await Workspace.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
    })

    res.status(200).json(updatedWorkspace)

})

const deleteWorkspace =  asyncHandler(async (req, res) => {
    const workspace = await Workspace.findById(req.params.id)

    if (!workspace) {
        res.status(400)
        throw new Error('workspace not Found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the todo user
    if(workspace.createdBy.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    await workspace.deleteOne()

    res.status(200).json({ status: "delete success", id: req.params.id})
})

module.exports = {
    getWorkspace, 
    setWorkspace, 
    updateWorkspace, 
    deleteWorkspace
}