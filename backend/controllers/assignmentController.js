const mongoose = require("mongoose");

const Assignment =
  require("../models/Assignment");


const isValidId = (id) => {

  return mongoose.Types.ObjectId.isValid(id);

};


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

    if (status === "completed") {

      filter.completed = true;

    }


    if (status === "pending") {

      filter.completed = false;

    }


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


    if (!isValidId(id)) {

      return res.status(400).json({
        message:
          "Invalid assignment ID."
      });

    }


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
