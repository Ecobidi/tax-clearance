const TaxPayerModel = require('../models/tax_payer')

class TaxPayerService {
  static async findAll() {
    return TaxPayerModel.find({})
  }

  static async findById(payer_id) {
    return TaxPayerModel.findById(payer_id)
  }

  static async findByName(name) {
    return TaxPayerModel.find({fullname: new RegExp(name, 'ig')})
  }

  static async save(payer_dao) {
    return TaxPayerModel.create(payer_dao)
  }

  static async updateOne(payer_id, update_dao) {
    return TaxPayerModel.findById(payer_id, {$set: update_dao})
  }

  static async removeOne(payer_id) {
    return TaxPayerModel.findByIdAndRemove(payer_id)
  }

}

module.exports = TaxPayerService