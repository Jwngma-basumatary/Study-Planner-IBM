const mongoose = require("mongoose");

const Assignment =
  require("../models/Assignment");


// ========================================
// HELPER
// ========================================

const isValidId = (id) => {

  return mongoose.Types.ObjectId.isValid(id);

};


// ========================================
// GET ASSIGNMENTS
//
// GET /api/assignments
//
// Optional:
// /api/assignments?status=pending
// /api/assignments?status=completed
// /api/assignments?priority=High
// /api/assignments?subject=Database
// ========================================

const getAssignments = async (
  req,
  res
) => {

  try {

    const {
      status,
      priority,
      subject
    } = req.query;


    // VERY IMPORTANT:
    // Only get assignments belonging
    // to the logged-in user.
    const filter = {
      user: req.user
    };


    // ====================================
    // STATUS FILTER
    // ====================================

    if (status === "completed") {

      filter.completed = true;

    }


    if (status === "pending") {

      filter.completed = false;

    }


    // ====================================
    // PRIORITY FILTER
    // ====================================

    if (
      priority &&
      [
        "Low",
        "Medium",
        "High"
      ].includes(priority)
    ) {

      filter.priority =
        priority;

    }


    // ====================================
    // SUBJECT FILTER
    // ====================================

    if (subject) {

      filter.subject = subject;

    }


    const assignments =
      await Assignment.find(
        filter
      ).sort({
        completed: 1,
        dueDate: 1,
        createdAt: -1
      });


    return res.json({
      assignments
    });

  } catch (error) {

    console.error(
      "Get assignments error:",
      error
    );


    return res.status(500).json({
      message:
        "Unable to load assignments."
    });

  }

};


// ========================================
// CREATE ASSIGNMENT
//
// POST /api/assignments
// ========================================

const createAssignment = async (
  req,
  res
) => {

  try {

    const {
      title,
      subject,
      topic,
      dueDate,
      priority,
      description
    } = req.body;


    // ====================================
    // VALIDATION
    // ====================================

    if (
      !title ||
      !subject ||
      !dueDate
    ) {

      return res.status(400).json({
        message:
          "Title, subject and due date are required."
      });

    }


    // ====================================
    // VALID PRIORITY
    // ====================================

    const validPriorities = [
      "Low",
      "Medium",
      "High"
    ];


    const assignmentPriority =
      validPriorities.includes(
        priority
      )
        ? priority
        : "Medium";


    // ====================================
    // CREATE
    // ====================================

    const assignment =
      await Assignment.create({

        // Comes from JWT
        user: req.user,

        title:
          title.trim(),

        subject:
          subject.trim(),

        topic:
          topic
            ? topic.trim()
            : "",

        dueDate,

        priority:
          assignmentPriority,

        description:
          description
            ? description.trim()
            : "",

        completed: false

      });


    return res.status(201).json({

      message:
        "Assignment created successfully.",

      assignment

    });

  } catch (error) {

    console.error(
      "Create assignment error:",
      error
    );


    return res.status(500).json({
      message:
        "Unable to create assignment."
    });

  }

};


// ========================================
// UPDATE ASSIGNMENT
//
// PUT /api/assignments/:id
// ========================================

const updateAssignment = async (
  req,
  res
) => {

  try {

    const {
      id
    } = req.params;


    const {
      title,
      subject,
      topic,
      dueDate,
      priority,
      description
    } = req.body;


    // ====================================
    // VALID ID
    // ====================================

    if (!isValidId(id)) {

      return res.status(400).json({
        message:
          "Invalid assignment ID."
      });

    }


    // ====================================
    // REQUIRED FIELDS
    // ====================================

    if (
      !title ||
      !subject ||
      !dueDate
    ) {

      return res.status(400).json({
        message:
          "Title, subject and due date are required."
      });

    }


    // ====================================
    // PRIORITY
    // ====================================

    const validPriorities = [
      "Low",
      "Medium",
      "High"
    ];


    const assignmentPriority =
      validPriorities.includes(
        priority
      )
        ? priority
        : "Medium";


    // ====================================
    // FIND USER'S ASSIGNMENT
    // ====================================

    const assignment =
      await Assignment.findOne({
        _id: id,
        user: req.user
      });


    if (!assignment) {

      return res.status(404).json({
        message:
          "Assignment not found."
      });

    }


    // ====================================
    // UPDATE
    // ====================================

    assignment.title =
      title.trim();

    assignment.subject =
      subject.trim();

    assignment.topic =
      topic
        ? topic.trim()
        : "";

    assignment.dueDate =
      dueDate;

    assignment.priority =
      assignmentPriority;

    assignment.description =
      description
        ? description.trim()
        : "";


    await assignment.save();


    return res.json({

      message:
        "Assignment updated successfully.",

      assignment

    });

  } catch (error) {

    console.error(
      "Update assignment error:",
      error
    );


    return res.status(500).json({
      message:
        "Unable to update assignment."
    });

  }

};


// ========================================
// DELETE ASSIGNMENT
//
// DELETE /api/assignments/:id
// ========================================

const deleteAssignment = async (
  req,
  res
) => {

  try {

    const {
      id
    } = req.params;


    if (!isValidId(id)) {

      return res.status(400).json({
        message:
          "Invalid assignment ID."
      });

    }


    // Only delete the logged-in
    // user's assignment.
    const assignment =
      await Assignment.findOneAndDelete({
        _id: id,
        user: req.user
      });


    if (!assignment) {

      return res.status(404).json({
        message:
          "Assignment not found."
      });

    }


    return res.json({

      message:
        "Assignment deleted successfully."

    });

  } catch (error) {

    console.error(
      "Delete assignment error:",
      error
    );


    return res.status(500).json({
      message:
        "Unable to delete assignment."
    });

  }

};


// ========================================
// TOGGLE COMPLETION
//
// PATCH /api/assignments/:id/toggle
// ========================================

const toggleAssignment = async (
  req,
  res
) => {

  try {

    const {
      id
    } = req.params;


    if (!isValidId(id)) {

      return res.status(400).json({
        message:
          "Invalid assignment ID."
      });

    }


    const assignment =
      await Assignment.findOne({
        _id: id,
        user: req.user
      });


    if (!assignment) {

      return res.status(404).json({
        message:
          "Assignment not found."
      });

    }


    // Toggle:
    // false → true
    // true → false
    assignment.completed =
      !assignment.completed;


    await assignment.save();


    return res.json({

      message:
        assignment.completed
          ? "Assignment marked completed."
          : "Assignment marked incomplete.",

      assignment

    });

  } catch (error) {

    console.error(
      "Toggle assignment error:",
      error
    );


    return res.status(500).json({
      message:
        "Unable to update assignment."
    });

  }

};


module.exports = {

  getAssignments,

  createAssignment,

  updateAssignment,

  deleteAssignment,

  toggleAssignment

};