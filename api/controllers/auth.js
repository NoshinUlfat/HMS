import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import Provost from "../models/Provost.js";

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
    const userStudent = await Student.findOne({ studentId: req.body.username });
    const userProvost = await Provost.findOne({ username: req.body.username });

    //console.log("Author login ",userStudent.studentID);

    let user = userAdmin;
    let isUserAdmin = true;
    let isUserProvost = false;

    // if(!userAdmin) console.log("userAdmin.username ",req.body.username)
    // if(!userStudent) console.log("userStudent.username ",req.body.username)
    // if(!userProvost) console.log("userProvost.username ",req.body.username)

    if(!userAdmin && userStudent) {
       console.log("1")
      user = userStudent;
      isUserAdmin = false;
    }
    if(!userAdmin && userProvost) {
       console.log("2")
      user = userProvost;
      isUserAdmin = false;
      isUserProvost = true;
    }

    console.log("Author login ",user.username);

    if (!user) return next(createError(404, "User not found!"));

    //console.log(user.username);
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    console.log("CHECK STATUS ",isUserAdmin," ",isUserProvost)

    const token = jwt.sign(
      { id: user._id, isAdmin: isUserAdmin, isProvost: isUserProvost, },
      process.env.JWT
    );

    const { password,  ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isUserAdmin, isUserProvost });
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
    //console.log("B ",user.username);
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