import Student from "../models/Student.js";

export const updateStudent = async (req,res,next)=>{
  try {

    //console.log("BBBBBBBBBB ",req.params.id);
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (err) {
    next(err);
  }
}

export const deleteStudent = async (req,res,next)=>{
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json("Student has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getStudent = async (req,res,next)=>{
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
}
export const getStudents = async (req,res,next)=>{
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
}
export const getStudent_byStudentID = async (req,res,next)=>{
  try {
    const student = await Student.findOne({ studentId: req.body.studentId });
    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
}

export const getStudentsCount = async (req,res,next)=>{
  try {
    const students = await Student.find().count();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
}