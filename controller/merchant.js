const express = require('express')
const router = express.Router()
const {signUp} = require('../service/merchant')

router.post('/sign-up', signUp)

module.exports = router