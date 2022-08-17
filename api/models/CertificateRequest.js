import mongoose from "mongoose";

const certificateRequestSchema = mongoose.Schema({

    studentsId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student",
        required : true
    },
    type : { type: String, required: true},
    message: {type: String, maxLength: 200},
    approvalStatus: {type: String, enum: ["pending", "accepted", "declined"], required: true, default: "pending"},
    file: { type: String},
});

export default mongoose.model("CertificateRequest", certificateRequestSchema)