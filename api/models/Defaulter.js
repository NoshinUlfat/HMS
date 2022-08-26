import mongoose from "mongoose";
 
const defaulterSchema = mongoose.Schema({
    
    studentsId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student",
        required : true
    },
    dueId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Due",
        required : true
    },
    message: {type: String, maxLength: 200 },
    dueType : { type: String, required: true },
    dueAmount : { type: Number, required: true },
    warning : { type: Boolean, required: true },
    mealOff : { type: Boolean, required: true },
    seatCancel : { type: Boolean, required: true },
});
 
export default mongoose.model("Defaulter", defaulterSchema);