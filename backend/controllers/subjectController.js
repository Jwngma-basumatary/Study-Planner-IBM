const mongoose = require("mongoose");
const Subject = require("../models/Subject");




const isValidId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};




const getSubjects = async (req, res) => {

  try {

    
    const subjects = await Subject.find({
      user: req.user
    }).sort({
      createdAt: -1
    });


    return res.json({
      subjects
    });

  } catch (error) {

    console.error(
      "Get subjects error:",
      error
    );

    return res.status(500).json({
      message: "Unable to load subjects."
    });
  }
};




const createSubject = async (req, res) => {

  try {

    const {
      name,
      description
    } = req.body;


    if (!name || !name.trim()) {

      return res.status(400).json({
        message: "Subject name is required."
      });
    }


    const subject = await Subject.create({

      user: req.user,

      name: name.trim(),

      description:
        description
          ? description.trim()
          : "",

      chapters: []
    });


    return res.status(201).json({
      message: "Subject created successfully.",
      subject
    });

  } catch (error) {

    console.error(
      "Create subject error:",
      error
    );

    return res.status(500).json({
      message: "Unable to create subject."
    });
  }
};




const updateSubject = async (req, res) => {

  try {

    const {
      id
    } = req.params;

    const {
      name,
      description
    } = req.body;


    if (!isValidId(id)) {

      return res.status(400).json({
        message: "Invalid subject ID."
      });
    }


    if (!name || !name.trim()) {

      return res.status(400).json({
        message: "Subject name is required."
      });
    }


    
    const subject =
      await Subject.findOne({
        _id: id,
        user: req.user
      });


    if (!subject) {

      return res.status(404).json({
        message: "Subject not found."
      });
    }


    subject.name = name.trim();

    subject.description =
      description
        ? description.trim()
        : "";


    await subject.save();


    return res.json({
      message: "Subject updated successfully.",
      subject
    });

  } catch (error) {

    console.error(
      "Update subject error:",
      error
    );

    return res.status(500).json({
      message: "Unable to update subject."
    });
  }
};



const deleteSubject = async (req, res) => {

  try {

    const {
      id
    } = req.params;


    if (!isValidId(id)) {

      return res.status(400).json({
        message: "Invalid subject ID."
      });
    }


    
    const subject =
      await Subject.findOneAndDelete({
        _id: id,
        user: req.user
      });


    if (!subject) {

      return res.status(404).json({
        message: "Subject not found."
      });
    }


    return res.json({
      message: "Subject deleted successfully."
    });

  } catch (error) {

    console.error(
      "Delete subject error:",
      error
    );

    return res.status(500).json({
      message: "Unable to delete subject."
    });
  }
};



const addChapter = async (req, res) => {

  try {

    const {
      id
    } = req.params;

    const {
      title,
      description
    } = req.body;


    if (!isValidId(id)) {

      return res.status(400).json({
        message: "Invalid subject ID."
      });
    }


    if (!title || !title.trim()) {

      return res.status(400).json({
        message: "Chapter title is required."
      });
    }


    const subject =
      await Subject.findOne({
        _id: id,
        user: req.user
      });


    if (!subject) {

      return res.status(404).json({
        message: "Subject not found."
      });
    }


    subject.chapters.push({
      title: title.trim(),

      description:
        description
          ? description.trim()
          : "",

      completed: false
    });


    await subject.save();


    return res.status(201).json({
      message: "Chapter added successfully.",
      subject
    });

  } catch (error) {

    console.error(
      "Add chapter error:",
      error
    );

    return res.status(500).json({
      message: "Unable to add chapter."
    });
  }
};


const updateChapter = async (req, res) => {

  try {

    const {
      id,
      chapterId
    } = req.params;


    const {
      title,
      description
    } = req.body;


    if (
      !isValidId(id) ||
      !isValidId(chapterId)
    ) {

      return res.status(400).json({
        message: "Invalid ID."
      });
    }


    if (!title || !title.trim()) {

      return res.status(400).json({
        message: "Chapter title is required."
      });
    }


    const subject =
      await Subject.findOne({
        _id: id,
        user: req.user
      });


    if (!subject) {

      return res.status(404).json({
        message: "Subject not found."
      });
    }


    const chapter =
      subject.chapters.id(chapterId);


    if (!chapter) {

      return res.status(404).json({
        message: "Chapter not found."
      });
    }


    chapter.title = title.trim();

    chapter.description =
      description
        ? description.trim()
        : "";


    await subject.save();


    return res.json({
      message: "Chapter updated successfully.",
      subject
    });

  } catch (error) {

    console.error(
      "Update chapter error:",
      error
    );

    return res.status(500).json({
      message: "Unable to update chapter."
    });
  }
};



const deleteChapter = async (req, res) => {

  try {

    const {
      id,
      chapterId
    } = req.params;


    if (
      !isValidId(id) ||
      !isValidId(chapterId)
    ) {

      return res.status(400).json({
        message: "Invalid ID."
      });
    }


    const subject =
      await Subject.findOne({
        _id: id,
        user: req.user
      });


    if (!subject) {

      return res.status(404).json({
        message: "Subject not found."
      });
    }


    const chapter =
      subject.chapters.id(chapterId);


    if (!chapter) {

      return res.status(404).json({
        message: "Chapter not found."
      });
    }


    chapter.deleteOne();


    await subject.save();


    return res.json({
      message: "Chapter deleted successfully.",
      subject
    });

  } catch (error) {

    console.error(
      "Delete chapter error:",
      error
    );

    return res.status(500).json({
      message: "Unable to delete chapter."
    });
  }
};

const toggleChapter = async (req, res) => {

  try {

    const {
      id,
      chapterId
    } = req.params;


    if (
      !isValidId(id) ||
      !isValidId(chapterId)
    ) {

      return res.status(400).json({
        message: "Invalid ID."
      });
    }


    const subject =
      await Subject.findOne({
        _id: id,
        user: req.user
      });


    if (!subject) {

      return res.status(404).json({
        message: "Subject not found."
      });
    }


    const chapter =
      subject.chapters.id(chapterId);


    if (!chapter) {

      return res.status(404).json({
        message: "Chapter not found."
      });
    }


    chapter.completed =
      !chapter.completed;


    await subject.save();


    return res.json({
      message: chapter.completed
        ? "Chapter marked completed."
        : "Chapter marked incomplete.",

      subject
    });

  } catch (error) {

    console.error(
      "Toggle chapter error:",
      error
    );

    return res.status(500).json({
      message: "Unable to update chapter."
    });
  }
};


module.exports = {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  addChapter,
  updateChapter,
  deleteChapter,
  toggleChapter
};
