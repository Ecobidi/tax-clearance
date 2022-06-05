const mongoose = require('mongoose')
 
const TaxPaymentSchema = new mongoose.Schema({
  tax_payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tax_payer',
  },
  tax_payer_name: {
    type: String,
  },
  tax_rate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tax_rate'
  },
  tax_rate_percentage: Number,
  tax_amount: {
    type: Number,
    required: true,
  },
  tax_year: String,
  tax_month: String,
  date_of_payment: {
    type: Date,
    default: Date.now
  },
  document_image: {
    url: String,
    public_id: String, 
  }
}, {timestamps: true,})

module.exports = mongoose.model('tax_payment', TaxPaymentSchema)