const asyncHandler = require('express-async-handler')

const Project = require('../model/projectModel')
const Label = require('../model/labelModel')
const User = require('../model/userModel')
const Priority = require('../model/priorityModel')
const Status = require('../model/statusModel')
const { validProject, validProjectMember } = require('../service/projectService')
const { validWorkspace } = require('../service/workspaceService')

const getWorkspaceLabel = asyncHandler(async (req, res) => {
    const workspace = await validWorkspace(res, req.params.slug);

    const labels = await Label.find({workspace: workspace._id}).populate([
        { path: "project", select: "title description identifier publicYn" },
        { path: "workspace", select: "name slug" }])
    res.status(200).json({data: labels})
})

const getLabel = asyncHandler(async (req, res) => {

    const project = await validProject(res, req.params.projectId )
    await validProjectMember(res, project._id, req.user.id )

    const labels = await Label.find({ project: req.params.projectId}).populate([
        { path: "project", select: "title description identifier publicYn" },
        { path: "workspace", select: "name slug" }])
    res.status(200).json({data: labels})
})

const setLabel = asyncHandler(async (req, res) => {
    const workspace = await validWorkspace(res, req.params.slug);
    const project = await validProject(res, req.params.projectId )

    if  (!req.body.name) {
        res.status(400)
        throw new Error('please add a label name field')
    }
    if  (!req.body.color) {
        res.status(400)
        throw new Error('please select a label color')
    }

    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    if(!(hexColorRegex.test(req.body.color))){
        res.status(400)
        throw new Error('Invalid label hexadecimal color')
    }

    const label = await Label.create({
        createdBy: req.user.id,
        name: req.body.name,
        color: req.body.color, 
        project: project._id,
        workspace: workspace._id
    })

    res.status(200).json(label)
})

const updateLabel = asyncHandler(async (req, res) => {
    const project = await validProject(res, req.params.projectId )

    const label = await Label.findById(req.params.labelId)

    if (!label) {
        res.status(400)
        throw new Error('Label not Found')
    }

    if  (!req.body.name) {
        res.status(400)
        throw new Error('please add a label name field')
    }
    if  (!req.body.color) {
        res.status(400)
        throw new Error('please select a label color')
    }

    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if(!(hexColorRegex.test(req.body.color))){
        res.status(400)
        throw new Error('Invalid label hexadecimal color')
    }

    const updatedLabel = await Label.findByIdAndUpdate(label._id, req.body, {
        new: true, 
    })
    res.status(200).json(updatedLabel)
})

const deleteLabel = asyncHandler(async (req, res) => {
    const project = await validProject(res, req.params.projectId )
    const label = await Label.findById(req.params.labelId)

    if (!label) {
        res.status(400)
        throw new Error('Label not Found')
    }
    await label.deleteOne()

    res.status(200).json({ status: "delete success", id: req.params.labelId})
})

module.exports = {
    getLabel, 
    setLabel, 
    updateLabel, 
    deleteLabel, getWorkspaceLabel
}