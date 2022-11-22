const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Patient = new Schema({
  patient_name: {
    type: String,
  },
  illness: {
    type: String,
  },
  assigned_to_doctor: {
    type: String,
  },
  illness_severity: {
    type: String,
  },
  patient_relieved: {
    type: Boolean,
  },
});
module.exports = mongoose.model("Patient", Patient);
