import express from "express";
import mongoose from "mongoose";
import Course from "../models/course.js";
const router = express.Router();

export const getCourses = async (req, res) => {
  try {
    const Courses = await Course.find();
    res.status(200).json(Courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    res.status(200).json(course);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getChapters = async (req, res) => {
  try {
    const Courses = await Course.find();
    res.status(200).json(Courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  const courseId = req.params.id;
  const { name, description, isFinished, chapters } = req.body;
  const updatedCourse = {
    name,
    description,
    isFinished,
    chapters,
    _id: courseId,
  };
  await Course.findByIdAndUpdate(courseId, updatedCourse, { new: true });
  res.json(updatedCourse);
};
export const updateChapter = async (req, res) => {
  const { courseId, chapterId } = req.params;
  const { name, description, isFinished, lessons, _id, actualChapter } =
    req.body;
  const data = { name, description, isFinished, lessons, _id };
  let course = await Course.findById(courseId);
  course.chapters[actualChapter] = data;
  // console.log(course);
  const updatedCourse = await Course.findByIdAndUpdate(courseId, course, {
    new: true,
  });
  res.json(updatedCourse);
};
export const updateLesson = async (req, res) => {
  const { courseId, chapterId, lessonId } = req.params;
  const { name, description, isFinished, _id, actualChapter, actualLesson } =
    req.body;
  console.log(req.params);
  console.log(req.body);
  const data = { name, description, isFinished, _id };
  let course = await Course.findById(courseId);
  course.chapters[actualChapter].lessons[actualLesson] = data;
  const updatedCourse = await Course.findByIdAndUpdate(courseId, course, {
    new: true,
  });
  res.json(updatedCourse);
};
export const createCourse = async (req, res) => {
  const { name, description, isFinished, chapters } = req.body;
  const newCourse = new Course({ name, description, isFinished, chapters });
  try {
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const createChapter = async (req, res) => {
  const { id } = req.params;
  const { name, description, isFinished, lessons, _id } = req.body;
  const data = { name, description, isFinished, lessons, _id };
  let course = await Course.findById(id);
  course.chapters.push(data);
  const updatedCourse = await Course.findByIdAndUpdate(id, course, {
    new: true,
  });
  res.json(updatedCourse);
};
export const createLesson = async (req, res) => {
  const { courseId, chapterId } = req.params;
  const { name, description, isFinished, image, _id, actualChapter } = req.body;
  const data = { name, description, isFinished, image, _id };
  let course = await Course.findById(courseId);
  course.chapters[actualChapter].lessons.push(data);
  const updatedCourse = await Course.findByIdAndUpdate(courseId, course, {
    new: true,
  });
  res.json(updatedCourse);
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No course with id: ${id}`);

  await Course.findByIdAndRemove(id);

  res.json({ message: "Course deleted successfully." });
};
export const deleteChapter = async (req, res) => {
  const { courseId, chapterId } = req.params;
  const { actualChapter } = req.body;
  let course = await Course.findById(courseId);
  course.chapters.splice(actualChapter, 1);
  console.log("Course after delete:", course);
  const updatedCourse = await Course.findByIdAndUpdate(courseId, course, {
    new: true,
  });
  res.json(updatedCourse);
};
export const deleteLesson = async (req, res) => {
  const { courseId, chapterId, lessonId } = req.params;
  const { actualLesson } = req.body;

  let course = await Course.findById(courseId);
  course.chapters.map((chapter) => {
    if (chapter._id === chapterId) {
      chapter.lessons.splice(actualLesson, 1);
    }
  });
  const updatedCourse = await Course.findByIdAndUpdate(courseId, course, {
    new: true,
  });
  res.json(updatedCourse);
};

export default router;
