const mongoose = require("mongoose");




const chapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
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
    _id: true
  }
);



const subjectSchema = new mongoose.Schema(
  {
  
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: "",
      trim: true
    },

    chapters: {
      type: [chapterSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);



subjectSchema.virtual("progress").get(function () {

  if (!this.chapters || this.chapters.length === 0) {
    return 0;
  }

  const completedChapters =
    this.chapters.filter(
      (chapter) => chapter.completed
    ).length;

  return Math.round(
    (completedChapters / this.chapters.length) * 100
  );
});


subjectSchema.set(
  "toJSON",
  {
    virtuals: true
  }
);


subjectSchema.set(
  "toObject",
  {
    virtuals: true
  }
);


module.exports = mongoose.model(
  "Subject",
  subjectSchema
);
