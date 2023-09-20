const mongoose = require("mongoose");

const labelSchema = mongoose.Schema(
    {
        // labelId: {
        //     type: String,
        //     required: true,
        // }, 
        labelName: {
            type: String,
            required: true,
        },
        labelColor: {
            type: String,
            required: true,
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

