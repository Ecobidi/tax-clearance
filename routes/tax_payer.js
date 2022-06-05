const router = require('express').Router()
const multer = require('multer')
const TaxPayerController = require('../controllers/tax_payer')

// const upload = multer({})

router.get('/', TaxPayerController.getAllTaxPayersPage)

router.get('/new', TaxPayerController.createTaxPayerPage)

router.post('/new', TaxPayerController.createTaxPayer)

router.get('/remove/:tax_payer_id', TaxPayerController.removeTaxPayer)

module.exports = router