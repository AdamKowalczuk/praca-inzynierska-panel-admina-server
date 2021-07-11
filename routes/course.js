import express from "express";

import {
  getCourses,
  getCourse,
  //   getChapters,
  createCourse,
} from "../controllers/courses.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/", getCourse);

// router.get("/", getChapters);

router.post("/", createCourse);
// router.get("/:id", getCourse);
// router.patch("/:id", updateCourse);
// router.delete("/:id", deleteCourse);
// router.patch('/:id/likePost', likePost);

export default router;
