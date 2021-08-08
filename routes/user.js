import express from "express";

import { getUsers, getUser, deleteUser } from "../controllers/user.js";
const router = express.Router();
// import auth from "../middleware/auth.js";
// import { signin, signup } from "../controllers/user.js";

// router.post("/signin", signin);
// router.post("/signup", signup);

// export default router;
router.get("/", getUsers);
router.get("/", getUser);
router.delete("/:id", deleteUser);

export default router;
