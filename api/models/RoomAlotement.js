RequestID = models.AutoField(primary_key=True)
stdID = models.ForeignKey(Student, on_delete=models.CASCADE)
requestedRoomNo = models.ForeignKey(Room, on_delete=models.CASCADE,null=True, blank=True)
attachment = models.FileField(null=True, blank=True)
const mongoose = require("mongoose");

const roomalotementSchema = mongoose.Schema({

message: {type: String, maxLength: 200},
sports: { type: Boolean, default: false},
debate: { type: Boolean, default: false},
other: { type: Boolean, default: false},
approvalStatus: {type: String, enum: ["pending", "accepted", "declined"], required: true, default: pending},

});

module.exports = mongoose.model("RoomAlotement", roomalotementSchema);