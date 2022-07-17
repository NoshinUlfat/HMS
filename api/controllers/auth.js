import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {

    console.log("CHECK ",req.body.username );

    const userAdmin = await User.findOne({ username: req.body.username });
    const userStudent = await Student.findOne({ studentID: req.body.username });

    console.log("Author login ",userStudent.studentID)
    let user = userAdmin;
    let isUserAdmin = true;
    if(!userAdmin) {
      user = userStudent;
      isUserAdmin = false;
    }

    if (!user) return next(createError(404, "User not found!"));

    console.log(user.username);
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: isUserAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

// export const showData = async (req, res, next) => {
//   try {
//     const user = await Student.findOne({ username: req.body.username });

//     console.log("B ",user.username);

//     const token = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.JWT
//     );

//     const { password, isAdmin, ...otherDetails } = user._doc;
//     res
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .json({ details: { ...otherDetails }, isAdmin });
//     } catch (err) {
//       next(err);
//     }
  
// }
export const showData = async (req,res,next)=>{
  try {
    const user = await Student.findOne({username: req.body.username});
    console.log("B ",user.username);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const updateStudent = async (req,res,next)=>{
  try {
    console.log("TRYING..")
    const updatedUser = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    console.log("Updating Student ",updatedUser.username);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}