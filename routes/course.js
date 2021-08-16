import express from "express";

import {
  getCourses,
  getCourse,
  updateCourse,
  updateChapter,
  updateLesson,
  createCourse,
  createChapter,
  createLesson,
  deleteCourse,
  deleteChapter,
  deleteLesson,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../controllers/courses.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/", getCourse);
router.post("/", createCourse);
router.patch("/:id", updateCourse);
router.post("/:courseId/chapters/:chapterId", deleteChapter);
router.patch("/:courseId/chapters/:chapterId", updateChapter);

router.post("/:courseId/chapters/:chapterId/lessons", createLesson);
router.post("/:courseId/chapters/:chapterId/lessons/:lessonId", deleteLesson);
router.patch("/:courseId/chapters/:chapterId/lessons/:lessonId", updateLesson);

router.post("/:courseId/chapters/:chapterId/quiz", createQuiz);
router.post("/:courseId/chapters/:chapterId/quiz/:quizId", deleteQuiz);
router.patch("/:courseId/chapters/:chapterId/quiz/:quizId", updateQuiz);

router.post("/:id/chapters", createChapter);

router.delete("/:id", deleteCourse);

export default router;
