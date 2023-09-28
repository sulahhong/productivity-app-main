const mongoose = require('mongoose');

const projectMemberSchema = mongoose.Schema({

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
    project: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Project'
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

module.exports = mongoose.model('projectMember', projectMemberSchema)