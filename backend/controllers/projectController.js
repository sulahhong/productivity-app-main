const asyncHandler = require("express-async-handler");

const Project = require("../model/projectModel");
const Workspace = require("../model/workspaceModel");
const User = require("../model/userModel");
const ProjectMember = require("../model/projectMemberModel");
const ProjectJoinRequest = require("../model/projectJoinRequestModel");
const Role = require("../model/roleModel");
const {
  validWorkspace,
  validWorkspaceMember,
  getUserFromWorkspaceMember,
  getWorkspaceMemberFromList,
} = require("../service/workspaceService");
const {
  validProjectMember,
  validProject,
  projectMembers,
  isProjectMember,
  getProjectRoleFromUser,
  getWorkspaceRoleFromUser,
} = require("../service/projectService");
const { workspace: workspaceRole } = require("../rbac/workspace");
const { project: projectRole } = require("../rbac/project");

//========CREATE PROJECT========//
const setProject = asyncHandler(async (req, res) => {
  const workspace = await validWorkspace(res, req.params.slug);

  if (!req.body.title) {
    res.status(400);
    throw new Error("please add a title field");
  }
  if (!req.body.description) {
    res.status(400);
    throw new Error("please add a description field");
  }
  if (!req.body.identifier) {
    res.status(400);
    throw new Error("please add a identifier field");
  }
  if (!req.body.publicYn) {
    res.status(400);
    throw new Error("please add a publicYn field");
  }

  const project = await Project.create({
    title: req.body.title,
    description: req.body.description,
    identifier: req.body.identifier,
    workspace: workspace,
    publicYn: req.body.publicYn,
    projectLead: req.user.id,
    createdBy: req.user.id,
    updatedBy: req.user.id,
  });

  const projectMember = await ProjectMember.create({
    member: req.user.id,
    workspace: workspace,
    project: project._id,
    createdBy: req.user.id,
    joinedYn: true,
    role: projectRole.ADMIN,
  });

  res.status(200).json({ status: "ok", data: project });
});

//========GET PROJECT BY WORKSPACE========//
const getWorkspaceProject = asyncHandler(async (req, res) => {
  const workspace = await Workspace.findOne({ slug: req.params.slug });
  if (!workspace) {
    res.status(400);
    throw new Error("Workspace invalid");
  }

  const projects = await Project.find({ workspace: workspace });
  res.status(200).json({ status: "ok", data: projects });
});

//========GET JOINED PROJECT========//
const getJoinedProject = asyncHandler(async (req, res) => {
  const workspace = await validWorkspace(res, req.params.slug);
  await validWorkspaceMember(res, workspace._id, req.user.id);//gg

  const projectMember = await ProjectMember.find({
    member: req.user.id,
    workspace: workspace._id,
  }).populate({ path: "project" });

  let project = projectMember.map((item) => item.project);
  res.status(200).json({ status: "ok", data: project });
});

//========UPDATE PROJECT========//
const updateProject = asyncHandler(async (req, res) => {
  const project = await validProject(res, req.params.projectId);
  const workspace = await validWorkspace(res, req.params.slug);

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.projectId,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ status: "ok", data: updatedProject });
});

//========DELETE PROJECT========//
const deleteProject = asyncHandler(async (req, res) => {
  //gg
});

//========GET PROJECT MEMBERS========//
const getMembers = asyncHandler(async (req, res) => {
  const project = await validProject(res, req.params.projectId);
  const members = await projectMembers(res, project._id);
  res.status(200).json({ status: "ok", data: members });
});

//--------INVITE---------//----from workspace user list----
const inviteProject = asyncHandler(async (req, res) => {
  const project = await validProject(res, req.params.projectId);
  // await validProjectMember(res, req.params.projectId, req.user.id);
  const workspace = await validWorkspace(res, req.params.slug);

  // const projectRole = await getProjectRoleFromUser(project._id, req.user.id)
  // const workspaceRole = await getWorkspaceRoleFromUser(workspace._id, req.user.id)

  // if(!(projectRole === "1" || projectRole === "2" || workspaceRole === "1")){
  //   res.status(400)
  //   throw new Error('No authority to invite (you are Guest)')
  // }

  let verifiedWorkspaceMember = await getWorkspaceMemberFromList(
    res,
    req.body.workspaceMember,
    workspace._id
  );

  //check is User is already project member
  let invited = [];
  let notInvited = [];
  for (let workspaceMember of verifiedWorkspaceMember) {
    let projectMember = await isProjectMember(
      workspaceMember.member._id,
      project._id
    );
    if (projectMember == true) {
      notInvited.push(workspaceMember._id);
    } else {
      const projectMember = await ProjectMember.create({
        member: workspaceMember.member, //gg
        workspace: workspace._id,
        project: project._id,
        createdBy: req.user.id,
        joinedYn: true,
        role: projectRole.MEMBER,
      });
      invited.push(workspaceMember._id);
    }
  }

  res.status(200).json({ data: { invited: invited, notInvited: notInvited } });
});

//------JOIN REQUEST--------//
const joinProject = asyncHandler(async (req, res) => {
  const project = await validProject(res, req.params.projectId);
  const workspace = await validWorkspace(res, req.params.slug);

  const projectMember = await isProjectMember(req.user.id, project._id);
  if (projectMember) {
    res.status(400);
    throw new Error("User already is project member1");
  }

  if (
    project.publicYn ||
    req.workspaceRole == "OWNER" ||
    req.workspaceRole == "ADMIN"
  ) {
    const projectMember = await ProjectMember.create({
      member: req.user.id,
      workspace: workspace._id,
      project: project._id,
      createdBy: req.user.id,
      joinedYn: true,
      role: projectRole.MEMBER,
    });
    res.status(200).json({ status: "Joined project" });
  } else {
    const joinRequest = await ProjectJoinRequest.create({
      member: req.user.id,
      workspace: workspace._id,
      project: project._id,
      createdBy: req.user.id,
      acceptedYn: false,
    });

    res
      .status(202)
      .json({
        status:
          "This is a not a public project. Join request sent. Waiting for approval.",
      });
  }
});

//------APPROVE JOIN REQUEST-------//
const approveJoinRequest = asyncHandler(async (req, res) => {
  const joinRequest = await ProjectJoinRequest.findById(
    req.params.joinRequestId
  ).populate({ path: "member" });
  console.log("1", req.params.joinRequestId);
  console.log("2", joinRequest);
  if (!joinRequest) {
    res.status(400);
    throw new Error("invalid joinRequestId");
  }

  const project = await validProject(res, joinRequest.project);

  if (joinRequest.acceptedYn) {
    res.status(400);
    throw new Error("invalid joinRequestId. User has already been approved");
  }

  const projectMemberFound = await isProjectMember(
    joinRequest.member,
    project._id
  );
  if (projectMemberFound) {
    res.status(400);
    throw new Error("User already is project member1");
  }
  const projectMember = await ProjectMember.create({
    member: joinRequest.member,
    workspace: project.workspace,
    project: project._id,
    createdBy: req.user.id,
    joinedYn: true,
    role: projectRole.MEMBER,
  });

  await ProjectJoinRequest.findByIdAndUpdate(req.params.joinRequestId, {
    acceptedYn: true,
  });

  res.status(200).json(projectMember);
});

module.exports = {
  getWorkspaceProject,
  setProject,
  updateProject,
  deleteProject,
  inviteProject,
  getMembers,
  getJoinedProject,
  joinProject,
  approveJoinRequest,
};
