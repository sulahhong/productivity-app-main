const mongoose = require("mongoose");

const labelSchema = mongoose.Schema(
    {
        // labelId: {
        //     type: String,
        //     required: true,
        // }, 
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
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

        }, 
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Label", labelSchema)

