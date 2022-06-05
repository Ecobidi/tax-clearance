const TaxPaymentService = require('../services/tax_payment')
const TaxRateService = require('../services/tax_rate')
const TaxPayerService = require('../services/tax_payer')

class TaxPaymentController {

  static async getAlltaxPayments(req, res) {
    let tax_payments
    try {
      if (req.query.search && req.query.search.length > 1) {
        tax_payments = await TaxPaymentService.findByTaxPayerID(req.query.search) 
      } else {
        tax_payments = await TaxPaymentService.findAll()
      }
      res.render('tax-payments', { tax_payments })
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/tax_payments')
    }
    
  }

  static async viewPaymentCertificate(req, res) {
    try {
      let tax_payment = await TaxPaymentService.findById(req.params.tax_payment_id)
      let expiry_date = tax_payment.date_of_payment.setFullYear(tax_payment.date_of_payment.getFullYear() + 1).toLocaleString("fr")
      console.log(expiry_date)
      res.render('tax-certificate', { tax_payment })
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error fetching certificate')      
      res.redirect('/tax-payments')
    }
  }

  static async createTaxPaymentPage(req, res) {

    try {
      let tax_rates = await TaxRateService.findAll()
      if (!req.query.tax_payer_id && !req.query.tax_rate) {
        return res.render('tax-payments-new', { tax_rates, tax_payer_found: false })
      }
      let tax_payer = await TaxPayerService.findById(req.query.tax_payer_id)
      let tax_rate = await TaxRateService.findById(req.query.tax_rate)
      console.log(tax_payer)
      if (tax_payer ) {
        res.render('tax-payments-new', { tax_payer, tax_rate, tax_rates, tax_payer_found: true })
      } else {
        res.render('tax-payments-new', { tax_rates, tax_payer_found: false })
      }
    } catch (error) {
      req.flash('error_msg', 'Invalid Tax Payer ID')
      res.redirect('/tax_payments/new')
    }
  }

  static async createTaxPayment(req, res) {
    try {
      await TaxPaymentService.save(req.body)
      req.flash('success_msg', 'Payment Added')
      res.redirect('/tax_payments')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error adding tax payment')
      req.redirect('/tax_payments')      
    }
  }

  static async removeTaxPayment(req, res) {
    try {
      await TaxPaymentService.removeOne(req.params.tax_payment_id)
      res.redirect('/tax_payments')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/tax_payments')
    }
  }

}

module.exports = TaxPaymentController