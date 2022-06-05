let mongoose = require("mongoose");

let TayPayerSchema = mongoose.Schema({
  /*  _id is the TIN TAX IDENTIFICATION NUMBER  */
  surname: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: String,
  fullname: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: Date,
  phone: Number,
  address: String,
  city: String,
  state: String,
  job_title: String,
  employment_status: {
    type: String,
    enum: ['employed', 'self-employed', 'under-employed', 'unemployed']
  },
  salary_grade_level: Number,
  photo: {
    url: String,
    public_id: String,
  }
}, {timestamps: true});

module.exports = mongoose.model("tax_payer", TayPayerSchema);