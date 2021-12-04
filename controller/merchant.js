const express = require('express')
const router = express.Router()
const {signUp, signIn, deleteMerchant} = require('../service/merchant')
const isAuthorize = require("../service/utility/authorization");

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.delete('/', isAuthorize, deleteMerchant)
module.exports = router