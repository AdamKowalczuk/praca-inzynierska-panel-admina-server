import express from "express";

import { getUsers, getUser } from "../controllers/user.js";
const router = express.Router();
// import { signin, signup } from "../controllers/user.js";

// router.post("/signin", signin);
// router.post("/signup", signup);

// export default router;
router.get("/", getUsers);
router.get("/", getUser);

export default router;
