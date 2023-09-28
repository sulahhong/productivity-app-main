const mongoose = require('mongoose');

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
}, 
{
    timestamps: true
}
)

module.exports = mongoose.model('Invite', inviteSchema)