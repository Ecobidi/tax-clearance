const TaxRateModel = require('../models/tax_rate')

class TaxRateService {
  static async findAll() {
    return TaxRateModel.find({})
  }

  static async findById(id) {
    return TaxRateModel.findById(id)
  }

  static async findByName(name) {
    return TaxRateModel.find({name: new RegExp(name, 'ig')})
  }

  static async save(dao) {
    return TaxRateModel.create(dao)
  }

  static async removeOne(id) {
    return TaxRateModel.findByIdAndRemove(id)
  }

}

module.exports = TaxRateService