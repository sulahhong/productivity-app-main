const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {

        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
       identifier: {
            type: String,
            required: true,
        },
        projectLead: {
            type: mongoose.Schema.Types.ObjectId, 

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

module.exports = mongoose.model("Project", projectSchema)

