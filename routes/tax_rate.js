const router = require('express').Router()
const TaxRateController = require('../controllers/tax_rate')

router.get('/', TaxRateController.getAllTaxRates)

router.post('/new', TaxRateController.createTaxRate)

router.get('/remove/:tax_rate_id', TaxRateController.removeTaxRate)

module.exports = router