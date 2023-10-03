const asyncHandler = require("express-async-handler");

const Workspace = require("../model/workspaceModel");
const User = require("../model/userModel");
const WorkspaceMember = require("../model/workspaceMemberModel");
const Invite = require("../model/inviteModel");
const Role = require("../model/roleModel");

const {
  validWorkspace,
  validWorkspaceMember,
  workspaceMembers,
  getRoleFromUser,
} = require("../service/workspaceService");
const { workspace: workspaceRole } = require("../rbac/workspace");

//========CREATE WORKSPACE========//
const setWorkspace = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("please add a name field");
  }
  if (!req.body.slug) {
    res.status(400);
    throw new Error("please add a slug");
  }

  const slugExists = await Workspace.findOne({ slug: req.body.slug });
  if (slugExists) {
    res.status(400);
    throw new Error("Slug already exists");
  }

  const workspace = await Workspace.create({
    name: req.body.name,
    slug: req.body.slug,
    owner: req.user.id,
    createdBy: req.user.id,
    updatedBy: req.user.id,
  });

  const workspaceMember = await WorkspaceMember.create({
    member: req.user.id,
    workspace: workspace._id,
    createdBy: req.user.id,
    joinedYn: true,
    role: workspaceRole.OWNER,
  });

  res.status(200).json({ status: "ok", data: workspace });
});

//========GET CREATED WORKSPACE========//
const getCreatedWorkspace = asyncHandler(async (req, res) => {
  const workspaces = await Workspace.find({ createdBy: req.user.id }).populate({
    path: "owner",
    select: "-password -createdAt -updatedAt -__v",
  });
  res.status(200).json({ status: "ok", data: workspaces });
});

//========GET JOINED WORKSPACE========//
const getJoinedWorkspace = asyncHandler(async (req, res) => {
  const workspaceMember = await WorkspaceMember.find({
    member: req.user.id,
    joinedYn: true,
  }).populate({
    path: "workspace",
    populate: {
      path: "owner",
      select: "-password -createdAt -updatedAt -__v",
    },
  });
  const workspace = workspaceMember.map((item) => item.workspace);
  res.status(200).json({ status:"ok", data: workspace });
});

//========UPDATE WORKSPACE========//
const updateWorkspace = asyncHandler(async (req, res) => {
  const workspace = await validWorkspace(res, req.params.slug);

  if (req.params.slug != req.body.slug) {
    const slugExists = await Workspace.findOne({ slug: req.body.slug });
    if (slugExists) {
      res.status(400);
      throw new Error("Slug already exists");
    }
  }

  const updatedWorkspace = await Workspace.findByIdAndUpdate(
    workspace._id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ status: "ok", data: updatedWorkspace });
});

//========DELETE WORKSPACE========//
const deleteWorkspace = asyncHandler(async (req, res) => {
  const workspace = await validWorkspace(res, req.params.slug);

  await workspace.deleteOne();
  await WorkspaceMember.deleteMany({ workspace: workspace._id });
  res.status(200).json({ status: "ok" });
});

//========GET WORKSPACE MEMBERS========//
const getMembers = asyncHandler(async (req, res) => {
  const workspace = await validWorkspace(res, req.params.slug);
  await validWorkspaceMember(res, workspace._id, req.user.id);
  const members = await workspaceMembers(res, workspace._id);
  res.status(200).json({ status: "ok", data: members });
});

//========INVITE TO WORKSPACE========//
const inviteWorkspace = asyncHandler(async (req, res) => {
  const workspace = await validWorkspace(res, req.params.slug);

  if (!req.body.user) {
    res.status(400);
    throw new Error("please add invite user");
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const inviteList = req.body.user;
  let notEmailList = [];
  let inviteExistList = [];
  let sentList = [];
  for (let i = 0; i < inviteList.length; i++) {
    const user = inviteList[i];

    if (!isValidEmail(user.email)) {
      notEmailList.push(user.email);
      continue
    }

    const inviteExist = await Invite.findOne({
      email: user.email,
      workspace: workspace._id,
    });
    if (inviteExist) {
      inviteExistList.push(user.email);
      continue
    }

    if (!workspaceRole.hasOwnProperty(user.role)) {
      user.role = "GUEST";
    }
    const invite = await Invite.create({
      workspace: workspace._id,
      email: user.email,
      createdBy: req.user.id,
      acceptedYn: false,
      role: user.role,
    });
    sentList.push(user.email);
  }

  res.status(200).json({
    status: "ok",
    notEmail: notEmailList,
    sentList: sentList,
    inviteExists: inviteExistList,
  });
});

//========JOIN WORKSPACE========//
const joinWorkspace = asyncHandler(async (req, res) => {

  const invite = await Invite.findById(req.params.inviteId);
  if (!invite) {
    res.status(400);
    throw new Error("Invite ID invalid");
  }

  if (invite.acceptedYn == true) {
    res.status(400);
    throw new Error("User already joined workspace");
  }

  const workspace = await Workspace.findById(invite.workspace)
  if (!workspace) {
    res.status(400);
    throw new Error("Invite workspace invalid");
  }

  if (req.user.email != invite.email) {
    res.status(400);
    throw new Error("User email invalid");
  }
    const role = workspaceRole.hasOwnProperty(invite.role)
      ? invite.role
      : workspaceRole.GUEST;

    const workspaceMember = await WorkspaceMember.create({
      member: req.user.id,
      workspace: workspace._id,
      createdBy: invite.createdBy._id,
      joinedYn: true,
      role: role,
    });

    await Invite.findByIdAndUpdate(invite._id, {
      acceptedYn: true,
    });

    res.status(200).json({ status: "success. joined workspace", workspace });
  
});

module.exports = {
  getCreatedWorkspace,
  setWorkspace,
  updateWorkspace,
  deleteWorkspace,
  inviteWorkspace,
  getMembers,
  joinWorkspace,
  getJoinedWorkspace,
};
