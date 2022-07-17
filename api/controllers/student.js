import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";


export const showData = async (req, res, next) => {
  try {
    const userStudent = await Student.findOne({ username: req.body.username });

    console.log("B ",userStudent.username);

    const isAdmin = false;
    res.json({ details:  isAdmin });
  } catch (err) {
    next(err);
  }
}