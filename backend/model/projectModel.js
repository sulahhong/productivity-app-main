const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
        projectlId: {
            type: String,
            required: true,
        }, 
        projectTitle: {
            type: String,
            required: true,
        },
        projectDescription: {
            type: String,
            required: true,
        }
    }, 
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Project", projectSchema)

