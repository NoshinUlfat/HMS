// RequestID = models.AutoField(primary_key=True)
// stdID = models.ForeignKey(Student, on_delete=models.CASCADE)
// requestedRoomNo = models.ForeignKey(Room, on_delete=models.CASCADE,null=True, blank=True)
// attachment = models.FileField(null=True, blank=True)
import mongoose from "mongoose";

const roomalotementSchema = mongoose.Schema({
    studentsId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student",
        required : true
    },
    studentId: {type: String},
    preferredRoomNo: {type: Number},
    message: {type: String, maxLength: 200},
    sports: { type: Boolean, default: false},
    debate: { type: Boolean, default: false},
    other: { type: Boolean, default: false},
    approvalStatus: {type: String, enum: ["pending", "accepted", "declined"], required: true, default: "pending"},
    file: { type: String},
},
    { timestamps: true }
);

export default mongoose.model("RoomAllotment", roomalotementSchema)