const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const WorkspaceMember = require("../model/workspaceMemberModel");
const Project = require('../model/projectModel')
const Workspace = require("../model/workspaceModel");

const ProjectMember = require('../model/projectMemberModel')

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];
      console.log("Token: ", token);

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded", decoded);
      // Get user from the token
      let user = await User.findById(decoded.id).select("-password");
      if (!user) {
        res.status(401);
        throw new Error("Not authorized, user invalid");
      }
      req.user = user;
      console.log("user", req.user);

      //start
//       const workspace = await Workspace.findOne({ slug: req.params.slug })
// console.log("TEST0", workspace)
    
//     const workspaceMember = await WorkspaceMember.findOne({member: req.user.id, workspace: workspace._id }).populate({path: "role"})
//     const projectMember = await ProjectMember.findOne({member: req.user.id, project: req.params.projectId }).populate({path: "role"})
// console.log("TEST1", workspaceMember)
// console.log("TEST2", projectMember)

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
      // res.status(401).json({ message: error.message });
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
