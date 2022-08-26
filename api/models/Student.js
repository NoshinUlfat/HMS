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
    studentId: {type: String, required: true, maxLength: 100,unique: true},
    username: {type: String, required: true, maxLength: 200},
    password : {type: String, required: true, maxLength: 200, default: "123456"},
    cgpa : {type: Number }, 
    phone : {type: String},
    level : {type: Number, required: true, default: 3},
    term : {type: Number, required: true, default: 2},
    present_address : {type: String, maxLength: 200},
    permanent_address : {type: String, maxLength: 200},
    email : {type: String, maxLength: 200,unique: true},
    department : {type: String, required: true, maxLength: 200, default: "CSE"},  
    roomNo: {
      type: String,
    },
    img: {
        type: String
      },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
