let TaxPayerService = require('../services/tax_payer')
const cloudinary = require('cloudinary')
const streamifier = require('streamifier')

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });

// const streamUpload = (file) => {
//   return new Promise((resolve, reject) => {
//       let stream = cloudinary.v2.uploader.upload_stream({folder: 'income-tax-system'},
//         (error, result) => {
//           if (result) {
//             resolve(result);
//           } else {
//             reject(error);
//           }
//         }
//       );
//      streamifier.createReadStream(file.buffer).pipe(stream);
//   });
// };

class TaxPayerController {
  static async getAllTaxPayersPage(req, res) {
    try {
      let tax_payers
      if (req.query.search) {
        tax_payers = await TaxPayerService.findByName(req.query.search)
      } else {
        tax_payers = await TaxPayerService.findAll()
      }
      res.render('tax-payers', { tax_payers })
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/tax_payers')
    }
  }

  static async createTaxPayerPage(req, res) {
    res.render('tax-payers-new')
  }

  static async createTaxPayer(req, res) {
    let dao = req.body
    dao.fullname = `${dao.surname} ${dao.first_name} ${dao.middle_name}`
    // dao.photo = {}
    try {
      // let uploadedPhoto = await streamUpload(req.file.photo)
      // console.log(uploadedPhoto)
      // dao.photo.url = uploadedPhoto.url
      // da.photo.public_id = uploadedPhoto.public_id
      console.log(dao)
      let payer = await TaxPayerService.save(dao)
      req.flash('success_msg', 'Success: Tax Payer Identification Number is ' + payer._id )
      res.redirect('/tax_payers')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/tax_payers')
    }
  }

  static async editTaxPayerPage(req, res) {
    res.render('tax-payers-edit')
  }

  static async editTaxPayer(req, res) {
    let dao = req.body
    try {
      let tax_payer = await TaxPayerService.findById(dao.tax_payer_id)
      if (!tax_payer) throw new Error('No tax payer with such ID')
      await TaxPayerService.updateOne(tax_payer._id, dao)
    } catch (error) {
      console.log(error)
      req.flash('error_msg', error.message)
      res.redirect('/tax_payers')
    }
  }

  static async removeTaxPayer(req, res) {
    try {
      await TaxPayerService.removeOne(req.params.tax_payer_id)
      req.flash('success_msg', 'Tax Payer Successfully Removed')
      req.redirect('/tax_payers')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An Error Occurred')
      res.redirect('/tax_payers')
    }
  }
}

module.exports = TaxPayerController