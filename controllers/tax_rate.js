const TaxRateService = require('../services/tax_rate')

class TaxRateController {

  static async getAllTaxRates(req, res) {
    let tax_rates
    if (req.query.search && req.query.search.length > 1) {
      tax_rates = await TaxRateService.findByName(req.query.search) 
    } else {
      tax_rates = await TaxRateService.findAll()
    }
    res.render('tax-rates', { tax_rates })
  }

  static async createTaxRate(req, res) {
    try {
      await TaxRateService.save(req.body)
      req.flash('success_msg', 'Tax Rate Added')
      res.redirect('/tax_rates')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error adding type')
      req.redirect('/tax_rates')      
    }
  }

  static async removeTaxRate(req, res) {
    try {
      await TaxRateService.removeOne(req.params.tax_rate_id)
      req.flash('success_msg', 'Tax Rate Removed')
      res.redirect('/tax_rates')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/tax_rates')
    }
  }

}

module.exports = TaxRateController