const mongoose = require("mongoose");

const prioritySchema = mongoose.Schema(
    {

        sid: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },


        }, 
   
)

module.exports = mongoose.model("Priority", prioritySchema)