import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Provost from "../models/Provost.js";
import { createError } from "../utils/error.js";

export const registerProvost = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newProvost = new Provost({
      ...req.body,
      password: hash,
    });

    await newProvost.save();
    res.status(200).send("Provost has been created.");
  } catch (err) {
    next(err);
  }
};
export const loginProvost = async (req, res, next) => {
  try {
    const provost = await Provost.findOne({ provostID: req.body.email });
    if (!provost) return next(createError(404, "Provost not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      provost.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or provost ID!"));

    const token = jwt.sign(
      { id: provost._id },
      process.env.JWT
    );

    const { password, ...otherDetails } = provost._doc;
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
