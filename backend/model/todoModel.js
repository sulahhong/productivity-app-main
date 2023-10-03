const mongoose = require("mongoose");
const { PRIORITY, STATUS } = require("./code");

// const PRIORITY = {
//   1: {
//     sid: 1,
//     title: "Backlog"
//   },
//   2: {
//     sid: 2,
//     title: "Todo"
//   },
//   3: {
//     sid: 3,
//     title: "In Progress"
//   },
// }

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
      type: Object,
      enum: Object.values(PRIORITY),
      default: PRIORITY[0],
      required: true, 
    },
    // priority: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "Priority",
    // },

    status: {
      type: Object,
      enum: Object.values(STATUS),
      default: STATUS[0],
      required: true, 
    },
    // status: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "Status",
    // },
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
// module.exports.PRIORITY = PRIORITY;