const mongoose = require("mongoose");

const statusSchema = mongoose.Schema(
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

module.exports = mongoose.model("Status", statusSchema)  