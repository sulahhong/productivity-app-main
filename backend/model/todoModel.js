const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    doneYn: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
  
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    priority: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Priority",
    },

    status: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Status",
    },
    label: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Workspace",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
