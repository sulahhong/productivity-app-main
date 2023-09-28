const mongoose = require('mongoose');

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
}, 
{
    timestamps: true
}
)

module.exports = mongoose.model('WorkspaceMember', workspaceMemberSchema)