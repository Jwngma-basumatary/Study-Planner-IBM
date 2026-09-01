const mongoose = require("mongoose");



const assignmentSchema = new mongoose.Schema(
  {
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },


    title: {
      type: String,
      required: true,
      trim: true
    },


    subject: {
      type: String,
      required: true,
      trim: true
    },


    topic: {
      type: String,
      default: "",
      trim: true
    },


    dueDate: {
      type: String,
      required: true
    },


    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High"
      ],
      default: "Medium"
    },


    description: {
      type: String,
      default: "",
      trim: true
    },


    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model(
  "Assignment",
  assignmentSchema
);
