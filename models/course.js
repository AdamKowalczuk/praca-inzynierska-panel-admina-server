import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  name: String,
  description: String,
  chapters: { type: [Object] },
  isFinished: Boolean,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Course = mongoose.model("Course", courseSchema);

export default Course;
