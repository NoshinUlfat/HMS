import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import { createError } from "../utils/error.js";

export const registerStudent = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newStudent = new Student({
      ...req.body,
      password: hash,
    });

    await newStudent.save();
    res.status(200).send("Student has been created.");
  } catch (err) {
    next(err);
  }
};
export const loginStudent = async (req, res, next) => {
  try {
    const student = await Student.findOne({ studentID: req.body.email });
    if (!student) return next(createError(404, "Student not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      student.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or student ID!"));

    const token = jwt.sign(
      { id: student._id },
      process.env.JWT
    );

    const { password, ...otherDetails } = student._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails } });
  } catch (err) {
    next(err);
  }
};
