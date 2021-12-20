import express from "express";

import { getUsers, getUser, deleteUser } from "../controllers/user.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/", getUser);
router.delete("/:id", deleteUser);

export default router;
