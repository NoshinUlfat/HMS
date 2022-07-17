const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({

name: {type: String, required: true, maxLength: 200},
password : {type: String, required: true, maxLength: 200, default: "Professor"},
post : {type: String, required: true, maxLength: 100, default: "123456"}, 
mobile_no : {type: String},
email : {type: EmailField, maxLength: 200},
start_timestamp: { type: Date, default: Date.now, required: true },
end_timestamp: { type: Date, required: true },

});

module.exports = mongoose.model("Student", studentSchema);
// module.exports = mongoose.model("Hotel", HotelSchema)