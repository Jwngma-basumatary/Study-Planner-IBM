const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    // Every schedule belongs to the authenticated user
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

    date: {
      type: String,
      required: true
    },

    startTime: {
      type: String,
      required: true
    },

    endTime: {
      type: String,
      required: true
    },

    duration: {
      type: Number,
      default: 0
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
  "Schedule",
  scheduleSchema
);