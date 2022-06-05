const TaxPaymentModel = require('../models/tax_payment')

class TaxPaymentService {
  static async findAll() {
    return TaxPaymentModel.find({}).populate('tax_payer tax_rate')
  }

  static async findById(id) {
    return TaxPaymentModel.findById(id).populate('tax_payer tax_rate')
  }

  static async findByTaxPayerName(name) {
    return TaxPaymentModel.find({tax_payer_name: new RegExp(name, 'ig')}).populate('tax_payer tax_rate')
  }

  static async findByTaxPayerID(tax_payer_id) {
    return TaxPaymentModel.find({tax_payer: tax_payer_id}).populate('tax_payer tax_rate')
  }

  static async save(dao) {
    return TaxPaymentModel.create(dao)
  }

  static async removeOne(id) {
    return TaxPaymentModel.findByIdAndRemove(id)
  }

}

module.exports = TaxPaymentService