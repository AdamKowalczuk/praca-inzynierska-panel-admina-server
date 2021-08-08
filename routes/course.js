import express from "express";

import {
  getCourses,
  getCourse,
  //   getChapters,
  updateCourse,
  // updateChapter,
  createCourse,
  createChapter,
  createLesson,
  deleteCourse,
  deleteChapter,
  deleteLesson,
  // getChapters,
  // updateCourse,
} from "../controllers/courses.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/", getCourse);
router.post("/", createCourse);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.post("/:id/chapters", createChapter);
router.post("/:courseId/chapters/:chapterId/lessons", createLesson);
router.patch("/:courseId/chapters/:chapterId", deleteChapter);
router.patch("/:courseId/chapters/:chapterId/lessons/:lessonId", deleteLesson);

export default router;
