const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'
    },
      todoTitle: {
        type: String,
        required: true,
      },
      todoDescription: {
        type: String,
        required: true,
      },
      todoDone: {
        type: Boolean,
        default: false,
      },
      todoDueDate: {
        type: Date,
        // required: true,
      },
    //   projectId: {
    //     type: String,
    //     required: true,
    //   },
    //   projectTitle: {
    //     type: String,
    //     required: true,
    //   },
      priorityId: {
        type: String,
        required: true,
      },
      priorityTitle: {
        type: String,
        required: true,
      },
      label: [{type: mongoose.Schema.Types.ObjectId, ref:'Label' }],
      statusId: {
        type: String,
        required: true,
      },
      statusTitle: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
 