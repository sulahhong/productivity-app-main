const mongoose = require('mongoose');
const { workspace } = require('../rbac/workspace');

const inviteSchema = mongoose.Schema({

    
    workspace: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Workspace'
    },
    email: {
        type: String,
        required: true
      },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
    },
    acceptedYn: {
        type: Boolean,
        default: false,
      },
      role: {
        type: String,
        enum: Object.values(workspace),
        default: workspace.MEMBER,
      }
}, 
{
    timestamps: true
}
)

module.exports = mongoose.model('Invite', inviteSchema)