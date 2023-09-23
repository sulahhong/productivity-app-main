const mongoose = require('mongoose')

const workspaceSchema = mongoose.Schema({
    logo: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    }, 
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
    },

},
{
    timestamps: true,
  }
  )

module.exports = mongoose.model("Workspace", workspaceSchema);