const router = require('express').Router()
const PaymentController = require('../controllers/tax_payment')

router.get('/', PaymentController.getAlltaxPayments)

router.get('/new', PaymentController.createTaxPaymentPage)

router.post('/new', PaymentController.createTaxPayment)

router.get('/certificate/:tax_payment_id', PaymentController.viewPaymentCertificate)

router.get('/remove/:tax_payment_id', PaymentController.removeTaxPayment)

module.exports = router