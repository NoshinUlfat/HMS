// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema({

// username: {type: String, required: true, maxLength: 200,  unique: true,},
// password : {type: String, required: true, maxLength: 200, default: "123456"},
// cgpa : {type: Number }, 
// mobile_no : {type: String},
// level : {type: Number, required: true, default: 3},
// term : {type: Number, required: true, default: 2},
// present_address : {type: String, maxLength: 200},
// permanent_address : {type: String, maxLength: 200},
// email : {type: String, maxLength: 200},
// department : {type: String, required: true, maxLength: 200, default: "CSE"},  
// roomNo : {type: Number, ref : "Room" },


// });

// export default mongoose.model("Student", studentSchema);

import mongoose from "mongoose";
const studentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cgpa: {
        type: Number,
        required: true,
    },
    mobile_no: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    term: {
        type: Number,
        required: true,
    },
    present_address: {
        type: String,
        required: true,
    },
    permanent_address: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    roomNo: {
        type: Number,
        required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image: {
        type: String
      },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
