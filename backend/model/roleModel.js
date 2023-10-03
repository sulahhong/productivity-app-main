const mongoose = require("mongoose");

const roleSchema = mongoose.Schema(
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

module.exports = mongoose.model("Role", roleSchema)  