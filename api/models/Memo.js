import mongoose from "mongoose";

const FundRequest = mongoose.Schema({

    studentsId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student",
        required : true
    },
    title : { type: String, required: true},
    amount : { type: Number, required: true},
    description : {type: String, maxLength: 200},
    file: { type: String},
    date: { type: Date, default: Date.now },
},
{ timestamps: true }
);

export default mongoose.model("FundRequest", FundRequest)