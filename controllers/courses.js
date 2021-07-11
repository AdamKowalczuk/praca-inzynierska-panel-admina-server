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

export const createCourse = async (req, res) => {
  const { title, description } = req.body;

  const newCourse = new Course({ title, description });

  try {
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
// export const getChapters = async (req, res) => {
//   try {
//     const Chapters = await Course.find();

//     res.status(200).json(Courses);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export default router;
