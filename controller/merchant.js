const express = require('express')
const router = express.Router()
const {signUp, signIn} = require('../service/merchant')

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)

module.exports = router