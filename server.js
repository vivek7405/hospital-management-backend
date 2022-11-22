const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();
const PORT = 4000;

let Patient = require("./patient.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/hospital-management", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
router.route("/").get(function (req, res) {
  Patient.find(function (err, patients) {
    if (err) {
      console.log(err);
    } else {
      res.json(patients);
    }
  });
});
router.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Patient.findById(id, function (err, patient) {
    res.json(patient);
  });
});
router.route("/update/:id").post(function (req, res) {
  Patient.findById(req.params.id, function (err, patient) {
    if (!patient) res.status(404).send("data is not found");
    else patient.patient_name = req.body.patient_name;
    patient.illness = req.body.illness;
    patient.assigned_to_doctor = req.body.assigned_to_doctor;
    patient.illness_severity = req.body.illness_severity;
    patient.patient_relieved = req.body.patient_relieved;
    patient
      .save()
      .then((patient) => {
        res.json("Patient updated!");
      })
      .catch((err) => {
        res.status(400).send("Update not possible");
      });
  });
});
router.route("/add").post(function (req, res) {
  console.log(req.body);
  let patient = new Patient(req.body);
  patient
    .save()
    .then((patient) => {
      res.status(200).json({ patient: "Patient added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new patient failed");
    });
});
app.use("/patients", router);
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
