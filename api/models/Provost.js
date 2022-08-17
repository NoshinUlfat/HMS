import mongoose from "mongoose";
 
const provostSchema = mongoose.Schema({
 
    hallId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Hall"
    },

    username: {type: String, required: true, maxLength: 200},
    post  : {type: String, required: true, maxLength: 200, default: "Professor"},
    department : {type: String, required: true, maxLength: 200, default: "CSE"},
    designation  : {type: String, required: true, maxLength: 200, default: "Asistant Provost"},
    password : {type: String, required: true, maxLength: 200, default: "123456"},
    present_address : {type: String, maxLength: 200},
    permanent_address : {type: String, maxLength: 200},
    phone : {type: String},
    email : {type: String, maxLength: 200,unique: true},
    start_timestamp: { type: Date, default: Date.now },
    end_timestamp: { type: Date },
    img: { type: String},
 
});
 
export default mongoose.model("Provost", provostSchema);