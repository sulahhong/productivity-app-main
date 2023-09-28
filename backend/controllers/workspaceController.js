const asyncHandler = require('express-async-handler')

const Workspace = require('../model/workspaceModel')
const User = require('../model/userModel')
const WorkspaceMember = require("../model/workspaceMemberModel");
const Invite = require("../model/inviteModel");

const { validWorkspace, validWorkspaceMember, workspaceMembers } = require('../service/workspaceService')


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

    const workspaceMember = await WorkspaceMember.create({
        member: req.user.id,
        workspace: workspace._id,
        createdBy: req.user.id,
        joinedYn: true,
      });


    res.status(200).json({status: "success",workspace})
})

const getWorkspace =  asyncHandler(async (req, res) => {
    const workspaces = await Workspace.find({ createdBy: req.user.id}).populate({ path: 'owner', select: '-password -createdAt -updatedAt -__v' });
    res.status(200).json(workspaces)
})

const updateWorkspace =  asyncHandler(async (req, res) => {
    const workspace= await validWorkspace(res, req.params.slug) 

    const user = await User.findById(req.user.id)

    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    console.log("workspace", workspace.createdBy) 
    //Make sure the logged in user matches the todo user
    if(workspace.createdBy.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedWorkspace = await Workspace.findByIdAndUpdate(workspace._id, req.body, {
        new: true, 
    })

    res.status(200).json(updatedWorkspace)

})

const deleteWorkspace =  asyncHandler(async (req, res) => {
    const workspace= await validWorkspace(res, req.params.slug) 

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

    res.status(200).json({ status: "delete success"})
})

// ----------------------GET MEMBER-----------------------------//
const getMembers = asyncHandler(async (req, res) => {
    console.log("i ran", req.params);
  const workspace = await validWorkspace(res, req.params.slug);
    console.log("workspace", workspace);

  await validWorkspaceMember(res,workspace._id, req.user.id);

  const members = await workspaceMembers(res, workspace._id);
    console.log("members", members);

  res.status(200).json(members);
});

// ----------------------INVITE-----------------------------//
const inviteWorkspace = asyncHandler(async (req, res) => {
    const workspace = await validWorkspace(res, req.params.slug);
    console.log("workspace", workspace);
  await validWorkspaceMember(res, workspace._id, req.user.id);

  if (!req.body.email) {
    res.status(400);
    throw new Error("please add invite email");
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const inviteList=req.body.email
  let notEmailList = []
  let sentList = []
  for(let i = 0; i < inviteList.length; i++){
    const email=inviteList[i]

    //check if already sent????

    if(isValidEmail(email)){
        const invite = await Invite.create({
            workspace: workspace._id,
            email: email,
            createdBy: req.user.id,
    
            acceptedYn: false
        })
        sentList.push(email)
        console.log("INVITE: ", invite)
    }else{
        notEmailList.push(email)
    }
    
    
  }

  res.status(200).json({"status":"success!", "notEmail": notEmailList, "sentList": sentList});
});

// ----------------------JOIN TYPE 1-----------------------------//
const joinWorkspace = asyncHandler(async (req, res) => {
    const workspace = await validWorkspace(res, req.params.slug);

    const invite = await Invite.findById( req.params.inviteId)
    if (!invite) {
        res.status(400);
        throw new Error("Invite ID invalid");
      }

      console.log("INVITE", invite)
    if(invite.acceptedYn==true){
        res.status(400);
        throw new Error("User already joined worspace");
    }
console.log("user", req.user.email)
console.log("email", invite.email )
    if(req.user.email == invite.email){
        const workspaceMember = await WorkspaceMember.create({
            member: req.user.id,
            workspace: workspace._id,
            createdBy: invite.createdBy._id,
            joinedYn: true,
          });

         await Invite.findByIdAndUpdate(invite._id, {
            acceptedYn: true
          })
        
          res.status(200).json({ status: "success. joined workspace", workspace });
    }
})

module.exports = {
    getWorkspace, 
    setWorkspace, 
    updateWorkspace, 
    deleteWorkspace, inviteWorkspace, getMembers, joinWorkspace
}