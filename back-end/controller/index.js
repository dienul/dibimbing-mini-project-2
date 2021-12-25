const express = require('express')
const router = express.Router()
const merchant = require('./merchant')
const product = require('./product')

router.get('/',(req,res)=>{
  res.send(`masuk ke halaman index`)
})

router.use('/merchant', merchant)
router.use('/product', product)

module.exports = router