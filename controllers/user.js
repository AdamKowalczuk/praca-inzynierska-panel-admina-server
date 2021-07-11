import express from "express";
import mongoose from "mongoose";

import User from "../models/user.js";

const router = express.Router();

export const getUsers = async (req, res) => {
  try {
    const Users = await User.find();
    // console.log(Users);
    res.status(200).json(Users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default router;
