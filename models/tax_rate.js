const mongoose = require('mongoose')

const TaxRateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('tax_rate', TaxRateSchema)