const mongoose = require('mongoose');
const { workspace } = require('../rbac/workspace');

// const ROLES = {
//     OWNER: 'OWNER',
//     ADMIN: 'ADMIN',
//     MEMBER: 'MEMBER',
//     VIEWER: 'VIEWER'
//   };

const workspaceMemberSchema = mongoose.Schema({

    member: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Workspace'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
    },
    joinedYn: {
        type: Boolean,
        default: false,
      },
      role: {
        type: String,
        enum: Object.values(workspace),
        default: workspace.MEMBER,
        required: true, 
      }
}, 
{
    timestamps: true
}
)

module.exports = mongoose.model('WorkspaceMember', workspaceMemberSchema)
// module.exports.ROLES = ROLES;
