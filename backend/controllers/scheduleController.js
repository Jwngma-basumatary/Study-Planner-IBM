const mongoose = require("mongoose");
const Schedule = require("../models/Schedule");




const isValidId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};




const calculateDuration = (
  startTime,
  endTime
) => {

  if (!startTime || !endTime) {
    return 0;
  }

  const [startHour, startMinute] =
    startTime.split(":").map(Number);

  const [endHour, endMinute] =
    endTime.split(":").map(Number);

  const start =
    startHour * 60 + startMinute;

  const end =
    endHour * 60 + endMinute;

  let difference = end - start;

  
  if (difference < 0) {
    difference += 24 * 60;
  }

  return difference;
};



const getSchedules = async (req, res) => {

  try {

    const { date } = req.query;

    const filter = {
      user: req.user
    };

    // Optional date filter
    if (date) {
      filter.date = date;
    }

    const schedules =
      await Schedule.find(filter)
        .sort({
          date: 1,
          startTime: 1
        });

    return res.json({
      schedules
    });

  } catch (error) {

    console.error(
      "Get schedules error:",
      error
    );

    return res.status(500).json({
      message: "Unable to load schedules."
    });
  }
};




const createSchedule = async (
  req,
  res
) => {

  try {

    const {
      title,
      subject,
      topic,
      date,
      startTime,
      endTime,
      description
    } = req.body;


    if (
      !title ||
      !subject ||
      !date ||
      !startTime ||
      !endTime
    ) {

      return res.status(400).json({
        message:
          "Please fill all required fields."
      });
    }


    const duration =
      calculateDuration(
        startTime,
        endTime
      );


    if (duration <= 0) {

      return res.status(400).json({
        message:
          "End time must be after start time."
      });
    }


    const schedule =
      await Schedule.create({

        
        user: req.user,

        title: title.trim(),

        subject: subject.trim(),

        topic:
          topic
            ? topic.trim()
            : "",

        date,

        startTime,

        endTime,

        duration,

        description:
          description
            ? description.trim()
            : "",

        completed: false
      });


    return res.status(201).json({
      message:
        "Schedule created successfully.",
      schedule
    });

  } catch (error) {

    console.error(
      "Create schedule error:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to create schedule."
    });
  }
};




const updateSchedule = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const {
      title,
      subject,
      topic,
      date,
      startTime,
      endTime,
      description
    } = req.body;


    if (!isValidId(id)) {

      return res.status(400).json({
        message: "Invalid schedule ID."
      });
    }


    if (
      !title ||
      !subject ||
      !date ||
      !startTime ||
      !endTime
    ) {

      return res.status(400).json({
        message:
          "Please fill all required fields."
      });
    }


    const duration =
      calculateDuration(
        startTime,
        endTime
      );


    if (duration <= 0) {

      return res.status(400).json({
        message:
          "End time must be after start time."
      });
    }


    
    const schedule =
      await Schedule.findOne({
        _id: id,
        user: req.user
      });


    if (!schedule) {

      return res.status(404).json({
        message: "Schedule not found."
      });
    }


    schedule.title =
      title.trim();

    schedule.subject =
      subject.trim();

    schedule.topic =
      topic
        ? topic.trim()
        : "";

    schedule.date =
      date;

    schedule.startTime =
      startTime;

    schedule.endTime =
      endTime;

    schedule.duration =
      duration;

    schedule.description =
      description
        ? description.trim()
        : "";


    await schedule.save();


    return res.json({
      message:
        "Schedule updated successfully.",
      schedule
    });

  } catch (error) {

    console.error(
      "Update schedule error:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to update schedule."
    });
  }
};




const deleteSchedule = async (
  req,
  res
) => {

  try {

    const { id } = req.params;


    if (!isValidId(id)) {

      return res.status(400).json({
        message: "Invalid schedule ID."
      });
    }


    const schedule =
      await Schedule.findOneAndDelete({
        _id: id,
        user: req.user
      });


    if (!schedule) {

      return res.status(404).json({
        message: "Schedule not found."
      });
    }


    return res.json({
      message:
        "Schedule deleted successfully."
    });

  } catch (error) {

    console.error(
      "Delete schedule error:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to delete schedule."
    });
  }
};



const toggleSchedule = async (
  req,
  res
) => {

  try {

    const { id } = req.params;


    if (!isValidId(id)) {

      return res.status(400).json({
        message: "Invalid schedule ID."
      });
    }


    const schedule =
      await Schedule.findOne({
        _id: id,
        user: req.user
      });


    if (!schedule) {

      return res.status(404).json({
        message: "Schedule not found."
      });
    }


    schedule.completed =
      !schedule.completed;


    await schedule.save();


    return res.json({
      message:
        schedule.completed
          ? "Schedule marked completed."
          : "Schedule marked incomplete.",
      schedule
    });

  } catch (error) {

    console.error(
      "Toggle schedule error:",
      error
    );

    return res.status(500).json({
      message:
        "Unable to update schedule."
    });
  }
};


module.exports = {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  toggleSchedule
};
