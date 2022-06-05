const adminRouter = require('express').Router()

const TaxPayerRouter = require('./tax_payer')
const TaxPaymentRouter = require('./tax_payment')
const TaxRateRouter = require('./tax_rate')
const LoginRouter = require('./login')
const UserRouter = require('./user')

const authorization_middleware = (req, res, next) => {
  if (req.session?.user) next()
  else res.redirect('/login')
}

const logout = (req, res) => {
  req.session.user = null
  req.session.loggedIn = false
  res.redirect('/login')
}

adminRouter.use('/login', LoginRouter)

// adminRouter.use(authorization_middleware)

adminRouter.get('/', (req, res) => res.render('dashboard'))

adminRouter.get('/dashboard', (req, res) => res.render('dashboard'))

adminRouter.use('/tax_rates', TaxRateRouter)

adminRouter.use('/tax_payments', TaxPaymentRouter)

adminRouter.use('/tax_payers', TaxPayerRouter)

adminRouter.use('/users', UserRouter)

adminRouter.get('/logout', logout)

module.exports = adminRouter