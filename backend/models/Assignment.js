const mongoose = require("mongoose");


// ========================================
// ASSIGNMENT SCHEMA
// ========================================

const assignmentSchema = new mongoose.Schema(
  {
    // Every assignment belongs to
    // one authenticated user.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },


    // Assignment title
    title: {
      type: String,
      required: true,
      trim: true
    },


    // Subject name
    subject: {
      type: String,
      required: true,
      trim: true
    },


    // Optional topic
    topic: {
      type: String,
      default: "",
      trim: true
    },


    // Due date
    dueDate: {
      type: String,
      required: true
    },


    // Priority
    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High"
      ],
      default: "Medium"
    },


    // Description/details
    description: {
      type: String,
      default: "",
      trim: true
    },


    // Completion status
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