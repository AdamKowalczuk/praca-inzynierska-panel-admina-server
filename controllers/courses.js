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
  const { name, description, isFinished, chapters, color, icon } = req.body;
  const updatedCourse = {
    name,
    description,
    isFinished,
    chapters,
    _id: courseId,
    color,
    icon,
  };
  await Course.findByIdAndUpdate(courseId, updatedCourse, { new: true });
  res.json(updatedCourse);
};
export const updateChapter = async (req, res) => {
  const { courseId, chapterId } = req.params;
  const {
    name,
    description,
    isFinished,
    lessons,
    quiz,
    isQuizCompleted,
    icon,
    _id,
    actualChapter,
  } = req.body;
  const data = {
    name,
    description,
    isFinished,
    lessons,
    quiz,
    isQuizCompleted,
    icon,
    _id,
  };
  let course = await Course.findById(courseId);
  course.chapters[actualChapter] = data;
  const updatedCourse = await Course.findByIdAndUpdate(courseId, course, {
    new: true,
  });
  res.json(updatedCourse);
};
export const updateLesson = async (req, res) => {
  const { courseId, chapterId, lessonId } = req.params;
  const {
    name,
    description,
    image,
    isFinished,
    _id,
    actualChapter,
    actualLesson,
  } = req.body;
  const data = { name, description, image, isFinished, _id };
  let course = await Course.findById(courseId);
  course.chapters[actualChapter].lessons[actualLesson] = data;
  const updatedCourse = await Course.findByIdAndUpdate(courseId, course, {
    new: true,
  });
  res.json(updatedCourse);
};
export const updateQuiz = async (req, res) => {
  const { courseId, chapterId, quizId } = req.params;
  const {
    question,
    answers,
    correctAnswer,
    isFinished,
    _id,
    actualChapter,
    actualQuiz,
  } = req.body;
  const data = { question, answers, correctAnswer, isFinished, _id };
  let course = await Course.findById(courseId);
  course.chapters[actualChapter].quiz[actualQuiz] = data;
  const updatedCourse = await Course.findByIdAndUpdate(courseId, course, {
    new: true,
  });
  res.json(updatedCourse);
};
export const createCourse = async (req, res) => {
  const { name, description, isFinished, chapters, color, icon } = req.body;
  const newCourse = new Course({
    name,
    description,
    isFinished,
    chapters,
    color,
    icon,
  });
  try {
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const createChapter = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    isFinished,
    lessons,
    icon,
    quiz,
    isQuizCompleted,
    _id,
  } = req.body;
  const data = {
    name,
    description,
    isFinished,
    lessons,
    icon,
    quiz,
    isQuizCompleted,
    _id,
  };
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
export const createQuiz = async (req, res) => {
  console.log("Create Quiz");
  const { courseId, chapterId } = req.params;
  const { question, answers, correctAnswer, isFinished, _id, actualChapter } =
    req.body;

  const data = { question, answers, correctAnswer, isFinished, _id };
  let course = await Course.findById(courseId);
  course.chapters[actualChapter].quiz.push(data);
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
export const deleteQuiz = async (req, res) => {
  console.log("Delete Quiz");
  const { courseId, chapterId, quizId } = req.params;
  const { actualQuiz } = req.body;

  let course = await Course.findById(courseId);
  course.chapters.map((chapter) => {
    if (chapter._id === chapterId) {
      chapter.quiz.splice(actualQuiz, 1);
    }
  });
  const updatedCourse = await Course.findByIdAndUpdate(courseId, course, {
    new: true,
  });
  res.json(updatedCourse);
};

export default router;
